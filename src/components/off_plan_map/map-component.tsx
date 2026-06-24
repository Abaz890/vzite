// components/off_plan_map/map-component.tsx
import { useEffect, useState, useCallback } from "react";
import { Loader2 } from "lucide-react";

interface MapComponentProps {
  points: any[];
  emirates: any[];
  districts: any[];
  onMapLoaded: (center: number[], bounds: any, zoom: any) => void;
  onMarkerClick: (property: any) => void;
  onMapMoveEnd: (center: number[], bounds: any, zoom: any) => void;
}

// Main wrapper component - safe for SSR
export function MapComponent(props: MapComponentProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Server-side render: show loading skeleton
  if (!isClient) {
    return (
      <div className="relative w-full h-full">
        <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
          <div className="text-center">
            <Loader2 className="h-8 w-8 mx-auto mb-2 text-primary animate-spin" />
            <p>Loading map...</p>
          </div>
        </div>
      </div>
    );
  }

  // Client-side render: load actual map
  return <ClientOnlyMap {...props} />;
}

// Client-only map component
function ClientOnlyMap({
  points,
  emirates,
  districts,
  onMapLoaded,
  onMarkerClick,
  onMapMoveEnd,
}: MapComponentProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [currentZoomLevel, setCurrentZoomLevel] = useState(9);
  const [MapComponents, setMapComponents] = useState<any>(null);
  const [L, setL] = useState<any>(null);

  const EMIRATE_POLYGONS_MAX_ZOOM = 9;
  const DISTRICT_POLYGONS_MIN_ZOOM = 10;

  const UAE_BBOX = {
    latMin: 22.5,
    latMax: 26.5,
    lngMin: 51.0,
    lngMax: 57.0
  };

  // Dynamically import Leaflet and React-Leaflet on client
  useEffect(() => {
    Promise.all([
      import("leaflet"),
      import("react-leaflet"),
      import("leaflet/dist/leaflet.css")
    ]).then(([leaflet, reactLeaflet]) => {
      setL(leaflet.default);
      setMapComponents({
        MapContainer: reactLeaflet.MapContainer,
        TileLayer: reactLeaflet.TileLayer,
        Marker: reactLeaflet.Marker,
        Polygon: reactLeaflet.Polygon,
        useMapEvents: reactLeaflet.useMapEvents,
      });
    });
  }, []);

  function pointInUAE(lat: number, lng: number) {
    return lat >= UAE_BBOX.latMin && lat <= UAE_BBOX.latMax &&
      lng >= UAE_BBOX.lngMin && lng <= UAE_BBOX.lngMax;
  }

  function computeCentroidFromLinearRing(ring: any[]) {
    let sx = 0,
      sy = 0,
      n = 0;
    ring.forEach((p: string | any[]) => {
      if (Array.isArray(p) && p.length >= 2) {
        sx += p[0];
        sy += p[1];
        n++;
      }
    });
    return n ? [sx / n, sy / n] : null;
  }

  function centroidOfGeometry(geometry: any, assumeSwapped = false) {
    if (!geometry || !geometry.type || !geometry.coordinates) return null;

    if (geometry.type === 'Polygon') {
      const ring = geometry.coordinates[0];
      if (!ring) return null;
      if (!assumeSwapped) return computeCentroidFromLinearRing(ring);
      const swapped = ring.map((pt: any[]) => [pt[1], pt[0]]);
      return computeCentroidFromLinearRing(swapped);
    }

    if (geometry.type === 'MultiPolygon') {
      let sx = 0,
        sy = 0,
        count = 0;
      geometry.coordinates.forEach((polygon: any[]) => {
        const ring = polygon && polygon[0];
        if (ring) {
          if (!assumeSwapped) {
            const c = computeCentroidFromLinearRing(ring);
            if (c) {
              sx += c[0];
              sy += c[1];
              count++;
            }
          } else {
            const swapped = ring.map((pt: any[]) => [pt[1], pt[0]]);
            const c = computeCentroidFromLinearRing(swapped);
            if (c) {
              sx += c[0];
              sy += c[1];
              count++;
            }
          }
        }
      });
      return count ? [sx / count, sy / count] : null;
    }

    return null;
  }

  function normalizeGeometryToLatLng(
    geometry: { type: string; coordinates: any },
    centerPoint: { coordinates: any }
  ) {
    if (!geometry) return geometry;

    const swap = (coords: any): any => {
      if (Array.isArray(coords) && typeof coords[0] === "number" && coords.length >= 2) {
        return [coords[1], coords[0]];
      }
      return Array.isArray(coords) ? coords.map(swap) : coords;
    };

    const c1 = centroidOfGeometry(geometry, false);
    if (c1) {
      const [lon1, lat1] = c1;
      if (pointInUAE(lat1, lon1)) {
        return {
          ...geometry,
          coordinates: swap(geometry.coordinates),
        };
      }
    }

    const c2 = centroidOfGeometry(geometry, true);
    if (c2) {
      const [lon2, lat2] = c2;
      if (pointInUAE(lat2, lon2)) {
        return {
          ...geometry,
          coordinates: geometry.coordinates,
        };
      }
    }

    if (centerPoint && Array.isArray(centerPoint.coordinates)) {
      const c = centerPoint.coordinates;
      if (c.length >= 2) {
        if (
          c[0] >= UAE_BBOX.latMin && c[0] <= UAE_BBOX.latMax &&
          c[1] >= UAE_BBOX.lngMin && c[1] <= UAE_BBOX.lngMax
        ) {
          return {
            ...geometry,
            coordinates: swap(geometry.coordinates),
          };
        }
        if (
          c[1] >= UAE_BBOX.latMin && c[1] <= UAE_BBOX.latMax &&
          c[0] >= UAE_BBOX.lngMin && c[0] <= UAE_BBOX.lngMax
        ) {
          return {
            ...geometry,
            coordinates: geometry.coordinates,
          };
        }
      }
    }

    return {
      ...geometry,
      coordinates: swap(geometry.coordinates),
    };
  }

  const generateGroupIcon = useCallback((char: string | number) => {
    if (!L) return null;
    return L.divIcon({
      html: `<div style="
        width: 32px; height: 32px; 
        border-radius: 50%; 
        background: white; 
        border: 3px solid #007BFF; 
        display: flex; align-items: center; justify-content: center;
        color: #007BFF; font-weight: bold; font-size: 14px;">
        ${char}
      </div>`,
      className: "custom-marker",
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });
  }, [L]);

  const generatePointIcon = useCallback((label: string) => {
    if (!L) return null;
    return L.divIcon({
      html: `<div style="
        width: 24px; height: 24px; 
        border-radius: 50%; 
        background: #007BFF; 
        color: white;
        display: flex; align-items: center; justify-content: center;
        font-size: 12px;">
        ${label}
      </div>`,
      className: "custom-point",
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });
  }, [L]);

  // Show loading while imports are pending
  if (!MapComponents || !L) {
    return (
      <div className="relative w-full h-full">
        <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
          <div className="text-center">
            <Loader2 className="h-8 w-8 mx-auto mb-2 text-primary animate-spin" />
            <p>Initializing map...</p>
          </div>
        </div>
      </div>
    );
  }

  const { MapContainer, TileLayer, Marker, Polygon, useMapEvents } = MapComponents;

  function MapEventsHandler() {
    const map = useMapEvents({
      zoomend: () => {
        setCurrentZoomLevel(map.getZoom());
      },
      moveend: () => {
        const center = map.getCenter();
        const bounds = map.getBounds();
        const zoom = map.getZoom();

        const bounds2GIS = {
          northEast: [bounds.getEast(), bounds.getNorth()],
          southEast: [bounds.getEast(), bounds.getSouth()],
          southWest: [bounds.getWest(), bounds.getSouth()],
          northWest: [bounds.getWest(), bounds.getNorth()],
        };

        onMapMoveEnd([center.lng, center.lat], bounds2GIS, zoom);
      },
    });

    useEffect(() => {
      const center = map.getCenter();
      const bounds = map.getBounds();
      const zoom = map.getZoom();

      const bounds2GIS = {
        northEast: [bounds.getEast(), bounds.getNorth()],
        southEast: [bounds.getEast(), bounds.getSouth()],
        southWest: [bounds.getWest(), bounds.getSouth()],
        northWest: [bounds.getWest(), bounds.getNorth()],
      };

      onMapLoaded([center.lng, center.lat], bounds2GIS, zoom);
      setIsLoading(false);
    }, [map]);

    return null;
  }

  return (
    <div className="relative w-full h-full">
      <MapContainer
        center={[25.0742823, 55.1885387]}
        zoom={9}
        scrollWheelZoom
        style={{ width: "100%", height: "100%", zIndex: 10 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://maps.google.com/">Google</a>'
          url="https://mt0.google.com/vt/lyrs=m&scale=2&x={x}&y={y}&z={z}"
        />

        {currentZoomLevel <= EMIRATE_POLYGONS_MAX_ZOOM &&
          emirates.map((em, idx) => {
            const normalized = normalizeGeometryToLatLng(em.geometry, em.center);
            return (
              <Polygon
                key={`em-${idx}`}
                pathOptions={{
                  color: "#2563eb",
                  weight: 0.3,
                  fillColor: em.color || "#3b82f6",
                  fillOpacity: 0.1,
                }}
                positions={normalized.coordinates}
              />
            );
          })
        }

        {currentZoomLevel >= DISTRICT_POLYGONS_MIN_ZOOM &&
          districts.map((dist, idx) => {
            const normalized = normalizeGeometryToLatLng(dist.geometry, dist.center);
            return (
              <Polygon
                key={`dist-${idx}`}
                pathOptions={{
                  color: "#2563eb",
                  weight: 0.3,
                  fillColor: dist.color || "#3b82f6",
                  fillOpacity: 0.1,
                }}
                positions={normalized.coordinates}
              />
            );
          })
        }

        {points.map((point) => {
          const pos: [number, number] = [point.point[1], point.point[0]];
          const markerId = point.id || point.payload?.id || `${pos[0]},${pos[1]}`;

          let icon;
          if (point.type === "group") {
            icon = generateGroupIcon(point.payload.count);
          } else {
            icon = generatePointIcon(point.payload?.title ? point.payload.title[0] : "?");
          }

          return (
            <Marker
              key={markerId}
              position={pos}
              icon={icon}
              eventHandlers={{
                click: () => {
                  if (point.type === "point") {
                    onMarkerClick(point.payload);
                  }
                },
              }}
            />
          );
        })}

        <MapEventsHandler />
      </MapContainer>

      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
          <div className="text-center">
            <Loader2 className="h-8 w-8 mx-auto mb-2 text-primary animate-spin" />
            <p>Loading map...</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
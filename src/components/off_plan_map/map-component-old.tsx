

// "use client"

// import { useEffect, useRef, useState } from "react"
// import { Loader2, MapIcon } from "lucide-react"
// import type { Map } from "@2gis/mapgl/types"
// import { load } from "@2gis/mapgl"
// import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

// declare global {
//   interface Window {
//     google: any
//   }
// }

// export function MapComponent({
//   points,
//   emirates,
//   districts,
//   onMapLoaded,
//   onMarkerClick,
//   onMapMoveEnd,
// }: {
//   points: any[]
//   emirates: any[]
//   districts: any[]
//   onMapLoaded: (center: number[], bounds: any, zoom: any) => void
//   onMarkerClick: (property: any) => void
//   onMapMoveEnd: (center: number[], bounds: any, zoom: any) => void
// }) {
//   const [isLoading, setIsLoading] = useState(true)
//   const mapRef = useRef<Map | null>(null)
//   const mapglAPIRef = useRef<any>(null)
//   const mapContainerRef = useRef<HTMLDivElement | null>(null)
//   const googleMapRef = useRef<google.maps.Map | null>(null)
//   const [isMapReady, setIsMapReady] = useState(false)
//   const [markers, setMarkers] = useState<any[]>([])
//   const [, setPolygons] = useState<any[]>([])
//   const [zoomLevel, setZoomLevel] = useState(0)
//   const prevZoomRef = useRef<any>()
//   const prevPointsRef = useRef<any[]>([])
//   const [mapType, setMapType] = useState<"2gis" | "google">("2gis")
//   const googleMarkersRef = useRef<google.maps.Marker[]>([])
//   const googlePolygonsRef = useRef<google.maps.Polygon[]>([])

//   useEffect(() => {
//     initializeMapGL()
//     // if (mapType === "2gis") {
//     // } else {
//     //   initializeGoogleMaps()
//     // }

//     return () => {
//       if (mapType === "2gis" && mapRef.current) {
//         mapRef.current.off("zoom", () => { })
//         mapRef.current.destroy()
//         mapRef.current = null
//       } else if (mapType === "google" && googleMapRef.current) {

//         googleMarkersRef.current.forEach((marker) => marker.setMap(null))
//         googlePolygonsRef.current.forEach((polygon) => polygon.setMap(null))
//         googleMarkersRef.current = []
//         googlePolygonsRef.current = []
//       }
//     }
//   }, [mapType])

//   const initializeMapGL = () => {
//     setIsLoading(true)
//     load().then((mapglAPI) => {
//       mapglAPIRef.current = mapglAPI
//       if (mapContainerRef.current && !mapRef.current) {
//         mapRef.current = new mapglAPI.Map(mapContainerRef.current, {
//           center: [55.1885387, 25.0742823],
//           zoom: 9,
//           pitch: 40,
//           key: "f589d28c-29f9-402c-80ad-91b3ca5307a0",
//         })

//         let zoomTimeout: NodeJS.Timeout
//         mapRef.current.on("zoom", () => {
//           clearTimeout(zoomTimeout)
//           zoomTimeout = setTimeout(() => {
//             const newZoom = mapRef.current!.getZoom()
//             setZoomLevel(newZoom)
//           }, 100)
//         })

//         let moveEndTimeout: NodeJS.Timeout
//         mapRef.current.on("moveend", () => {
//           clearTimeout(moveEndTimeout)
//           moveEndTimeout = setTimeout(() => {
//             onMapMoveEnd(mapRef.current!.getCenter(), mapRef.current!.getBounds(), mapRef.current!.getZoom())
//           }, 100)
//         })

//         mapRef.current.on("idle", () => {
//           console.log("the map is ready")
//           setIsMapReady(true)
//         })
//       }
//     })
//   }

//   const initializeGoogleMaps = () => {
//     setIsLoading(true)
//     if (!window.google || !window.google.maps) {

//       const script = document.createElement("script")
//       script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyACQMmIMLssuMqb0P4PYbM5hjlwNbBLeVo&libraries=places`
//       script.async = true
//       script.defer = true
//       script.onload = () => createGoogleMap()
//       document.head.appendChild(script)
//     } else {
//       createGoogleMap()
//     }
//   }

//   const createGoogleMap = () => {
//     if (mapContainerRef.current && !googleMapRef.current) {
//       googleMapRef.current = new window.google.maps.Map(mapContainerRef.current, {
//         center: { lat: 25.0742823, lng: 55.1885387, },
//         zoom: 9,
//         mapTypeId: window.google.maps.MapTypeId.ROADMAP,
//         streetViewControl: false,
//         mapTypeControl: false,
//         fullscreenControl: false,
//       })

//       window.google.maps.event.addListenerOnce(googleMapRef.current, "idle", () => {
//         console.log("Google map is ready")
//         setIsMapReady(true)
//       })

//       let zoomTimeout: NodeJS.Timeout;
//       window.google.maps.event.addListener(googleMapRef.current, "zoom_changed", () => {
//         if (googleMapRef.current) {
//           clearTimeout(zoomTimeout);
//           zoomTimeout = setTimeout(() => {
//             const newZoom = googleMapRef.current!.getZoom() || 0;
//             setZoomLevel(newZoom);
//           }, 100);
//         }
//       })

//       let moveEndTimeout: NodeJS.Timeout
//       window.google.maps.event.addListener(googleMapRef.current, "bounds_changed", () => {
//         if (googleMapRef.current) {
//           const center = googleMapRef.current.getCenter()
//           const bounds = googleMapRef.current.getBounds();
//           const zoom = googleMapRef.current.getZoom()
//           const ne = bounds!.getNorthEast();
//           const sw = bounds!.getSouthWest();
//           const bounds2GIS = {
//             northEast: [ne.lat(), ne.lng()],
//             southWest: [sw.lat(), sw.lng()]
//           };

//           if (center && bounds && bounds2GIS && zoom) {
//             clearTimeout(moveEndTimeout)
//             moveEndTimeout = setTimeout(() => {
//               onMapMoveEnd([center.lng(), center.lat()], bounds2GIS, zoom)
//             }, 100)

//           }
//         }
//       })
//     }
//   }

//   useEffect(() => {
//     if (isMapReady) {
//       if (mapType === "2gis" && mapRef.current) {
//         console.log(mapRef.current.getBounds(), 'bounds values on 2gis')
//         onMapLoaded(mapRef.current.getCenter(), mapRef.current.getBounds(), mapRef.current.getZoom())
//         drawMapGLPolygons()
//         drawMapGLMarkers()
//       } else if (mapType === "google" && googleMapRef.current) {
//         const center = googleMapRef.current.getCenter()
//         const bounds = googleMapRef.current.getBounds()
//         const zoom = googleMapRef.current.getZoom()

//         const ne = bounds!.getNorthEast();
//         const sw = bounds!.getSouthWest();
//         const bounds2GIS = {
//           northEast: [ne.lat(), ne.lng()],
//           southWest: [sw.lat(), sw.lng()]
//         };
//         if (center && bounds && bounds2GIS && zoom) {
//           onMapLoaded([center.lng(), center.lat()], bounds2GIS, zoom)
//         }
//         drawGooglePolygons()
//         drawGoogleMarkers()
//       }
//       setIsLoading(false)
//     }
//   }, [isMapReady, mapType])

//   useEffect(() => {
//     if (!isMapReady) return

//     const pointsChanged = JSON.stringify(prevPointsRef.current) !== JSON.stringify(points)
//     const zoomChanged = prevZoomRef.current !== zoomLevel

//     if (pointsChanged || zoomChanged) {
//       if (mapType === "2gis") {
//         drawMapGLMarkers()
//       } else {
//         drawGoogleMarkers()
//       }
//       prevZoomRef.current = zoomLevel
//       prevPointsRef.current = points
//     }
//   }, [points, zoomLevel, mapType])

//   const getCentroid = (coords3D: number[][][]): [number, number] => {
//     const coords = coords3D[0]
//     let x = 0,
//       y = 0
//     coords.forEach(([lng, lat]) => {
//       x += lng
//       y += lat
//     })
//     const len = coords.length
//     return [x / len, y / len]
//   }

//   const drawMapGLPolygons = () => {
//     if (!mapRef.current || !mapglAPIRef.current) {
//       console.error("Cannot draw polygons, map or mapglAPI not ready")
//       return
//     }

//     const allPolygons = []

//     for (const emirate of emirates) {
//       const polygon = drawPolygons("emirates", emirate.name, emirate.geometry.coordinates[0], emirate.color)
//       allPolygons.push(polygon)
//     }

//     for (const district of districts) {
//       const polygon = drawPolygons("districts", district.name, district.geometry.coordinates[0], district.color)
//       allPolygons.push(polygon)
//     }
//     setPolygons(allPolygons)
//   }

//   const drawGooglePolygons = () => {
//     if (!googleMapRef.current) {
//       console.error("Cannot draw polygons, Google map not ready")
//       return
//     }

//     googlePolygonsRef.current.forEach((polygon) => polygon.setMap(null))
//     googlePolygonsRef.current = []

//     for (const emirate of emirates) {
//       const paths = emirate.geometry.coordinates[0].map(([lat, lng]: number[]) => {
//         return { lat: lng, lng: lat }
//       })

//       const polygon = new window.google.maps.Polygon({
//         paths,
//         strokeColor: "#2563eb",
//         strokeOpacity: 0.8,
//         strokeWeight: 2,
//         fillColor: emirate.color || "#3b82f6",
//         fillOpacity: 0.1,
//         map: googleMapRef.current,
//       })

//       const centroid = getCentroid([emirate.geometry.coordinates[0]])
//       const label = new window.google.maps.Marker({
//         position: { lat: centroid[1], lng: centroid[0] },
//         map: googleMapRef.current,
//         label: {
//           text: emirate.name,
//           color: "#2563eb",
//           fontSize: "12px",
//         },
//         icon: {
//           path: window.google.maps.SymbolPath.CIRCLE,
//           scale: 0,
//         },
//       })

//       googlePolygonsRef.current.push(polygon)
//     }

//     for (const district of districts) {
//       const paths = district.geometry.coordinates[0].map(([lat, lng]: number[]) => {
//         return { lat: lng, lng: lat }
//       })

//       const polygon = new window.google.maps.Polygon({
//         paths,
//         strokeColor: "#2563eb",
//         strokeOpacity: 0.8,
//         strokeWeight: 2,
//         fillColor: district.color || "#3b82f6",
//         fillOpacity: 0.1,
//         map: googleMapRef.current,
//       })

//       const centroid = getCentroid([district.geometry.coordinates[0]])
//       const label = new window.google.maps.Marker({
//         position: { lat: centroid[1], lng: centroid[0] },
//         map: googleMapRef.current,
//         label: {
//           text: district.name,
//           color: "#2563eb",
//           fontSize: "12px",
//         },
//         icon: {
//           path: window.google.maps.SymbolPath.CIRCLE,
//           scale: 0,
//         },
//       })

//       googlePolygonsRef.current.push(polygon)
//     }
//   }

//   const drawPolygons = (type: "districts" | "emirates", title: string, polygon: any[], color: string) => {
//     if (!mapRef.current || !mapglAPIRef.current) {
//       console.error("Cannot draw polygons, map or mapglAPI not ready")
//       return
//     }
//     const formattedCoordinates = [polygon.map(([lat, lng]: number[]) => [lng, lat])]

//     const polygonColor = color ? hexToRgba(color, 0.1) : ""
//     const polygonItem = new mapglAPIRef.current.Polygon(mapRef.current, {
//       coordinates: formattedCoordinates,
//       color: polygonColor,
//       strokeColor: "#007BFF",
//       strokeWidth: 1,
//       fill: {
//         color: color || "#3b82f680",
//       },
//       stroke: {
//         color: "#2563eb",
//         width: 2,
//       },
//       minZoom: type === "emirates" ? 0 : 10,
//       maxZoom: type === "emirates" ? 10 : 20,
//     })

//     const centroid = getCentroid(formattedCoordinates)

//     new mapglAPIRef.current.Marker(mapRef.current, {
//       coordinates: centroid,
//       label: {
//         text: title,
//         fontSize: 6,
//         color: "#2563eb",
//         minZoom: type === "emirates" ? 0 : 12,
//         maxZoom: type === "emirates" ? 10 : 22,
//       },
//       icon: null,
//     })

//     return polygonItem
//   }

//   const hexToRgba = (hex: string, opacity: number) => {
//     hex = hex.replace(/^#/, "")
//     if (hex.length === 3) {
//       hex = hex
//         .split("")
//         .map((char) => char + char)
//         .join("")
//     }

//     const bigint = Number.parseInt(hex, 16)
//     const r = (bigint >> 16) & 255
//     const g = (bigint >> 8) & 255
//     const b = bigint & 255

//     return `rgba(${r}, ${g}, ${b}, ${opacity})`
//   }

//   function getRandomColor() {
//     const hue = Math.floor(Math.random() * 360)
//     const saturation = 100
//     const lightness = 60 + Math.random() * 20
//     return `hsl(${hue}, ${saturation}%, ${lightness}%)`
//   }

//   const generateCircleIcon = (color: string) => {
//     const size = 10
//     const svg = `
//       <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
//         <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="${color}" />
//       </svg>
//     `
//     return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
//   }

//   function generateGroupIconSVG(count: number) {
//     const size = 32
//     const strokeWidth = 3
//     const radius = (size - strokeWidth) / 2

//     const svg = `
//       <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
//         <circle cx="${size / 2}" cy="${size / 2}" r="${radius}" fill="white" stroke="#007BFF" strokeWidth="${strokeWidth}" />
//         <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle"
//               fill="#007BFF" fontSize="14" fontWeight="bold" fontFamily="sans-serif">
//           ${count}
//         </text>
//       </svg>
//     `
//     return `data:image/svg+xml;base64,${btoa(svg)}`
//   }

//   const drawMapGLMarkers = () => {
//     console.log("draw MapGL markers triggered")
//     if (!mapRef.current || !mapglAPIRef.current) {
//       console.error("Cannot draw markers, map or mapglAPI not ready")
//       return
//     }

//     markers.forEach((m) => m.destroy())
//     const markerObjects: any[] = []

//     for (const point of points) {
//       let icon
//       if (point.type === "group") {
//         icon = generateGroupIconSVG(point.payload.count)
//       } else {
//         const randomColor = getRandomColor()
//         icon = generateCircleIcon(randomColor)
//       }

//       const marker = new mapglAPIRef.current.Marker(mapRef.current, {
//         coordinates: point.point,
//         interactive: true,
//         icon,
//       })

//       if (point.type === "point") {
//         marker.on("click", () => {
//           onMarkerClick(point.payload)
//         })
//       }
//       markerObjects.push(marker)
//     }
//     setMarkers(markerObjects)
//   }

//   const drawGoogleMarkers = () => {
//     console.log("draw Google markers triggered")
//     if (!googleMapRef.current) {
//       console.error("Cannot draw markers, Google map not ready")
//       return
//     }

//     googleMarkersRef.current.forEach((marker) => marker.setMap(null))
//     googleMarkersRef.current = []

//     for (const point of points) {
//       let icon
//       if (point.type === "group") {
//         icon = {
//           url: generateGroupIconSVG(point.payload.count),
//           scaledSize: new window.google.maps.Size(32, 32),
//           anchor: new window.google.maps.Point(16, 16),
//         }
//       } else {
//         const randomColor = getRandomColor()
//         icon = {
//           url: generateCircleIcon(randomColor),
//           scaledSize: new window.google.maps.Size(10, 10),
//           anchor: new window.google.maps.Point(5, 5),
//         }
//       }

//       const marker = new window.google.maps.Marker({
//         position: { lat: point.point[1], lng: point.point[0] },
//         map: googleMapRef.current,
//         icon,
//       })

//       if (point.type === "point") {
//         marker.addListener("click", () => {
//           onMarkerClick(point.payload)
//         })
//       }

//       googleMarkersRef.current.push(marker)
//     }
//   }

//   const handleMapTypeChange = (value: string) => {
//     if (value === "2gis" || value === "google") {
//       setIsMapReady(false)
//       setMapType(value)
//     }
//   }

//   return (
//     <div className="relative w-full h-full">
//       <div className="absolute top-4 left-4 z-10 bg-white rounded-md shadow-md p-2">
//         <ToggleGroup type="single" value={mapType} onValueChange={handleMapTypeChange}>
//           <ToggleGroupItem value="2gis" aria-label="2GIS Map">
//             <MapIcon className="h-4 w-4 mr-2" />
//             2GIS
//           </ToggleGroupItem>
//           <ToggleGroupItem value="google" aria-label="Google Maps">
//             <MapIcon className="h-4 w-4 mr-2" />
//             Google
//           </ToggleGroupItem>
//         </ToggleGroup>
//       </div>
//       <div className="w-full h-full">
//         <div ref={mapContainerRef} id="map-container" style={{ width: "100%", height: "100%" }} />
//       </div>
//       {isLoading ? (
//         <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
//           <div className="text-center">
//             <Loader2 className="h-8 w-8 mx-auto mb-2 text-primary animate-spin" />
//             <p>Loading map...</p>
//           </div>
//         </div>
//       ) : (
//         <></>
//       )}
//     </div>
//   )
// }

// =============================================================================================================================================

// "use client";

// import { useEffect, useRef, useState } from "react";
// import { Loader2 } from "lucide-react";
// // import companyOffPlanRepository from "@/repositories/company/companyOffPlanRepository";
// import { Map } from "@2gis/mapgl/types";
// import { load } from "@2gis/mapgl";

// export function MapComponent({ points, emirates, districts, onMapLoaded, onMarkerClick, onMapMoveEnd }: { points: any[]; emirates: any[]; districts: any[]; onMapLoaded: (center: number[], bounds: any, zoom: any) => void; onMarkerClick: (property: any) => void; onMapMoveEnd: (center: number[], bounds: any, zoom: any) => void }) {
//   const [isLoading, setIsLoading] = useState(true);
//   const mapRef = useRef<Map | null>(null);
//   const mapglAPIRef = useRef<any>(null);
//   const mapContainerRef = useRef<HTMLDivElement | null>(null);
//   const [isMapReady, setIsMapReady] = useState(false);
//   const [markers, setMarkers] = useState<any[]>([]);
//   const [, setPolygons] = useState<any[]>([]);
//   const [zoomLevel, setZoomLevel] = useState(0);
//   const prevZoomRef = useRef<any>();
//   const prevPointsRef = useRef<any[]>([]);


//   useEffect(() => {
//     load().then((mapglAPI) => {
//       mapglAPIRef.current = mapglAPI;
//       if (mapContainerRef.current && !mapRef.current) {
//         mapRef.current = new mapglAPI.Map(mapContainerRef.current, {
//           center: [55.1885387, 25.0742823],
//           zoom: 9,
//           pitch: 40,
//           key: "f589d28c-29f9-402c-80ad-91b3ca5307a0",
//         });

//         let zoomTimeout: NodeJS.Timeout;
//         mapRef.current.on("zoom", () => {
//           clearTimeout(zoomTimeout);
//           zoomTimeout = setTimeout(() => {
//             const newZoom = mapRef.current!.getZoom();
//             setZoomLevel(newZoom);
//           }, 100);
//         });

//         let moveEndTimeout: NodeJS.Timeout;
//         mapRef.current.on("moveend", () => {
//           clearTimeout(moveEndTimeout);
//           moveEndTimeout = setTimeout(() => {
//             onMapMoveEnd(mapRef.current!.getCenter(), mapRef.current!.getBounds(), mapRef.current!.getZoom());
//           }, 100);
//         });


//         mapRef.current.on("idle", () => {
//           console.log("the map is ready");
//           setIsMapReady(true);
//         });
//       }
//     });

//     return () => {
//       if (mapRef.current) {
//         mapRef.current.off("zoom", () => { });
//         mapRef.current.destroy();
//         mapRef.current = null;
//       }
//     };
//   }, []);

//   useEffect(() => {
//     if (isMapReady) {
//       onMapLoaded(mapRef.current!.getCenter(), mapRef.current!.getBounds(), mapRef.current!.getZoom());

//       const allPolygons = [];

//       for (const emirate of emirates) {
//         const polygon = drawPolygons("emirates", emirate.name, emirate.geometry.coordinates[0], emirate.color);
//         allPolygons.push(polygon);
//       }

//       for (const district of districts) {
//         const polygon = drawPolygons("districts", district.name, district.geometry.coordinates[0], district.color);
//         allPolygons.push(polygon);
//       }
//       setPolygons(allPolygons);
//       setIsLoading(false);

//       drawMarkers();

//     }
//   }, [isMapReady]);


//   useEffect(() => {
//     if (!isMapReady) return;

//     const pointsChanged = JSON.stringify(prevPointsRef.current) !== JSON.stringify(points);
//     const zoomChanged = prevZoomRef.current !== zoomLevel;

//     if (pointsChanged || zoomChanged) {
//       drawMarkers();
//       prevZoomRef.current = zoomLevel;
//       prevPointsRef.current = points;
//     }
//   }, [points, zoomLevel]);

//   const getCentroid = (coords3D: number[][][]): [number, number] => {
//     const coords = coords3D[0];
//     let x = 0, y = 0;
//     coords.forEach(([lng, lat]) => {
//       x += lng;
//       y += lat;
//     });
//     const len = coords.length;
//     return [x / len, y / len];
//   };


//   const drawPolygons = (type: "districts" | "emirates", title: string, polygon: any[], color: string) => {
//     if (!mapRef.current || !mapglAPIRef.current) {
//       console.error("Cannot draw polygons, map or mapglAPI not ready");
//       return;
//     }
//     const formattedCoordinates = [polygon.map(([lat, lng]: number[]) => [lng, lat])];

//     const polygonColor = color ? hexToRgba(color, 0.1) : "";
//     const polygonItem = new mapglAPIRef.current.Polygon(mapRef.current, {
//       coordinates: formattedCoordinates,
//       color: polygonColor,
//       strokeColor: "#007BFF",
//       strokeWidth: 1,
//       fill: {
//         color: color || "#3b82f680",
//       },
//       stroke: {
//         color: "#2563eb",
//         width: 2,
//       },
//       minZoom: type === "emirates" ? 0 : 10,
//       maxZoom: type === "emirates" ? 10 : 20,
//     });

//     const centroid = getCentroid(formattedCoordinates); // lng, lat

//     new mapglAPIRef.current.Marker(mapRef.current, {
//       coordinates: centroid,
//       label: {
//         text: title,
//         fontSize: 6,
//         color: '#2563eb',
//         minZoom: type === "emirates" ? 0 : 12,
//         maxZoom: type === "emirates" ? 10 : 22,
//       },
//       icon: null
//     });


//     return polygonItem;
//   };

//   const hexToRgba = (hex: string, opacity: number) => {
//     hex = hex.replace(/^#/, "");
//     if (hex.length === 3) {
//       hex = hex
//         .split("")
//         .map((char) => char + char)
//         .join("");
//     }

//     const bigint = parseInt(hex, 16);
//     const r = (bigint >> 16) & 255;
//     const g = (bigint >> 8) & 255;
//     const b = bigint & 255;

//     return `rgba(${r}, ${g}, ${b}, ${opacity})`;
//   };

//   function getRandomColor() {
//     const hue = Math.floor(Math.random() * 360);
//     const saturation = 100;
//     const lightness = 60 + Math.random() * 20;
//     return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
//   }

//   const generateCircleIcon = (color: string) => {
//     const size = 10; // pixel size of the dot
//     const svg = `
//       <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
//         <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="${color}" />
//       </svg>
//     `;
//     return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
//   };


//   function generateGroupIconSVG(count: number) {
//     const size = 32;
//     const strokeWidth = 3;
//     const radius = (size - strokeWidth) / 2;

//     const svg = `
//       <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
//         <circle cx="${size / 2}" cy="${size / 2}" r="${radius}" fill="white" stroke="#007BFF" stroke-width="${strokeWidth}" />
//         <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle"
//               fill="#007BFF" font-size="14" font-weight="bold" font-family="sans-serif">
//           ${count}
//         </text>
//       </svg>
//     `;
//     return `data:image/svg+xml;base64,${btoa(svg)}`;
//   }




//   const drawMarkers = () => {

//     console.log('draw markers triggered')
//     if (!mapRef.current || !mapglAPIRef.current) {
//       console.error("Cannot draw polygons, map or mapglAPI not ready");
//       return;
//     }
//     markers.forEach((m) => m.destroy());
//     const markerObjects: any[] = [];
//     for (const point of points) {
//       let icon;
//       if (point.type === 'group') {
//         icon = generateGroupIconSVG(point.payload.count);
//       } else {
//         const randomColor = getRandomColor();
//         icon = generateCircleIcon(randomColor)
//       }

//       //TODO clear click event if needed
//       const marker = new mapglAPIRef.current.Marker(mapRef.current, {
//         coordinates: point.point,
//         interactive: true,
//         icon,
//       })

//       if (point.type === 'point') {
//         marker.on("click", () => {
//           onMarkerClick(point.payload);
//         });
//       }
//       markerObjects.push(marker);
//     }
//     setMarkers(markerObjects);
//   };

//   return (
//     <div className="relative w-full h-full">
//       <div className="w-full h-full">
//         <div ref={mapContainerRef} id="map-container" style={{ width: "100%", height: "100%" }} />
//       </div>
//       {isLoading ? (
//         <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
//           <div className="text-center">
//             <Loader2 className="h-8 w-8 mx-auto mb-2 text-primary animate-spin" />
//             <p>Loading map...</p>
//           </div>
//         </div>
//       ) : (
//         <></>
//       )}
//     </div>
//   );
// }

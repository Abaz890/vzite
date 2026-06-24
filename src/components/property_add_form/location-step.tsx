import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import type { UseFormReturn } from "react-hook-form";
import { MapPin } from "lucide-react";

import { Input } from "@/components/ui/input";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GoogleMap, Marker, useJsApiLoader, Autocomplete, Libraries } from "@react-google-maps/api";
import companyPropertyRepository from "@/repositories/company/companyPropertyRepository";
import { SelectDynamic } from "../ui/selectDynamic";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 25.276987,
  lng: 55.296249,
};

export default function LocationStep({ form, property }: { form: UseFormReturn<any>, property: any }) {
  const [selectedEmirate, setSelectedEmirate] = useState<string | null>(form.getValues('emirate_id'));

  const [mapLoaded, setMapLoaded] = useState(false);
  const [, setMapCenter] = useState({ lat: 25.276987, lng: 55.296249 });
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number }>();
  const [isLoading, setIsLoading] = useState(true);
  const isInitialMount = useRef(true);
  const libraries = useMemo<Libraries>(() => ["places"], []);
  const apiKey = "AIzaSyCL1A4Ep_9OQan9gYIdBBR8UZpRMFyJAGE";

  const fetchEmirates = async function () {
    const response = await companyPropertyRepository.getEmirates("mini");
    setIsLoading(false);
    return {
      data: response.success ? response.data.data.map((item: any) => ({ id: item.id, label: item.name, value: item.id.toString(), center: item.center.coordinates })) : [],
      lastPage: response.success ? response.data.last_page : 1,
    };
  };

  const fetchDistricts = async function (page: number, query: string) {
    setIsLoading(true);
    const response = await companyPropertyRepository.getDistricts(page, query, selectedEmirate!, "mini");
    setIsLoading(false);
    return {
      data: response.success ? response.data.data.map((item: any) => ({ id: item.id, label: item.name, value: item.id.toString(), center: item.center.coordinates })) : [],
      lastPage: response.success ? response.data.last_page : 1,
    };
  };

  const fetchBuildings = async function (page: number, query: string) {
    const response = await companyPropertyRepository.getBuildings(page, query);
    return {
      data: response.success ? response.data.data.map((item: any) => ({ id: item.id, label: item.name, value: item.slug })) : [],
      lastPage: response.success ? response.data.last_page : 1,
    };
  };

  const fetchAreas = async function (page: number, query: string) {
    const response = await companyPropertyRepository.getAreas(page, query);
    return {
      data: response.success ? response.data.data.map((item: any) => ({ id: item.id, label: item.name, value: item.slug })) : [],
      lastPage: response.success ? response.data.last_page : 1,
    };
  };

  const handleLocationChange = (type: "emirate" | "district", center: [number, number] | null) => {
    console.log(`Scrolling map to ${type}:`, center);
    if (center) {
      setMapCenter({ lat: center[0], lng: center[1] });
      mapInstance?.setCenter(new google.maps.LatLng(center[0], center[1]));
      type === "emirate" ? mapInstance?.setZoom(10) : mapInstance?.setZoom(13);
    }
    if (type === 'emirate') {

    }

  };

  useEffect(() => {


    const timer = setTimeout(() => {
      setMapLoaded(true);
      initializeMap();
    }, 500);


    return () => clearTimeout(timer);
  }, []);

  const initializeMap = () => {

    // form.setValue("lat", mapCenter.lat.toString());
    // form.setValue("lng", mapCenter.lng.toString());
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
    libraries,
  });

  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);


  const onLoad = useCallback((map: google.maps.Map) => {
    if (map) {
      // const bounds = new window.google.maps.LatLngBounds(center);
      map.setCenter(center);
      map.setZoom(10);
      setMapInstance(map);

      const markerLat = form.getValues('lat')
      const markerLng = form.getValues('lng')
      if (markerLat && markerLng) {
        setCoordinates({
          lat: markerLat,
          lng: markerLng,
        });
      }

    }
  }, []);

  const onUnmount = useCallback(function callback() {
    setMapInstance(null);
  }, []);

  // const getAddress = async (lat: any, lng: any) => {
  //   try {
  //     const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
  //     const data = await response.json();
  //     if (response.status === 200) {
  //       return data;
  //     }
  //     throw new Error("Address not found");
  //   } catch (error) {
  //     console.error("Error getting address:", error);
  //     return "Unable to retrieve address";
  //   }
  // };

  const onMapClick = async (event: any) => {
    setCoordinates({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });

    form.setValue("lat", event.latLng.lat());
    form.setValue("lng", event.latLng.lng());

    // const address = await getAddress(event.latLng.lat(), event.latLng.lng());
    // console.log(address);
  };

  const onLoadAutocomplete = useCallback((auto: google.maps.places.Autocomplete) => {
    setAutocomplete(auto);
  }, []);

  const onPlaceChanged = () => {
    if (!autocomplete || !mapInstance) return;
    const place = autocomplete.getPlace();
    if (!place.geometry?.location) return;

    // Center map on selected place
    mapInstance.panTo(place.geometry.location);
    mapInstance.setZoom(15);

    // Optionally, drop a marker
    new google.maps.Marker({
      position: place.geometry.location,
      map: mapInstance,
    });
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      form.setValue('district_id', '');
      fetchDistricts(1, '');
    }
  }, [selectedEmirate]);

  // const handleMapClick = (event: any) => {
  //   const newPosition = {
  //     lat: event.latLng.lat(),
  //     lng: event.latLng.lng(),
  //   };

  //   // Update form values
  //   form.setValue("lat", newPosition.lat.toString());
  //   form.setValue("lng", newPosition.lng.toString());
  // };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Property Location</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <FormField
              control={form.control}
              name="emirate_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Emirate</FormLabel>
                  <SelectDynamic
                    name="Emirate"
                    field={field}
                    defaultValue={property.emirate ? { label: property.emirate.name, value: form.getValues('emirate_id') } : undefined}
                    onChange={(value, center) => {
                      setSelectedEmirate(value);
                      field.onChange(value);
                      handleLocationChange("emirate", center!);
                    }}
                    fetchOptions={async () => await fetchEmirates()}
                  />

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="district_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>District</FormLabel>
                  <SelectDynamic
                    name="District"
                    field={field}
                    defaultValue={form.getValues('district_id') && property.district ? { label: property.district.name, value: form.getValues('district_id') } : undefined}
                    onChange={(value, center) => {
                      field.onChange(value);
                      handleLocationChange("district", center!);
                    }}
                    fetchOptions={async (page, query) => await fetchDistricts(page, query)}
                    disabled={isLoading || !selectedEmirate}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="mt-6 rounded-md relative">
            {mapLoaded ? (
              <div className="grid grid-cols-12 gap-3 col-span-12 min-h-[300px] flex my-4">
                <div className="flex flex-col col-span-4">

                  <div className="flex flex-col mb-3">
                    <FormField
                      control={form.control}
                      name="building_id"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Building</FormLabel>
                          <SelectDynamic
                            name="building"
                            field={field}
                            defaultValue={property.building ? { label: property.building.name, value: form.getValues('building_id') } : undefined}
                            onChange={field.onChange} fetchOptions={async (page, query) => await fetchBuildings(page, query)} />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex flex-col mb-3">
                    <FormField
                      control={form.control}
                      name="area_id"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Area </FormLabel>
                          <SelectDynamic
                            name="area"
                            field={field}
                            defaultValue={property.area ? { label: property.area.name, value: form.getValues('area_id') } : undefined}
                            onChange={field.onChange} fetchOptions={async (page, query) => await fetchAreas(page, query)} />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex flex-col mb-3">
                    <FormField
                      control={form.control}
                      name="lng"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Longitude</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. 55.296249" {...field} disabled={true} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex flex-col mb-3">
                    <FormField
                      control={form.control}
                      name="lat"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Latitude</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. 25.276987" {...field} disabled={true} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  {/* <div className="flex flex-col mb-3">
                    <Label className="mb-3">Road</Label>
                    <Input disabled={true}></Input>
                  </div>
                  <div className="flex flex-col mb-3">
                    <Label className="mb-3">Suburb</Label>
                    <Input disabled={true}></Input>
                  </div> */}
                </div>
                <div className="col-span-8">
                  {isLoaded ? (
                    <div className="relative w-full h-full">
                      <Autocomplete
                        onLoad={onLoadAutocomplete}
                        onPlaceChanged={onPlaceChanged}
                        options={{
                          componentRestrictions: { country: "ae" },
                          types: ["establishment"],
                        }}
                      >
                        <input
                          type="text"
                          placeholder="Search for places..."
                          className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 w-3/4 max-w-md px-4 py-2 border rounded shadow"
                        />
                      </Autocomplete>

                      <GoogleMap
                        mapContainerStyle={containerStyle}
                        zoom={10}
                        onLoad={onLoad}
                        onUnmount={onUnmount}
                        onClick={(e) => onMapClick(e)}
                        options={{
                          streetViewControl: false,
                          mapTypeControl: false,
                          fullscreenControl: false,
                        }}
                      >
                        {coordinates ? <Marker position={{ lat: coordinates!.lat, lng: coordinates!.lng }}></Marker> : <></>}
                        <></>
                      </GoogleMap>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <MapPin className="h-10 w-10 text-muted-foreground animate-pulse" />
                <p className="text-muted-foreground mt-2">Loading map...</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

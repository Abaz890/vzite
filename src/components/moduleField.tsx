import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SelectRelational } from "@/components/ui/selectRelational";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/datePicker";
import { Dropzone } from "@/components/ui/dropzone";
// import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
// import { useCallback, useState } from "react";

interface ModuleFieldProps {
  type: string;
  title: string;
  name: string;
  placeholder : string
  values: Array<{ title: string; value: string }>;
  related_module: any;
}

export function ModuleField(
  {
    module_field,
    formData,
    enableAddRelatedItems,
    onModuleFieldUpdated,
    disabled
  }: {
    module_field: ModuleFieldProps;
    formData: { [key: string]: string };
    enableAddRelatedItems: boolean;
    onModuleFieldUpdated: (data: { [key: string]: string }) => void
    disabled?: boolean
  },
) {
  // const [, setMap] = useState(null);
  // const [coordinates, setCoordinates] = useState<{ lat: number; lng: number }>();

  const handleChange = (field: string, value: string) => {
    const updatedFormData = {
      ...formData,
      [field]: value,
    };

    onModuleFieldUpdated(updatedFormData);
  };

  const handleFileUpload = (field: string, fileId: string | string[]) => {
    const currentValue = formData[field] ?? "";
    const newValue = currentValue.length > 0 ? `${currentValue},${fileId}` : `${fileId}`;
    handleChange(field, newValue);
  };

  // const onLoad = useCallback((map: any) => {
  //   if (map) {
  //     const bounds = new window.google.maps.LatLngBounds(center);
  //     map.fitBounds(bounds);
  //     setMap(map);
  //   }
  // }, []);

  // const onUnmount = useCallback(function callback() {
  //   setMap(null);
  // }, []);

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

  // const onMapClick = async (event: any) => {
  //   setCoordinates({
  //     lat: event.latLng.lat(),
  //     lng: event.latLng.lng(),
  //   });
  //   const address = await getAddress(event.latLng.lat(), event.latLng.lng());
  //   const updatedFormData = {
  //     ...formData,
  //     ["location"]: address.display_name,
  //     ["location_lng"]: event.latLng.lng(),
  //     ["location_lat"]: event.latLng.lat(),
  //     ["location_area"]: address.address.neighbourhood,
  //     ["location_road"]: address.address.road,
  //     ["location_city"]: address.address.city,
  //     ["location_suburb"]: address.address.suburb,
  //   };
  //   onModuleFieldUpdated(updatedFormData);
  // };

  // const containerStyle = {
  //   width: "100%",
  //   height: "100%",
  // };

  // const center = {
  //   lat: 25.276987,
  //   lng: 55.296249,
  // };

  // const { isLoaded } = useJsApiLoader({
  //   id: "google-map-script",
  //   googleMapsApiKey: "",
  // });

  return (() => {
    switch (module_field.type) {
      case "text":
        return (
          <div className="grid gap-3 col-span-6 my-2">
            <Label>{module_field.title}</Label>
            <Input placeholder={module_field.placeholder} className="col-span-3" value={formData[module_field.name]} onChange={(e) => handleChange(module_field.name, e.target.value)} disabled={disabled} />
          </div>
        );
      case "textarea":
        return (
          <div className="grid gap-3 col-span-12 my-4">
            <Label>{module_field.title}</Label>
            <Textarea value={formData[module_field.name]} onChange={(e) => handleChange(module_field.name, e.target.value)} disabled={disabled} />
          </div>
        );
      case "select":
        return (
          <div className="grid gap-3 col-span-6 my-2">
            <Label>{module_field.title}</Label>
            <Select defaultValue={formData[module_field.name]} onValueChange={(value) => handleChange(module_field.name, value)} disabled={disabled}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder={`Select a ${module_field.name}`} />
              </SelectTrigger>
              <SelectContent>
                {module_field.values.length > 0
                  ? module_field.values.map((value: any, key: number) => (
                    <SelectItem key={key} value={value.value}>
                      {value.title}
                    </SelectItem>
                  ))
                  : null}
              </SelectContent>
            </Select>
          </div>
        );
      case "select_relational":
        return (
          <div className="grid gap-3 col-span-6 my-2">
            <Label>{module_field.title}</Label>
            <SelectRelational title={module_field.title} name={module_field.name} relatedModule={module_field.related_module} defaultValue={formData[module_field.name] ? { label: formData[`${module_field.name}_label`], value: formData[module_field.name] } : undefined} onChange={(value) => handleChange(module_field.name, value)} enableAddRelatedItems={enableAddRelatedItems} disabled={disabled}></SelectRelational>
          </div>
        );
      case "map":
        return (
          <div className="grid grid-cols-12 gap-3 col-span-12  flex my-4">
            <div className="flex flex-col col-span-4">
              <div className="flex flex-col mb-3">
                <Label className="mb-3">Address</Label>
                <Input name={module_field.name} value={formData ? formData[module_field.name] : ""} onChange={(e) => handleChange(module_field.name, e.target.value)} disabled={disabled}></Input>
              </div>
              <div className="flex flex-col mb-3">
                <Label className="mb-3">City</Label>
                <Input value={formData ? formData["location_city"] : ""} disabled={true}></Input>
              </div>
              <div className="flex flex-col mb-3">
                <Label className="mb-3">Area</Label>
                <Input value={formData ? formData["location_area"] : ""} disabled={true}></Input>
              </div>
              <div className="flex flex-col mb-3">
                <Label className="mb-3">Road</Label>
                <Input value={formData ? formData["location_road"] : ""} disabled={true}></Input>
              </div>
              <div className="flex flex-col mb-3">
                <Label className="mb-3">Suburb</Label>
                <Input value={formData ? formData["location_suburb"] : ""} disabled={true}></Input>
              </div>
            </div>
            <div className="col-span-8">
              {/* {isLoaded ? (
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  // center={center}
                  onLoad={onLoad}
                  onUnmount={onUnmount}
                  onClick={(e) => onMapClick(e)}
                >
                  {coordinates ? <Marker position={{ lat: coordinates!.lat, lng: coordinates!.lng }}></Marker> : <></>}
                  <></>
                </GoogleMap>
              ) : (
                <></>
              )} */}
            </div>
          </div>
        );
      case "date":
        return (
          <div className="grid gap-3 col-span-6 my-2">
            <Label>{module_field.title}</Label>
            <DatePicker placeholder={module_field.placeholder} onValueChange={(value) => handleChange(module_field.name, value!.toString())} disabled={disabled}></DatePicker>
          </div>
        );
      case "number":
        return (
          <div className="grid gap-3 col-span-6 my-2">
            <Label>{module_field.title}</Label>
            <Input placeholder={module_field.placeholder} value={formData[module_field.name]} type="number" className="col-span-3" onChange={(e) => handleChange(module_field.name, e.target.value)} disabled={disabled} />
          </div>
        );
      case "dropzone_media_single":
        return (
          <div className="grid gap-3 col-span-6 my-2">
            <Label>{module_field.title}</Label>
            <Dropzone upload={true} uploadTo="crm" allowedFormats={["image/jpeg", "image/png", "image/webp"]} type="single" onFilesAdded={async (id) => handleFileUpload(module_field.name, id.toString())} initialFiles={[]} onFileRemoved={async () => console.log()} onFileSortUpdated={()=>{}} />
          </div>
        );
      case "dropzone_media_multiple":
        return (
          <div className="grid gap-3 col-span-6 my-2">
            <Label>{module_field.title}</Label>
            <Dropzone upload={true} uploadTo="crm" allowedFormats={["image/jpeg", "image/png", "image/webp"]} type="multiple" onFilesAdded={async (id) => handleFileUpload(module_field.name, id.toString())} initialFiles={[]} onFileRemoved={async () => console.log()}  onFileSortUpdated={()=>{}} />
          </div>
        );
      default:
        return null;
    }
  })();
}

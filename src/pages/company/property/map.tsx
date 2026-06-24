import { Dialog, DialogContent } from "@/components/ui/dialog";
import { PropertyCard } from "@/components/off_plan_map/property-card";
import { PropertyDetail } from "@/components/off_plan_map/property-detail";
import { Button } from "@/components/ui/button";
import { load } from "@2gis/mapgl";
import { useState } from "react";
import { useEffect } from "react";
import companyOffPlanRepository from "@/repositories/company/companyOffPlanRepository";
import { MapComponent } from "@/components/off_plan_map/map-component";
import PropertyLayout from "@/layouts/PropertyLayout";
import companyPropertyRepository from "@/repositories/company/companyPropertyRepository";
// import { Label } from "@/components/ui/label";

export default function CompanyOffPlanMap() {
 
  const [selectedProperty, setSelectedProperty] = useState(null);
  // const [isMobile, setIsMobile] = useState(false);
  // const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [isLoading,] = useState(true);
  const [properties, ] = useState<any>();
  const [emirates, setEmirates] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [centerMap, setCenterMap] = useState<number[]>([55.1885387, 25.0742823]);
  const [isPropertyDetailsDialogOpen, setIsPropertyDetailsDialogOpen] = useState(false);

  // const [filteredProperties, setFilteredProperties] = useState(properties);
  // const [mapViewProperties, setMapViewProperties] = useState(properties);

  useEffect(() => {
    const checkIfMobile = () => {
      // setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  useEffect(() => {
    fetchDistricts();
    fetchEmirates();
    fetchProperties(centerMap);
  }, []);

  const fetchProperties = async (center: any) => {
    console.log(center);
    // const response = await companyOffPlanRepository.getProjects(center);
    // if (response.success) {
    //   setProperties(response.data);
    //   setIsLoading(false);
    // }
  };

  const fetchEmirates = async () => {
    console.log("Fetching Emirates...");

    const response = await companyPropertyRepository.getEmirates('full');

    if (response.success) {
      setEmirates(response.data.data);
      // setEmirates([]);
      // console.log("Fetched Emirates Data:", response.data);
      // response.data.data.map((emirate: any) => {
      //   const emirateObj = {
      //     id: emirate.id,
      //     color: emirate.color,
      //   };
      // });
    }
  };

  const fetchDistricts = async () => {
    console.log("fetching districts in");

    const response = await companyPropertyRepository.getDistricts(999,'',null,'full');

    if (response.success) {
      setDistricts(response.data.data);
      // clearPolygons();
      // setDistricts([]);
      // console.log("Fetched Districts Data:", response.data);
      // response.data.data.map((district: any) => {
      //   const districtObj = {
      //     id: district.id,
      //     color: district.color,
      //   };
      // });
    }
  };

  const fetchProperty = async (property: string) => {
    const response = await companyOffPlanRepository.getProject(property);
    if (response.success) {
      setSelectedProperty(response.data);
    }

    setIsPropertyDetailsDialogOpen(true);
  };

  const handlePropertyClick = async (property: any) => {
    
    fetchProperty(property);
  };
 
  const handleMapMoveEnd = (mapData: any) => {
    fetchProperties(mapData);
    console.log("Map moved to:", mapData);

    // Simulate a network request
    setTimeout(() => {
      // For demo purposes, we'll just use the filtered properties
      // In a real app, you would fetch properties based on the map bounds
      // setMapViewProperties(filteredProperties);
    }, 500);
  };

  // Apply filters to properties
 
  // Show drawer on mobile when properties are available
  // useEffect(() => {
  //   if (isMobile && filteredProperties.length > 0 && mapLoaded) {
  //     setIsDrawerOpen(true);
  //   }
  // }, [isMobile, filteredProperties, mapLoaded]);

  useEffect(() => {
    if (!isLoading) {
      let map: any;
      load().then((mapglAPI) => {
        map = new mapglAPI.Map("map-container", {
          center: [55.296249, 25.276987],
          zoom: 17,
          pitch: 45,
          key: "b3426ecc-6ecd-4fad-98ac-f2926ead41a6",
          style: "18d586c4-4c36-4455-a60f-a4366f1fb17f",
        });
      });

      return () => map && map.destroy();
    }
  }, [isLoading]);

  return (
    <>
      <PropertyLayout>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-5">
            {!isLoading ? (
              <div className="h-[400px] rounded-lg overflow-hidden">
                 <MapComponent
                  emirates={emirates}
                  districts={districts}
                  points={properties.points}
                  onMapLoaded={(center) => {
                    setCenterMap(center);
                  }}
                  onMarkerClick={handlePropertyClick}
                  onMapMoveEnd={handleMapMoveEnd}
                />
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="col-span-7">
            <div className="overflow-y-auto grid grid-cols-12 gap-2 h-[400px]">
              {!isLoading ? (
                properties.properties.data.length > 0 ? (
                  properties.properties.data.map((property: { property_reference_id: string }, key: number) => (
                    <div key={key} className="col-span-6">
                      <PropertyCard carouselEnabled={false} key={key} property={property} imgSrckey="upload.url"  />
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-lg font-medium">No properties match your filters</p>
                    <p className="text-muted-foreground">Try adjusting your search criteria</p>
                    <Button variant="outline" className="mt-4">
                      Clear All Filters
                    </Button>
                  </div>
                )
              ) : (
                <>properties loading</>
              )}
            </div>
          </div>
        </div>
        <Dialog open={isPropertyDetailsDialogOpen} onOpenChange={setIsPropertyDetailsDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden flex flex-col">
            <PropertyDetail property={selectedProperty}></PropertyDetail>
          </DialogContent>
        </Dialog>
      </PropertyLayout>
    </>
  );

  //   return (
  //     <div style={{ width: "100%", height: "100%" }}>
  //       <MapWrapper />
  //     </div>
  //   );
}

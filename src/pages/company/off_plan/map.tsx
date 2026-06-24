// import { ActiveFilters } from "@/components/off_plan_map/active-filters";
import { PropertyCard } from "@/components/off_plan_map/property-card";
import { PropertyDetail } from "@/components/off_plan_map/property-detail";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Key, useState } from "react";
import { useEffect } from "react";
import companyOffPlanRepository from "@/repositories/company/companyOffPlanRepository";
import { MapComponent } from "@/components/off_plan_map/map-component";
import companyPropertyRepository from "@/repositories/company/companyPropertyRepository";
import { Skeleton } from "@/components/ui/skeleton";
import { usePropertyState } from "@/providers/propertyContext";
import PropertyLayout from "@/layouts/PropertyLayout";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { debounce, sleep } from "@/lib/utils";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ChevronLeft } from "lucide-react";


export default function CompanyOffPlanMap() {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [properties, setProperties] = useState<any>();
  const [isPropertyDetailsDialogOpen, setIsPropertyDetailsDialogOpen] = useState(false);
  const [emirates, setEmirates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const { filters, resetFilters, setFilters } = usePropertyState();
  const [page, setPage] = useState(1);
  let navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isInitalLoading, setIsInitalLoading] = useState(true);

  const fetchEmirates = async function () {
    const response = await companyPropertyRepository.getEmirates("full");
    setEmirates(response.data.data);
    return {
      data: response.success ? response.data.data.map((item: any) => ({ id: item.id, label: item.name, value: item.id.toString(), center: item.center.coordinates })) : [],
      lastPage: response.success ? response.data.last_page : 1,
    };
  };

  const fetchDistricts = async function (page: number, query: string) {
    const response = await companyPropertyRepository.getDistricts(page, query, filters.emirate_id, "full", 5000);
    setDistricts(response.data.data);
  };

  const onPageChange = (id: number) => {
    setPage(id);
  };

  useEffect(() => {
    fetchDistricts(1, "");
    fetchEmirates();

    const checkIfMobile = () => {
      // setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);


    return () => {
      window.removeEventListener("resize", checkIfMobile);
    }
  }, []);

  const debouncedFetch = debounce(() => {
    fetchProperties('filter updated')
  }, 400)


  const getFiltersForTrigger = (f: any) => {
    const { orderBy, ...rest } = f;
    return JSON.stringify(rest);
  };
  useEffect(() => {
    setPage(1);
    debouncedFetch();
  }, [getFiltersForTrigger(filters)]);

  useEffect(() => {
    if (!isInitalLoading) {
      debouncedFetch();
    }
  }, [filters.orderBy])


  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    // searchParams.set("page", page);
    const updatedUrl = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.pushState({}, "", updatedUrl);
    console.log(page)
    if (!isLoading) {
      fetchProperties('page changed');
    }
  }, [page]);

  useEffect(() => {

    const projectIdParam = searchParams.get("project_id");
    if (projectIdParam) {
      const property = {
        reference_id: projectIdParam
      }
      handlePropertyClick(property)
    }

  }, [])

  const fetchProperties = async (source: string) => {
    console.log('property fetching source is', source)
    const response = await companyOffPlanRepository.getProjects(page, filters, 'map')
    if (response.success) {
      setProperties(response.data);
      setIsLoading(false);
      const container = document.getElementById("props_list");
      if (container) {
        container.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    }

    if (isInitalLoading) {
      setFilters((prev) => ({
        ...prev,
        ['orderBy']: 'location'
      }));
    }
    //sleep before 
    await sleep(500)
    setIsInitalLoading(false);
  };

  const fetchProperty = async (property: string) => {
    const response = await companyOffPlanRepository.getProject(property);
    if (response.success) {
      setSelectedProperty(response.data);
    }

    setIsPropertyDetailsDialogOpen(true);
  };

  const handlePropertyClick = async (property: any) => {
    fetchProperty(property.reference_id);
  };

  const handleMapFilterChange = (center: number[], bounds: any, zoom: any) => {
    setFilters((prev: any) => ({
      ...prev,
      ['centerMap']: center,
      ['boundsMap']: bounds,
      ['zoomMap']: zoom,
    }));
  };

  // const handleRemoveFilter = (filterType: any, defaultValue: any) => {
  //   console.log(filterType, defaultValue);
  // };

  const handleClearAllFilters = () => {
    resetFilters();
  };

  return (
    <>
      <div className="mb-2">
        <Button className="h-7 w-7" variant={'outline'} onClick={() => navigate(-1)} disabled={window.history.length == 0}><ChevronLeft /></Button>
      </div>
      <PropertyLayout>
        <main className=" flex flex-col">
          <div className="h-full w-full">
            {isLoading ? (
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-5">
                  <Skeleton className="h-full w-full text-gray-400" />
                </div>
                <div className="col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <div key={item} className="border rounded-lg overflow-hidden bg-white">
                      <Skeleton className="w-full h-[150px]" />
                      <div className="p-4 space-y-3">
                        <div className="flex items-center">
                          <Skeleton className="h-6 w-16" />
                        </div>
                        <div className="flex items-center space-x-2">
                          <Skeleton className="h-4 w-8" />
                          <div className="text-gray-400">|</div>
                          <Skeleton className="h-4 w-8" />
                          <div className="text-gray-400">|</div>
                          <Skeleton className="h-4 w-24" />
                        </div>
                        <div className="flex items-center space-x-1">
                          <Skeleton className="h-4 w-4" />
                          <Skeleton className="h-4 w-4" />
                          <Skeleton className="h-4 w-16" />
                        </div>
                        <div>
                          <Skeleton className="h-4 w-24" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-5">
                  <div className="h-[400px] rounded-lg overflow-hidden">
                    {/* <ActiveFilters filters={filters} onRemove={handleRemoveFilter} onClearAll={handleClearAllFilters} /> */}
                    <MapComponent
                      emirates={emirates}
                      districts={districts}
                      points={properties.points}
                      onMapLoaded={() => console.log('map loaded')}
                      onMapMoveEnd={(center, bounds, zoom) => {
                        handleMapFilterChange(center, bounds, zoom);
                      }}
                      onMarkerClick={handlePropertyClick}
                    />
                  </div>
                </div>
                <div className="col-span-7">
                  <div id="props_list" className="overflow-y-auto grid grid-cols-12 gap-2 h-[400px]">
                    {!isLoading ? (
                      properties.properties.data.length > 0 ? (
                        properties.properties.data.map((property: { property_reference_id: string }, key: number) => (
                          <div key={key} className="col-span-6">
                            <PropertyCard carouselEnabled={false} key={key} property={property} imgSrckey="upload.url" onPropertyClick={() => handlePropertyClick(property)} />
                          </div>
                        ))
                      ) : (
                        <div className=" text-center py-8 col-span-12">
                          <p className="text-lg font-medium">No properties match your filters</p>
                          <p className="text-muted-foreground">Try adjusting your search criteria</p>
                          <Button variant="outline" className="mt-4" onClick={handleClearAllFilters}>
                            Clear All Filters
                          </Button>
                        </div>
                      )
                    ) : (
                      <>properties loading</>
                    )}
                  </div>
                  {
                    <Pagination className="my-2 justify-start">
                      <PaginationContent className="flex flex-wrap justify-center gap-2">
                        {!isLoading && properties ? (
                          properties.properties.meta.links.map((link: { url: null; label: string | undefined; active: boolean | undefined }, index: Key) => {
                            if (link.url === null && link.label === "...") {
                              return (
                                <PaginationItem key={index}>
                                  <PaginationEllipsis />
                                </PaginationItem>
                              );
                            }

                            if (link.label === "&laquo; Previous") {
                              return (
                                <PaginationItem key={index}>
                                  <PaginationPrevious
                                    href={link.url || "#"}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      const previousPage = page - 1;
                                      if (link.url) onPageChange(previousPage);
                                    }}
                                  />
                                </PaginationItem>
                              );
                            }

                            if (link.label === "Next &raquo;") {
                              return (
                                <PaginationItem key={index}>
                                  <PaginationNext
                                    href={link.url || "#"}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      const nextPage = page + 1;
                                      if (link.url) onPageChange(nextPage);
                                    }}
                                  />
                                </PaginationItem>
                              );
                            }
                            return (
                              <PaginationItem key={index}>
                                <PaginationLink
                                  href={link.url || "#"}
                                  isActive={link.active}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    if (link.url) onPageChange(parseInt(link.label as string, 10));
                                  }}
                                >
                                  {link.label}
                                </PaginationLink>
                              </PaginationItem>
                            );
                          })
                        ) : (
                          <></>
                        )}
                      </PaginationContent>
                    </Pagination>
                  }
                </div>
              </div>
            )}
          </div>
        </main>
      </PropertyLayout>
      <Dialog open={isPropertyDetailsDialogOpen} onOpenChange={setIsPropertyDetailsDialogOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] p-0 overflow-hidden flex flex-col">
          <PropertyDetail property={selectedProperty}></PropertyDetail>
        </DialogContent>
      </Dialog>
    </>
  );

  //   return (
  //     <div style={{ width: "100%", height: "100%" }}>
  //       <MapWrapper />
  //     </div>
  //   );
}

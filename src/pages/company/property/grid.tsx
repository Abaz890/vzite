import { PropertyCard } from "@/components/off_plan_map/property-card";
import { PropertyDetail } from "@/components/off_plan_map/property-detail";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Key, useState } from "react";
import { useEffect } from "react";
// import companyOffPlanRepository from "@/repositories/company/companyOffPlanRepository";
import PropertyLayout from "@/layouts/PropertyLayout";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import companyPropertyRepository from "@/repositories/company/companyPropertyRepository";
import { Skeleton } from "@/components/ui/skeleton";
import { usePropertyState } from "@/providers/propertyContext";
import { debounce } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { useGlobalState } from "@/providers/globalContext";


export default function CompanyPropertyGrid() {
  const { filters, } = usePropertyState();
  let navigate = useNavigate();
  const { globalStateLoading, echo, agent } = useGlobalState();

  // const [isMobile, setIsMobile] = useState(false);
  // const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedProperty] = useState(null);

  const [loading, setLoading] = useState(true);
  const [isInitalLoading, setInitalLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [properties, setProperties] = useState<any>();
  const [isPropertyDetailsDialogOpen, setIsPropertyDetailsDialogOpen] = useState(false);

  useEffect(() => {
    fetchItems();
    const checkIfMobile = () => {
      // setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);


  useEffect(() => {
    if (!globalStateLoading && agent.value) {
      echo.private(`user.${agent.value.id}`).listen(".PropertySyncCompleted", () => {
        fetchItems();
      })
      return () => {
        echo.private(`user.${agent.value.id}`).stopListening(".PropertySyncCompleted");
      }
    }

  }, [globalStateLoading])



  const fetchItems = async () => {
    setLoading(true);
    await fetchProperties();
    setLoading(false);

    setInitalLoading(false);
  };

  const fetchProperties = async (center = []) => {
    console.log(center);
    const response = await companyPropertyRepository.getProperties(page, filters);
    if (response.success) {
      setProperties(response.data);
    }
  };

  const onPageChange = (id: number) => {
    setPage(id);
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("page", id.toString());
    const updatedUrl = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.pushState({}, "", updatedUrl);
    fetchItems();
  };

  useEffect(() => {
    const debouncedFetch = debounce(() => {
      fetchProperties()
    }, 400)
    debouncedFetch()
  }, [filters]);


  return (
    <>
      <div className="mb-2">
        <Button className="h-7 w-7" variant={'outline'} onClick={() => navigate(-1)} disabled={window.history.length == 0}><ChevronLeft /></Button>
      </div>
      <PropertyLayout>
        <div className="">
          {!isInitalLoading ? (
            properties.data.length > 0 ? (
              <>
                <div className="grid grid-cols-12 gap-2">
                  {properties.data.map((property: { property_reference_id: string; media: [] }, key: number) => (
                    <div key={key} className="col-span-4">
                      <PropertyCard carouselEnabled={false} key={key} property={property} imgSrckey="url" />
                    </div>
                  ))}
                </div>
                <Pagination className="my-2 justify-start">
                  <PaginationContent className="flex flex-wrap justify-center gap-2">
                    {!loading && properties ? (
                      properties!.meta.links.map((link: { url: null; label: string | undefined; active: boolean | undefined }, index: Key | null | undefined) => {
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
              </>
            ) : (
              <div className="col-span-12 text-center py-8">
                <p className="text-lg font-medium">No properties found</p>
                {/* <p className="text-muted-foreground">Try adjusting your search criteria</p>
                <Button variant="outline" className="mt-4">
                  Clear All Filters
                </Button> */}
              </div>
            )
          ) : (
            <>
              <div className="col-span-12 grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="border rounded-lg overflow-hidden bg-white">
                    <Skeleton className="w-full h-[200px]" />
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

              <div className="col-span-12 flex items-start justify-start mt-6 space-x-2">
                <Skeleton className="w-8 h-8 rounded-md" />

                {Array.from({ length: 4 }).map((_, index) => (
                  <Skeleton key={index} className={`w-8 h-8 rounded-md ${index === 0 ? "bg-primary/20" : ""}`} />
                ))}
                <Skeleton className="w-8 h-8 rounded-md" />
              </div>
            </>
          )}
        </div>
      </PropertyLayout>
      <Dialog open={isPropertyDetailsDialogOpen} onOpenChange={setIsPropertyDetailsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden flex flex-col">
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

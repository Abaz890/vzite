import { PropertyDetail } from "@/components/off_plan_map/property-detail";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { load } from "@2gis/mapgl";
import { Key, useState } from "react";
import { useEffect } from "react";
// import companyOffPlanRepository from "@/repositories/company/companyOffPlanRepository";
import PropertyLayout from "@/layouts/PropertyLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, MoreHorizontal, PlusCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import companyPropertyRepository from "@/repositories/company/companyPropertyRepository";
// import { Label } from "@/components/ui/label";

export default function CompanyPropertyList(filters : any) {
   
  const [selectedProperty,] = useState(null);
  // const [isMobile, setIsMobile] = useState(false);
  // const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [properties, setProperties] = useState<any>();
  const [isPropertyDetailsDialogOpen, setIsPropertyDetailsDialogOpen] = useState(false);
  const [isInitalLoading, setInitalLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [, setError] = useState<string>("");
  const [page, setPage] = useState(1); 

  useEffect(() => {
    const checkIfMobile = () => {
      // setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };
    console.log(filters)

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);

  }, []);

  useEffect(() => { 
    fetchProperties();
  }, []);

  const fetchProperties = async (center=[]) => {
    console.log(center);
    const response = await companyPropertyRepository.getProperties(page,'s');
    if (response.success) {
      setProperties(response.data);
      setIsLoading(false);
    }
  };
 
  // const fetchProperty = async (property: number) => {
  //   const response = await companyOffPlanRepository.getProject(property);
  //   if (response.success) {
  //     setSelectedProperty(response.data);
  //   }

  //   setIsPropertyDetailsDialogOpen(true);
  // };


    const fetchItems = async () => {
      try {
        setLoading(true)
        //get module items
        const response: any = await companyPropertyRepository.getProperties(page,'xx');
        if (response.success) { 
          setProperties(response.data);
        }
        setLoading(false)
      } catch (err) {
        setError("unable to load ");
      }
      setInitalLoading(false);
    };
  


  const onPageChange = (id: number) => {
    setPage(id);
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("page", id.toString());
    const updatedUrl = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.pushState({}, "", updatedUrl);
    fetchItems();
  };


  const handleDeleteItemClicked = async (id : number) => {
    console.log('xx',id);
  }

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
        
      <Card>
        <CardHeader>
          <CardTitle>Properties</CardTitle>
          <CardDescription>
            Manage your Properties and view their sales performance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="hidden md:block ">
            {!isInitalLoading && properties! && properties!.data.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>
                      <span>Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {properties!.data.map((property: any, key: Key | null | undefined) => (
                    <TableRow key={key}>
                      <TableCell className="font-medium">{property.name}</TableCell>
                      <TableCell className="font-medium"></TableCell>
                      <TableCell className="font-medium"></TableCell>
                      <TableCell className="font-medium">
                        <div className="">{key !== 0 ? <Switch /> : <></>}</div>
                      </TableCell>
                      <TableCell>
                        {key !== 0 ? (
                          <DropdownMenu modal={false}>
                            <DropdownMenuTrigger asChild>
                              <Button aria-haspopup="true" size="icon" variant="ghost">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDeleteItemClicked(property.id)}>Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        ) : (
                          <></>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="rounded-full bg-muted p-4">
                  <PlusCircle className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="text-lg font-medium">No items available</div>
                <div className="text-sm text-muted-foreground">Add your first item to get started.</div>
              </div>
            )}
          </div>
          <div className="block md:hidden">
            {!isInitalLoading && properties && properties!.data.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      <span>#</span>
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {properties!.data.length > 0
                    ? properties!.data.map((property: any, item_key : number) => (
                        <Collapsible key={item_key} asChild>
                          <>
                            <TableRow key={item_key}>
                              <TableCell>
                                <CollapsibleTrigger asChild>
                                  <ChevronDown />
                                </CollapsibleTrigger>
                              </TableCell>
                              <TableCell>name</TableCell>
                              <TableCell>
                                <Badge variant="outline">Active</Badge>
                              </TableCell>
                              <TableCell>
                                <DropdownMenu modal={false}>
                                  <DropdownMenuTrigger asChild>
                                    <Button aria-haspopup="true" size="icon" variant="ghost">
                                      <MoreHorizontal className="h-4 w-4" />
                                      <span className="sr-only">Toggle menu</span>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuItem>Edit</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleDeleteItemClicked(property.id)}>Delete</DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                            <CollapsibleContent asChild>
                              <div className="">
                                <p className="font-medium">
                                  <strong>name</strong> : {property.name}
                                </p>
                                <p className="font-medium">
                                  <strong>email</strong> : 
                                </p>
                                <p className="font-medium">
                                  <strong>role</strong> : 
                                </p>
                              </div>
                            </CollapsibleContent>
                          </>
                        </Collapsible>
                      ))
                    : null}
                </TableBody>
              </Table>
            ) : (
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="rounded-full bg-muted p-4">
                  <PlusCircle className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="text-lg font-medium">No items available</div>
                <div className="text-sm text-muted-foreground">Add your first item to get started.</div>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex-col items-start">
          {!loading && properties ? (
            <div className="text-xs text-muted-foreground">
              {" "}
              Showing{" "}
              <strong>
                {properties!.meta.from} - {properties!.meta.to}
              </strong>{" "}
              of <strong>{properties!.meta.total}</strong> agents{" "}
            </div>
          ) : (
            <></>
          )}
          <Pagination className="my-2 justify-start">
            <PaginationContent className="flex flex-wrap justify-center gap-2">
              {!loading && properties ? (
                properties!.meta.links.map((link : any , index : any) => {
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
                          if (link.url) onPageChange(parseInt(link.label, 10));
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
        </CardFooter>
      </Card>



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

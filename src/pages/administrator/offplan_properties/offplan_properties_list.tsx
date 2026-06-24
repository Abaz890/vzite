import { PropertyDetail } from "@/components/off_plan_map/property-detail";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Key, useRef, useState } from "react";
import { useEffect } from "react";
import PropertyLayout from "@/layouts/PropertyLayout";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { usePropertyState } from "@/providers/propertyContext";
import AuthenticatedLayoutAdmin from "@/layouts/AuthenticatedLayoutAdmin";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import companyOffPlanRepository from "@/repositories/company/companyOffPlanRepository";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { SkeletonTable } from "@/components/skeletonTable";
import PropertyTab from "@/components/propertyTab";
import adminOffPlanPropertyRepository from "@/repositories/admin/adminOffPlanPropertyRepository";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import LazyImage from "@/components/ui/lazyImage";
import { Badge } from "@/components/ui/badge"
import { DeleteConfirmationModal, DeleteConfirmationModalRef } from "@/components/deleteConfirmationDialog";
import { debounce } from "@/lib/utils";
import companyPropertyRepository from "@/repositories/company/companyPropertyRepository";

export default function AdministratorOffplanPropertyList() {
  const { filters } = usePropertyState();
  let navigate = useNavigate();

  const deleteModalRef = useRef<DeleteConfirmationModalRef>(null)
  const [selectedProperty] = useState(null);
  const [loading, setIsLoading] = useState(true);
  const [isInitalLoading, setInitalLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [properties, setProperties] = useState<any>();
  const [isPropertyDetailsDialogOpen, setIsPropertyDetailsDialogOpen] = useState(false);
  const { toast } = useToast();

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
    if (!isInitalLoading) {
      fetchItems();
    }
  }, [page])


  const fetchItems = async () => {
    setIsLoading(true);
    await fetchProperties();
    setIsLoading(false);

    setInitalLoading(false);
  };

  const fetchProperties = async () => {
    filters.source = 'admin';
    if (isInitalLoading) {
      filters.orderBy = 'created_at'
    }
    const response = await companyOffPlanRepository.getProjects(page, filters, 'list');
    if (response.success) {
      setProperties(response.data.properties);
      setIsLoading(false);
      const container = document.getElementById("props_list");
      if (container) {
        container.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    }
  };

  const onPageChange = (id: number) => {
    setPage(id);
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("page", id.toString());
    const updatedUrl = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.pushState({}, "", updatedUrl);
  };

  const handleAddProperty = async () => {
    const data = {
      type: "offplan",
      state: "draft",
      default_pricing: "month"
    };

    //get property from url
    const response = await companyPropertyRepository.saveProperty(data);
    if (response.success) {
      navigate(`/administrator/offplan_properties/${response.data.reference_id}`);
    }
  };

  const handleUpdatPropertyStatus = async (id: string) => {

    const response = await adminOffPlanPropertyRepository.updatePropertyStatus(id);
    if (response.success) {

      setProperties((prev: any) => ({
        ...prev,
        data: prev.data.map((property: any) =>
          property.reference_id === id
            ? { ...property, status: property.status === 1 ? 0 : 1 }
            : property
        ),
      }));

      toast({
        variant: "default",
        duration: 800,
        className: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
        title: `property status successfully updated`,
        action: <ToastAction altText="close">close</ToastAction>,
      });
    } else {
      toast({
        variant: "destructive",
        duration: 2000,
        className: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
        title: response.message,
        action: <ToastAction altText="close">close</ToastAction>,
      });
    }

  };

  const handleDeleteItem = async (id: any) => {

    const response = await adminOffPlanPropertyRepository.deleteProperty(id);
    if (response.success) {
      if (page > 1) {
        setPage(1);
      }
      else {
        fetchItems();
      }
      toast({
        variant: "default",
        duration: 800,
        className: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
        title: `property successfully deleted`,
        action: <ToastAction altText="close">close</ToastAction>,
      });
    } else {
      toast({
        variant: "destructive",
        duration: 2000,
        className: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
        title: response.message,
        action: <ToastAction altText="close">close</ToastAction>,
      });
    }

  }

  useEffect(() => {

    const debouncedFetch = debounce(() => {
      if (!isInitalLoading) {
        fetchProperties()
      }
    }, 400)

    setPage(1);
    debouncedFetch()

    //   fetchProperties();

  }, [filters]);

  return (
    <>

      <AuthenticatedLayoutAdmin
        header={
          <h2 className="text-xl font-semibold leading-tight text-gray-800">
            Offplan property edit
          </h2>
        }
      >
        <div className="flex  items-center justify-between mb-4">
          <PropertyTab dashboard="administrator" property_type="offplan_properties" ></PropertyTab>
          <div className="">
            {/* handleAddProperty() */}
            <Button onClick={() => handleAddProperty()}>Upload Property</Button>
          </div>
        </div>
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
                {
                  !isInitalLoading ?
                    properties && properties!.data.length > 0 ?
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>#</TableHead>
                            <TableHead>Ref</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Emirate</TableHead>
                            <TableHead>District</TableHead>
                            <TableHead>Units</TableHead>
                            <TableHead>State</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Created At</TableHead>
                            <TableHead>
                              <span>Actions</span>
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {properties!.data.map((property: any, key: Key) => (
                            <TableRow key={key}>
                              <TableCell> {property.media.length > 0 ?
                                <LazyImage src={property.media[0].upload.url} alt={``} width={80} className={` aspect-[16/9] rounded-t-lg`} /> : <img src="" alt="" />} </TableCell>
                              <TableCell className="font-medium">{property.reference_id}</TableCell>
                              <TableCell className="font-medium">{property.title ? property.title : '-'}</TableCell>
                              <TableCell className="font-medium">{property.emirate ? property.emirate.name : '-'}</TableCell>
                              <TableCell className="font-medium">{property.district ? property.district.name : '-'}</TableCell>
                              <TableCell className="font-medium">
                                <Badge variant="outline">{property.units_count} Units</Badge>
                              </TableCell>
                              <TableCell className="font-medium">
                                <Badge variant="outline">{property.state}</Badge>
                              </TableCell>
                              <TableCell className="font-medium">
                                <div className=""><Switch checked={property.status > 0} onCheckedChange={() => handleUpdatPropertyStatus(property.reference_id)} /> </div>
                              </TableCell>
                              <TableCell className="font-medium">
                                {  new Date(property.created_at).toISOString().split("T")[0]}
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
                                    <DropdownMenuItem onClick={() => navigate(`/administrator/offplan_properties/${property.reference_id}`)}  >Edit</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => deleteModalRef.current?.toggleModal(property.reference_id)}>Delete</DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                      :
                      <div className="flex flex-col items-center justify-center space-y-4">
                        <div className="rounded-full bg-muted p-4">
                          <PlusCircle className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <div className="text-lg font-medium">No items available</div>
                        <div className="text-sm text-muted-foreground">Add your first item to get started.</div>
                      </div>
                    :
                    <div className=" flex flex-col">
                      <SkeletonTable></SkeletonTable>
                    </div>
                }
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
                    properties!.meta.links.map((link: any, index: any) => {
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


        </PropertyLayout >
        <Dialog open={isPropertyDetailsDialogOpen} onOpenChange={setIsPropertyDetailsDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden flex flex-col">
            <PropertyDetail property={selectedProperty}></PropertyDetail>
          </DialogContent>
        </Dialog>

        <DeleteConfirmationModal ref={deleteModalRef} onSubmit={(itemId) => handleDeleteItem(itemId)} />

      </AuthenticatedLayoutAdmin >

    </>
  );

  //   return (
  //     <div style={{ width: "100%", height: "100%" }}>
  //       <MapWrapper />
  //     </div>
  //   );
}

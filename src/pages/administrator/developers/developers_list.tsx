import { Key, useState } from "react";
import { useEffect } from "react";
import AuthenticatedLayoutAdmin from "@/layouts/AuthenticatedLayoutAdmin";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, ExternalLink, PlusCircle, Search, X } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { SkeletonTable } from "@/components/skeletonTable";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import adminDeveloperRepository from "@/repositories/admin/adminDeveloperRepository";
import { Button } from "@/components/ui/button";
import WhatsappIcon from "@/components/WhatsappIcon";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SelectDynamic } from "@/components/ui/selectDynamic";
import companyOffPlanRepository from "@/repositories/company/companyOffPlanRepository";
import { PropertyFilterType } from "@/providers/propertyContext";
import { debounce } from "@/lib/utils";

export default function AdministratorDevelopersList() {

  const [loading, setIsLoading] = useState(true);
  const [isInitalLoading, setInitalLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [developers, setDevelopers] = useState<any>();
  const [selectedProperty, setSelectedProperty] = useState({ name: "", property_id: "" })
  const [phoneNumber, setPhoneNumber] = useState("")
  const [contactName, setContactName] = useState("")
  const [whatsappUrl, setWhatsappUrl] = useState("")
  const [searchInput, setSearchInput] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isCopied, setIsCopied] = useState(false)


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
    fetchItems();
  }, [page])


  const fetchItems = async () => {
    setIsLoading(true);
    await fetchDevelopers();
    setIsLoading(false);

    setInitalLoading(false);
  };

  const fetchDevelopers = async () => {
    const filters = {
      source: 'admin',
      name: searchInput
    }
    const response = await adminDeveloperRepository.getDevelopers(page, filters);
    console.log(response.data)
    if (response.success) {
      setDevelopers(response.data);
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

  const handleUpdatDeveloperStatus = async (id: string) => {

    const response = await adminDeveloperRepository.updateDeveloperStatus(id);
    if (response.success) {

      setDevelopers((prev: any) => ({
        ...prev,
        data: prev.data.map((developer: any) =>
          developer.permalink === id
            ? { ...developer, status: developer.status === 1 ? 0 : 1 }
            : developer
        ),
      }));

      toast({
        variant: "default",
        duration: 800,
        className: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
        title: `developer status successfully updated`,
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


  const handlePropertyChange = async (value: string) => {
    const response = await companyOffPlanRepository.getProject(value);
    if (response.success) {
      setSelectedProperty({ name: response.data.title, property_id: value })
    }
  }

  const handlePhoneChange = (value: string) => {
    setPhoneNumber(value)
  }


  const handlePropertyNameChange = (value: string) => {
    setSelectedProperty((prev) => ({ name: value, property_id: prev.property_id }))
  }

  const handleContactNameChange = (value: string) => {
    setContactName(value)
  }

  const copyToClipboard = async () => {
    if (whatsappUrl) {
      try {
        await navigator.clipboard.writeText(whatsappUrl)
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 2000)
        toast({
          title: "Copied!",
          description: "WhatsApp link copied to clipboard",
        })
      } catch (err) {
        toast({
          title: "Error",
          description: "Failed to copy to clipboard",
          variant: "destructive",
        })
      }
    }
  }

  const openInNewTab = () => {
    if (whatsappUrl) {
      window.open(whatsappUrl, "_blank")
    }
  }


  const handleSendProjectInquiryClick = (developer: (typeof developers)[0]) => {
    setSelectedProperty({ name: '', property_id: '' })
    setPhoneNumber(developer.contact_phone)
    setContactName(developer.contact_name)
    setWhatsappUrl("")
    setIsDialogOpen(true)
  }


  const generateWhatsAppUrl = () => {
    const message = `Hi ${contactName ? contactName : "there"}, I'm interested in  ${selectedProperty.name}. Could you please provide me with the brochures and payment plan details? Thank you!`
    const encodedMessage = encodeURIComponent(message)

    const generatedWhatsAppUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, "")}?text=${encodedMessage}`
    setWhatsappUrl(generatedWhatsAppUrl);
  }

  const fetchProperties = async (page: number, query: string, _: any) => {

    const filter = { name: query, orderBy: 'name', centerMap: [0, 0], boundsMap: { southWest: [0, 0], northEast: [0, 0] }, zoomMap: 10 } as PropertyFilterType
    const response = await companyOffPlanRepository.getProjects(page, filter, 'list');
    return {
      data: response.success ? response.data.properties.data.map((item: any) => ({ id: item.id, label: item.title, value: item.reference_id, thumbnail: item.media.length > 0 ? item.media[0].upload.url : '' })) : [],
      lastPage: response.success ? response.data.properties.meta.last_page : 1,
    };
  }


  useEffect(() => {
    console.log(searchInput)
    const fetchData = debounce(() => {
      fetchDevelopers()
    }, 400)
    fetchData();

    return () => {
      fetchData.cancel?.();
    };
  }, [searchInput])


  useEffect(() => {
    if (selectedProperty.name && contactName && phoneNumber) {
      generateWhatsAppUrl()
    }
  }, [selectedProperty, contactName, phoneNumber])



  return (
    <>

      <AuthenticatedLayoutAdmin
        header={
          <h2 className="text-xl font-semibold leading-tight text-gray-800">
            developer edit
          </h2>
        }
      >
        <div className="flex flex-col mb-4">
          <div className="flex  items-cente justify-between mb-4">
            <div className="">Developers</div>
            <div className="flex gap-2">
            </div>
          </div>
          <div className="relative  mb-4">
            <div className="flex items-center border rounded-md overflow-hidden bg-white">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  className="border-0 pl-10 h-12"
                  placeholder="Enter an address, neighborhood, city, or ZIP code"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)} />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <X className="h-4 w-4 text-muted-foreground" onClick={() => { setSearchInput('') }} />
                </button>
              </div>
              <Button className="rounded-none h-12 px-6">Search</Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Developers</CardTitle>
              <CardDescription>
                Manage your Developers and view their sales performance.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="hidden md:block ">

                {
                  !isInitalLoading ?
                    developers && developers!.data.length > 0 ?
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>#</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Contact Details</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {developers!.data.map((developer: any, key: Key) => (
                            <TableRow key={key}>
                              <TableCell>
                                #
                              </TableCell>
                              <TableCell className="font-medium">{developer.name}</TableCell>
                              <TableCell className="">
                                <div className="">
                                  {developer.contact_name ?? '-'}
                                </div>
                                <div className="">
                                  {developer.contact_phone ?? '-'}
                                </div>

                              </TableCell>
                              <TableCell className="font-medium">
                                <div className=""><Switch checked={developer.status > 0} onCheckedChange={() => handleUpdatDeveloperStatus(developer.permalink)} /> </div>
                              </TableCell>
                              <TableCell className="font-medium">
                                <Button variant={'outline'} onClick={() => handleSendProjectInquiryClick(developer)} disabled={!developer.contact_phone} > <WhatsappIcon /> Send Project Iquery </Button>
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
              {!loading && developers ? (
                <div className="text-xs text-muted-foreground">
                  Showing
                  <strong>
                    {developers!.from} - {developers!.to}
                  </strong>
                  of <strong>{developers!.total}</strong> developers
                </div>
              ) : (
                <></>
              )}

              <Pagination className="my-2 justify-start">
                <PaginationContent className="flex flex-wrap justify-center gap-2">
                  {!loading && developers ? (
                    developers!.links.map((link: any, index: any) => {
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


          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Generate WhatsApp Link</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="property">Select Property</Label>


                  <SelectDynamic
                    name="property"
                    field={{ value: selectedProperty.property_id }}
                    showThumbnail={true}
                    onChange={(value) => handlePropertyChange(value)}
                    fetchOptions={async (page, query) => await fetchProperties(page, query, 12)}
                  />

                </div>


                <div className="space-y-2">
                  <Label htmlFor="propertyName">Property Name</Label>
                  <Input
                    id="propertyName"
                    placeholder="Enter property name"
                    value={selectedProperty.name}
                    onChange={(e) => handlePropertyNameChange(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="Enter phone number"
                    value={phoneNumber}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact">Contact Name (Optional)</Label>
                  <Input
                    id="contact"
                    placeholder="Enter contact name"
                    value={contactName}
                    onChange={(e) => handleContactNameChange(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="url">WhatsApp URL (Editable)</Label>
                  <Textarea
                    id="url"
                    value={whatsappUrl}
                    onChange={(e) => setWhatsappUrl(e.target.value)}
                    rows={4}
                    className="font-mono text-sm"
                    placeholder="Generated WhatsApp URL will appear here..."
                  />
                </div>

                <div className="flex justify-between gap-2">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <div className="flex gap-2">
                    <Button
                      onClick={openInNewTab}
                      disabled={!whatsappUrl}
                      variant="outline"
                      className="flex items-center gap-2 bg-transparent"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Open
                    </Button>
                    <Button onClick={copyToClipboard} disabled={!whatsappUrl} className="flex items-center gap-2">
                      <Copy className="h-4 w-4" />
                      {isCopied ? "Copied!" : "Copy URL"}
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>


        </div>
      </AuthenticatedLayoutAdmin >

    </>
  );
}

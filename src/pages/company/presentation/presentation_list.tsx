import { useEffect, useState } from "react";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import CompanyActions from "@/components/layout/company/action";
import companyPresentationRepository from "@/repositories/company/companyPresentationRepository";
import { SkeletonTable } from '@/components/skeletonTable';
import { SkeletonAction } from '@/components/skeletonAction';
import { useGlobalState } from "@/providers/globalContext";
import { Spinner } from "@/components/ui/spinner";

export default function CompanyPresentationList() {
  interface PresentationData {
    id: number;
    name: string;
    email: string;
    phone: string;
    status?: null;
    role: string;
  }

  interface Links {
    first: string;
    last: string;
    prev?: string | null;
    next?: string | null;
  }

  interface MetaData {
    current_page: number;
    from: number;
    last_page: number;
    links: Array<{
      url?: string;
      label: string;
      active: boolean;
    }>;
    path: string;
    per_page: number;
    to: number;
    total: number;
  }

  interface PresentationsPayload {
    data: PresentationData[];
    links: Links;
    meta: MetaData;
  }

  // const { toast } = useToast();
  const [presentations, setPresentations] = useState<PresentationsPayload>();
  const [isInitalLoading, setInitalLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [page, setPage] = useState(1);
  const [isDownloadLoading, setIsDownloadLoading] = useState('');
  const { globalStateLoading,agent,echo } = useGlobalState()


  const fetchItems = async () => {
    try {
      setLoading(true)
      //get module items
      const response: any = await companyPresentationRepository.getPresentationList(page);
      if (response.success) {
        console.log(response.data)
        setPresentations(response.data);
      }
      setLoading(false)
    } catch (err) {
      setError("unable to load ");
    } finally {
      setInitalLoading(false);
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

  const handleDeleteItemClicked = async function (presentation_id: string) {
    console.log(presentation_id)
    // setItemId(id);
    // setConfirmDeleteModalOpen(!confirmDeleteModalOpen);
  };

  // const handleDelete = async function () {
  //   const response = await companyPresentationRepository.deletePresentation(itemId!.toString());
  //   if (response.success) {
  //     setConfirmDeleteModalOpen(!confirmDeleteModalOpen);
  //     toast({
  //       variant: "default",
  //       duration: 800,
  //       className: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
  //       title: "presentation role successfully deleted",
  //       action: <ToastAction altText="close">close</ToastAction>,
  //     });
  //     fetchItems();
  //   }
  // };


  const handleDownloadClick = async function (presentation_id: string) {

    setIsDownloadLoading(presentation_id);
    const response = await companyPresentationRepository.generatePresentationPdf(presentation_id);
  }


  useEffect(() => {
    if (!globalStateLoading) {
      fetchItems();


      echo
        .private(`user.${agent.value.id}`)
        .listen(".PresentationGenerated", async () => {
          setIsDownloadLoading('');
        })

      // return () => {
      //   echo.private(`user.${agent.value.id}`).stopListening(".PresentationGenerated")
      // };


    }
  }, [globalStateLoading]);

  return !isInitalLoading ? (
    <div className="">
      <CompanyActions section_title="Presentations" section_name="presentation"></CompanyActions>
      <Card>
        <CardHeader>
          <CardTitle>Presentations</CardTitle>
          <CardDescription>
            Manage your Presentations and view their sales performance. {loading} {error}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="hidden md:block ">
            {!isInitalLoading && presentations! && presentations!.data.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-1/4">Name</TableHead>
                    <TableHead className="w-1/4">Layouts</TableHead>
                    <TableHead className="w-1/4 text-right">
                      <span>Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {presentations!.data.map((presentation: any, key) => (
                    <TableRow key={key}>
                      <TableCell className="font-medium w-1/4">{presentation.name}</TableCell>
                      <TableCell className="font-medium w-1/4"> <Badge variant={'outline'}>{presentation.units_count} Units</Badge></TableCell>
                      <TableCell className="font-medium flex gap-2 justify-end">
                        <Button variant={'default'} disabled={isDownloadLoading == presentation.permalink} onClick={() => handleDownloadClick(presentation.permalink)} >
                          {isDownloadLoading == presentation.permalink ? <Spinner></Spinner> : <></>}
                          Download As PDF
                        </Button>
                        <DropdownMenu modal={false}>
                          <DropdownMenuTrigger asChild>
                            <Button aria-haspopup="true" size="icon" variant="outline">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            {/* <DropdownMenuItem>Edit</DropdownMenuItem> */}
                            <DropdownMenuItem onClick={() => handleDeleteItemClicked(presentation.permalink)} >Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>

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
          {/* <div className="block md:hidden">
            {!isInitalLoading && presentations && presentations!.data.length > 0 ? (
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
                  {presentations!.data.length > 0
                    ? presentations!.data.map((presentation: any, item_key) => (
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
                                  <DropdownMenuItem onClick={() => handleDeleteItemClicked(presentation.id)}>Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                          <CollapsibleContent asChild>
                            <div className="">
                              <p className="font-medium">
                                <strong>name</strong> : {presentation.name}
                              </p>
                              <p className="font-medium">
                                <strong>email</strong> : {presentation.email}
                              </p>
                              <p className="font-medium">
                                <strong>role</strong> : {presentation.role}
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
          </div> */}
        </CardContent>
        <CardFooter className="flex-col items-start">
          {!loading && presentations ? (
            <div className="text-xs text-muted-foreground">
              {" "}
              Showing{" "}
              <strong>
                {presentations!.meta.from} - {presentations!.meta.to}
              </strong>{" "}
              of <strong>{presentations!.meta.total}</strong> presentations{" "}
            </div>
          ) : (
            <></>
          )}
          <Pagination className="my-2 justify-start">
            <PaginationContent className="flex flex-wrap justify-center gap-2">
              {!loading && presentations ? (
                presentations!.meta.links.map((link, index) => {
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
    </div>
  ) : (
    <div className=" flex flex-col">
      <SkeletonAction></SkeletonAction>
      <SkeletonTable></SkeletonTable>
    </div>
  );
}

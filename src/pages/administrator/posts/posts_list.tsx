import { Key, useRef, useState } from "react";
import { useEffect } from "react";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import AuthenticatedLayoutAdmin from "@/layouts/AuthenticatedLayoutAdmin";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, PlusCircle, RotateCw } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { SkeletonTable } from "@/components/skeletonTable";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import LazyImage from "@/components/ui/lazyImage";
import { DeleteConfirmationModal, DeleteConfirmationModalRef } from "@/components/deleteConfirmationDialog";
import adminPostRepository from "@/repositories/admin/adminPostRepository";
import { Spinner } from "@/components/ui/spinner";

export default function AdministratorPostsList() {

  let navigate = useNavigate();

  const deleteModalRef = useRef<DeleteConfirmationModalRef>(null)
  const [loading, setIsLoading] = useState(true);
  const [isInitalLoading, setInitalLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState<any>();
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
    await fetchPosts();
    setIsLoading(false);

    setInitalLoading(false);
  };

  const fetchPosts = async () => {
    const filters = {
      source: 'admin'
    }
    // filters.source = 'admin';
    const response = await adminPostRepository.getPosts(page, filters);
    console.log(response.data)
    if (response.success) {
      setPosts(response.data);
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

  const handleUpdatPostStatus = async (id: string) => {

    const response = await adminPostRepository.updatePostStatus(id);
    if (response.success) {

      setPosts((prev: any) => ({
        ...prev,
        data: prev.data.map((post: any) =>
          post.permalink === id
            ? { ...post, status: post.status === 1 ? 0 : 1 }
            : post
        ),
      }));

      toast({
        variant: "default",
        duration: 800,
        className: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
        title: `post status successfully updated`,
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

    const response = await adminPostRepository.deletePost(id);
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
        title: `Post successfully deleted`,
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


  const handlePullPosts = async () => {
    const response = await adminPostRepository.pullPosts();
    if (response.success) {
      toast({
        variant: "default",
        duration: 800,
        className: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
        title: `post pull request successfully sent`,
        action: <ToastAction altText="close">close</ToastAction>,
      });
    }
  }

  const handleRefresh = async () => {
    setInitalLoading(true);
    fetchItems();
  }



  return (
    <>

      <AuthenticatedLayoutAdmin
        header={
          <h2 className="text-xl font-semibold leading-tight text-gray-800">
            post edit
          </h2>
        }
      >
        <div className="flex flex-col mb-4">
          <div className="flex  items-cente justify-between mb-4">
            <div className="">Posts</div>
            <div className="flex gap-2">
              <Button onClick={() => handlePullPosts()} >Pull Posts</Button>
              <Button onClick={() => handleRefresh()} > {isInitalLoading ? <Spinner></Spinner> : <RotateCw className="h-3.5 w-3.5" />}</Button>

              <Button onClick={() => navigate('/administrator/posts/add')} >Add Post</Button>
            </div>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Posts</CardTitle>
              <CardDescription>
                Manage your Posts and view their sales performance.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="hidden md:block ">

                {
                  !isInitalLoading ?
                    posts && posts!.data.length > 0 ?
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>#</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>
                              <span>Actions</span>
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {posts!.data.map((post: any, key: Key) => (
                            <TableRow key={key}>
                              <TableCell> {post.media.length > 0 ?
                                <LazyImage src={post.media[0].upload.url} alt={``} width={80} className={` aspect-[16/9] rounded-t-lg`} /> : <img src="" alt="" />} </TableCell>
                              <TableCell className="font-medium">{post.title}</TableCell>
                              <TableCell className="font-medium">
                                <div className=""><Switch checked={post.status > 0} onCheckedChange={() => handleUpdatPostStatus(post.permalink)} /> </div>
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
                                    <DropdownMenuItem onClick={() => navigate(`/administrator/posts/${post.permalink}`)}  >Edit</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => deleteModalRef.current?.toggleModal(post.permalink)}>Delete</DropdownMenuItem>
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
              {!loading && posts ? (
                <div className="text-xs text-muted-foreground">
                  {" "}
                  Showing{" "}
                  <strong>
                    {posts!.meta.from} - {posts!.meta.to}
                  </strong>{" "}
                  of <strong>{posts!.meta.total}</strong> agents{" "}
                </div>
              ) : (
                <></>
              )}

              <Pagination className="my-2 justify-start">
                <PaginationContent className="flex flex-wrap justify-center gap-2">
                  {!loading && posts ? (
                    posts!.meta.links.map((link: any, index: any) => {
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

import { useGlobalState } from "@/providers/globalContext";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Card, CardContent } from "@/components/ui/card";
import { Bell, MoreVertical, StarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Key, useEffect, useState } from "react";
import companyNotificationRepository from "@/repositories/company/companyNotificationRepository";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";

export default function CompanySideSheet() {
  const { sideSheetVisible, globalStateLoading } = useGlobalState();
  const [activeTab, setAtiveTab] = useState("notifications");
  const [isActiveTabInitalLoading, setIsActiveTabInitalLoading] = useState(true);
  const [isActiveTabLoading, setIsActiveTabLoading] = useState(true);
  const [activeTabData, setActiveTabData] = useState<any>();
  const [activeTabPage, setActiveTabPag] = useState(1);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    // const day = String(date.getDate()).padStart(2, "0");

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12;

    const formattedTime = `${hours}:${minutes} ${ampm}`;
    return `${year}/${month} on ${formattedTime}`;
  };

  const fetchNotifications = async function () {
    setIsActiveTabLoading(true);
    const response = await companyNotificationRepository.getNotifications(activeTabPage);
    if (response.success) {
      const newData = response.data.data;
      console.log(response.data)
      setActiveTabData((prev: any) => {
        if (!prev || activeTabPage === 1) {
          return response.data;
        }

        return {
          ...response.data,
          data: [...prev.data, ...newData],
        };
      });

      setIsActiveTabInitalLoading(false);
    }
    setIsActiveTabLoading(false);
  };

  const handleShowMoreClick = async function () {
    setActiveTabPag((prev) => prev + 1);
  };

  useEffect(() => {
    setActiveTabPag(1);
    setIsActiveTabInitalLoading(true);
    if (sideSheetVisible.value && !globalStateLoading) {
      if (activeTab === "notifications") {
        fetchNotifications();
      }
    }
  }, [activeTab, sideSheetVisible.value, globalStateLoading]);


  useEffect(() => { 
    if (sideSheetVisible.value && !globalStateLoading) { 
      if (activeTab === "notifications") {
        console.log('active page tirggered on page')
        fetchNotifications();
      }
    }
  }, [activeTabPage]);

  



  function NavItem({ icon, label }: any) {
    return (
      <div className="py-6 flex flex-col items-center gap-1 w-full border-b">
        <div className="text-gray-500">{icon}</div>
        <span className="text-xs text-gray-500">{label}</span>
      </div>
    );
  }

  return (
    <Sheet
      open={sideSheetVisible.value}
      onOpenChange={() => {
        sideSheetVisible.toggle();
      }}
    >
      <SheetContent className="p-0 min-w-full md:min-w-[42%]">
        <Tabs defaultValue="notifications" onValueChange={(value) => setAtiveTab(value)} orientation="vertical" className="flex h-full">
          <TabsList className="w-20 border-r bg-background flex flex-col justify-start items-center h-full rounded-none space-y-0">
            <TabsTrigger value="notifications" className="py-6 flex flex-col items-center gap-1 w-full border-b rounded-none data-[state=active]:bg-white data-[state=active]:border-r-0 data-[state=active]:shadow-none">
              <div className="relative">
                <div className="bg-blue-100 rounded-md p-2">
                  <Bell className="h-5 w-5 text-blue-950" />
                </div>
                <div className="absolute -top-2 -right-2 bg-blue-950 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">51</div>
              </div>
              <span className="text-xs font-medium text-blue-950">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="others" className="py-6 flex flex-col items-center gap-1 w-full border-b rounded-none data-[state=active]:bg-white data-[state=active]:border-r-0 data-[state=active]:shadow-none" disabled={true}>
              <div className="text-gray-500">
                <StarIcon />
              </div>
              <span className="text-xs text-gray-500">Other</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="notifications" className="flex-1 p-0 m-0 border-none overflow-auto">
            <div className="flex-1">
              <div className="flex items-center justify-between p-4 border-b">
                <h1 className="text-2xl font-bold">Notifications</h1>
              </div>

              <div className="p-4">
                <div className="w-full max-w-md mx-auto space-y-4 items-center">
                  {isActiveTabInitalLoading ? (
                    Array(6)
                      .fill(null)
                      .map((_, index) => (
                        <Card key={index} className="overflow-hidden">
                          <CardContent className="p-4">
                            <div className="space-y-3">
                              <Skeleton className="h-5 w-1/3" />
                              <Skeleton className="h-4 w-1/4" />
                            </div>
                          </CardContent>
                        </Card>
                      ))
                  ) : (
                    <>
                      <div className="space-y-4">
                        {activeTabData.data.length > 0 ? (
                          activeTabData.data.map((item: any, key: Key) => (
                            <Card key={key} className="relative overflow-hidden">
                              <CardContent className="p-4">
                                <div className="space-y-1">
                                  <h3 className="font-semibold text-base">{item.message}</h3>
                                  <p className="text-sm text-muted-foreground">{formatDate(item.created_at)} </p>
                                </div>
                              </CardContent>
                            </Card>
                          ))
                        ) : (
                          <></>
                        )}
                      </div>
                      {activeTabData.meta.last_page > activeTabPage  ? (
                        <Button onClick={() => handleShowMoreClick()} variant={"default"} disabled={isActiveTabLoading}>
                            { isActiveTabLoading ?  <Spinner></Spinner> : <></> }
                          Show more
                        </Button>
                      ) : (
                        <></>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="others" className="flex-1 p-0 m-0 border-none">
            <div className="flex-1 overflow-auto">
              <div className="flex items-center justify-between p-4 border-b">
                <h1 className="text-2xl font-bold">Other</h1>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </div>

              <div className="p-4">
                <h2 className="text-xl font-semibold mb-4">Recent Reviews</h2>
                <div className="space-y-4">
                  <Card>
                    <CardContent className="p-4">
                      <p className="text-sm">No reviews yet.</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tips" className="flex-1 p-0 m-0 border-none">
            <div className="flex-1 overflow-auto">
              <div className="flex items-center justify-between p-4 border-b">
                <h1 className="text-2xl font-bold">Tips</h1>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </div>

              <div className="p-4">
                <h2 className="text-xl font-semibold mb-4">Recent Tips</h2>
                <div className="space-y-4">
                  <Card>
                    <CardContent className="p-4">
                      <p className="text-sm">No tips received yet.</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="sales" className="flex-1 p-0 m-0 border-none">
            <div className="flex-1 overflow-auto">
              <div className="flex items-center justify-between p-4 border-b">
                <h1 className="text-2xl font-bold">Online Sales</h1>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </div>

              <div className="p-4">
                <h2 className="text-xl font-semibold mb-4">Recent Sales</h2>
                <div className="space-y-4">
                  <Card>
                    <CardContent className="p-4">
                      <p className="text-sm">No online sales yet.</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="actions" className="flex-1 p-0 m-0 border-none">
            <div className="flex-1 overflow-auto">
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-4">Available Actions</h2>
                <div className="space-y-4">
                  <Card>
                    <CardContent className="p-4">
                      <p className="text-sm">No actions available.</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex h-full">
          {/* Left sidebar */}
          <div className="w-20 border-r bg-background flex flex-col items-center">
            <div className="py-6 flex flex-col items-center gap-1 border-b w-full">
              <div className="relative">
                <div className="bg-blue-100 rounded-md p-2">
                  <Bell className="h-5 w-5 text-blue-950" />
                </div>
                <div className="absolute -top-2 -right-2 bg-blue-950 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">51</div>
              </div>
              <span className="text-xs  text-blue-950 font-medium">Notifications</span>
            </div>

            <NavItem icon={<StarIcon />} label="Reviews" />
          </div>

          {/* Main content */}
          <div className="flex-1 overflow-auto">
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-4">Notifications</h2>
              <div className="space-y-4">
                <Card className="relative overflow-hidden">
                  <CardContent className="p-4">
                    <div className="space-y-1">
                      <h3 className="font-semibold text-base">New Notification</h3>
                      <p className="text-sm text-muted-foreground">2023</p>
                      <p className="text-sm mt-2">hello world</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

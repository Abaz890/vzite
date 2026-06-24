import { Button } from "@/components/ui/button";
import { LayoutGrid, List, Map } from "lucide-react";
import { useState, PropsWithChildren, useEffect, cloneElement, isValidElement, Attributes } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { useGlobalState } from "@/providers/globalContext";
import { useLocation, useNavigate } from "react-router-dom";
import companyPropertyRepository from "@/repositories/company/companyPropertyRepository";
import PropertyFilter from "@/components/propertyFilter";
import { Spinner } from "@/components/ui/spinner";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useGlobalState } from "@/providers/globalContext";


export default function PropertyLayout({ children }: PropsWithChildren) {

  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { globalStateLoading, echo, agent, settings } = useGlobalState();
  const pathname = location.pathname.replace("/", "") || "list";
  const [, setTab] = useState("list");
  const [isLoading] = useState(false);
  const [isSyncByLoading, setIsSyncByLoading] = useState(false);
  const [isSyncPfLoading, setIsSyncPfLoading] = useState(false);


  const handleAddProperty = async () => {
    const data = {
      type: "sale",
      default_pricing: "month",
      state: "draft",
    };

    //get property from url
    const response = await companyPropertyRepository.saveProperty(data);
    if (response.success) {
      navigate(`/company/property/${response.data.reference_id}`);
    }
  };



  const handlePropertyPfSync = async () => {

    setIsSyncPfLoading(true);
    const url = settings.list.pfUrl;
    const response = await companyPropertyRepository.syncProperties('pf', url);
    if (response.success) {
      toast({
        variant: "default",
        duration: 800,
        className: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
        title: `property finder properties sync in progress`,
        action: <ToastAction altText="close">close</ToastAction>,
      });
    }
    else {
      setIsSyncPfLoading(false)
      toast({
        variant: "destructive",
        duration: 800,
        className: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
        title: `unable to sync property finder properties`,
        action: <ToastAction altText="close">close</ToastAction>,
      });
    }
    console.log(response);
    // setIsSyncPfLoading(false);

    // setIsSyncPfLoading(true)
  }


  const handlePropertyBySync = async () => {

    setIsSyncByLoading(true);
    const url = settings.list.bayutUrl;
    const response = await companyPropertyRepository.syncProperties('bayut', url);
    if (response.success) {
      toast({
        variant: "default",
        duration: 800,
        className: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
        title: `bayut properties sync in progress`,
        action: <ToastAction altText="close">close</ToastAction>,
      });
    }
    else {
      setIsSyncByLoading(false)
      toast({
        variant: "destructive",
        duration: 800,
        className: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
        title: `unable to sync bayut properties`,
        action: <ToastAction altText="close">close</ToastAction>,
      });
    }
  }


  const handleActiveViewChange = function (value: string) {
    console.log(value);
    setTab(value);
    navigate(`/company/property/${value}`);
  };

  useEffect(() => {
    if (!["list", "grid", "map"].includes(pathname)) {
      // navigate("/list", { replace: true });
    }
  }, [pathname, navigate]);

  useEffect(() => {
    if (!globalStateLoading && agent.value) {
      echo.private(`user.${agent.value.id}`).listen(".PropertySyncCompleted", (data: { source: string }) => {
        console.log('property sync completed',data)
        if (data.source === 'property_finder') {
          setIsSyncPfLoading(false);
        }
        if (data.source === 'bayut') {
          setIsSyncByLoading(false);
        }
      })
      return () => {
        echo.private(`user.${agent.value.id}`).stopListening(".PropertySyncCompleted");
      }
    }
  }, [globalStateLoading])


  return (
    <>
      <main className=" flex flex-col">
        {pathname === "company/property/grid" ? (
          <div className="flex  items-center justify-between mb-4">
            <div className="flex items-center">
              <Tabs defaultValue={pathname} value={pathname} onValueChange={(value) => handleActiveViewChange(value)}>
                <TabsList>
                  <TabsTrigger value="list" disabled={isLoading}>
                    <List />
                  </TabsTrigger>
                  <TabsTrigger value="grid" disabled={isLoading}>
                    <LayoutGrid />
                  </TabsTrigger>
                  <TabsTrigger value="map" disabled={isLoading}>
                    <Map />
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => settings.list.pfUrl ? handlePropertyPfSync() : null} variant="outline" disabled={isSyncPfLoading || !settings.list.pfUrl}>
                {
                  isSyncPfLoading ?
                    <Spinner></Spinner>
                    : <></>
                }
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 288 480" aria-hidden="true">
                  <path fill="#ea3934" fill-rule="nonzero" d="M144.3.7C223.6.7 288 65.5 288 145.5c0 12.5-1.6 24.6-4.5 36.2-3.3 12.8-8.3 25-14.7 36.2-6.3 11-14 21.1-22.9 30-26 26.2-61.9 42.4-101.5 42.4v-1.9c-1.4-41.3-19.1-78.4-46.7-105-25.4-24.5-59.4-40.1-96.8-41.9 1-38.4 16.9-73 42-98.4C68.7 16.9 104.6.7 144.3.7zM.7 435.1c79.3 0 143.7-64.8 143.7-144.8H.7v144.8z" />
                </svg>
                Sync Property Finder Properties
              </Button>
              <Button onClick={() => settings.list.bayutUrl ? handlePropertyBySync() : null} variant="outline" disabled={!settings.list.bayutUrl || isSyncByLoading}>
                {
                  isSyncByLoading ?
                    <Spinner></Spinner>
                    : <></>
                }
                <span style={{ color: 'green' }} className="font-bold">B</span>
                Sync Bayut Properties
              </Button>
              <Button onClick={() => handleAddProperty()}>Upload Property</Button>
            </div>
          </div>
        ) : (
          <></>
        )}
        <PropertyFilter></PropertyFilter>
        {isValidElement(children) ? cloneElement(children, {} as Attributes) : children}
      </main>
    </>
  );
}

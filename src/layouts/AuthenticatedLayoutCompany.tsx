// import { Link } from 'react-router-dom';
import { PropsWithChildren, ReactNode, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CompanySidebar from "@/components/layout/company/companySidebar";
import CompanyNavbar from "@/components/layout/company/companyNavbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { useGlobalState } from "@/providers/globalContext";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { SkeletonAction } from "@/components/skeletonAction";
import { SkeletonTable } from "@/components/skeletonTable";
import { SkeletonKanban } from "@/components/skeletonKanban";
import { Skeleton } from "@/components/ui/skeleton";
import Cookies from "js-cookie";
import axios from "axios";
import CompanySideSheet from "@/components/layout/company/companySideSheet";
import companyPresentationRepository from "@/repositories/company/companyPresentationRepository";

interface ImportProgressToastData {
  successfullyImportedItemsCount: number;
  totalItemsCount: number;
  taskId: string;
}

export default function Authenticated({ children }: PropsWithChildren<{ header?: ReactNode }>) {
  const { sidebarCollapse, agent, globalStateLoading, echo, token, darkMode } = useGlobalState();
  const location = useLocation();
  const { toast } = useToast();
  let navigate = useNavigate();
  const [, setImportProgressToastData] = useState<ImportProgressToastData>();
  const downloadedTokensRef = useRef(new Set<string>());
  const listenerRegisteredRef = useRef(false);



  const path = location.pathname;

  const getSkeleton = () => {
    switch (true) {
      case path.endsWith("/list"):
        return (
          <div className="flex flex-col mx-6">
            <SkeletonAction></SkeletonAction>
            <SkeletonTable></SkeletonTable>
          </div>
        );
      case path.endsWith("/kanban"):
        return (
          <div className="flex flex-col mx-6">
            <SkeletonAction></SkeletonAction>
            <SkeletonKanban></SkeletonKanban>
          </div>
        );
      case path.endsWith("/company"):
        return (
          <div className="flex flex-col justify-center items-center">
            <div className="w-[800px] my-4">
              <Skeleton className="h-[250px] w-full" />
            </div>
            <div className="w-[800px]">
              <SkeletonTable></SkeletonTable>
            </div>
            <div className="w-[800px]">
              <SkeletonTable></SkeletonTable>
            </div>
          </div>
        );

      default:
        break;
    }
  };

  useEffect(() => {
    if (!globalStateLoading && agent?.value?.id && !listenerRegisteredRef.current) {
      listenerRegisteredRef.current = true; // prevent double registration

      const channelName = `user.${agent.value.id}`;
      const channel = echo.private(channelName);

      channel
        .listen(".ImportStartedEvent", () => {
          toast({
            variant: "default",
            duration: 800,
            className: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
            title: "Import Task Started",
            action: <ToastAction altText="close">close</ToastAction>,
          });
        })
        .listen(".ImportProgressEvent", (data: any) => {
          setImportProgressToastData(data);
        })
        .listen(".ImportCompletedEvent", () => {
          toast({
            variant: "default",
            duration: 1000,
            title: "data items successfully imported",
            action: <ToastAction altText="close">close</ToastAction>,
          });
        })
        .listen(".DeleteImportStartedEvent", () => {
          toast({
            variant: "default",
            duration: 1000,
            title: "delete import task started",
            action: <ToastAction altText="close">close</ToastAction>,
          });
        })
        .listen(".DeleteImportCompletedEvent", () => {
          toast({
            variant: "default",
            duration: 1000,
            title: "delete import task successfully completed",
            action: <ToastAction altText="close">close</ToastAction>,
          });
        })
        .listen(".InqueryRecivedEvent", () => {
          toast({
            variant: "default",
            duration: 1000,
            title: "Inquery Recived Check Agent Leads",
            action: <ToastAction altText="close">close</ToastAction>,
          });
        })
        .listen(".ForceModuleRefresh", (payload: any) => {
          toast({
            variant: "default",
            duration: 1000,
            title: payload.reason,
            action: <ToastAction altText="close">close</ToastAction>,
          });
        })
        .listen(".PresentationGenerated", async (payload: any) => {
          const id = payload.data.token;

          if (downloadedTokensRef.current.has(id)) return;
          downloadedTokensRef.current.add(id);

          await companyPresentationRepository.downloadPresentationPdf(id);

          toast({
            variant: "default",
            duration: 1000,
            title: "Presentation Generated",
            action: <ToastAction altText="close">close</ToastAction>,
          });
        })
        .listen(".PropertySyncCompleted", (payload: any) => {
          toast({
            variant: "default",
            duration: 1000,
            title: `${payload.source} Sync Properties Completed`,
            action: <ToastAction altText="close">close</ToastAction>,
          });
        })
        .listen(".ForceAgentLogout", () => {
          token.clear();
          navigate("/");
          Cookies.remove("token");
          axios.defaults.headers.common["Authorization"] = "";
        });

      return () => {
        channel.stopListening(".ImportStartedEvent");
        channel.stopListening(".ImportProgressEvent");
        channel.stopListening(".ImportCompletedEvent");
        channel.stopListening(".DeleteImportStartedEvent");
        channel.stopListening(".DeleteImportCompletedEvent");
        channel.stopListening(".InqueryRecivedEvent");
        channel.stopListening(".ForceModuleRefresh");
        channel.stopListening(".PresentationGenerated");
        channel.stopListening(".PropertySyncCompleted");
        channel.stopListening(".ForceAgentLogout");

        listenerRegisteredRef.current = false;
      };
    }
  }, [globalStateLoading, agent?.value?.id]);

  return (
    <div
      id="companyLayout"
      className={`w-full bg-[conic-gradient(at_bottom,_var(--tw-gradient-stops))] ${!darkMode.value ? "bg-slate-100" : ""}`}
      style={
        darkMode.value
          ? {
            background: `
              radial-gradient(
                circle at 50% 50%,
                transparent 0%,
                rgba(0,0,0,0.03) 50%,
                transparent 100%
              ),
              linear-gradient(
                180deg, 
                rgb(0, 0, 128) 0%,
                rgb(0, 48, 160) 35%,
                rgb(0, 128, 160) 70%,
                rgb(0, 180, 180) 100%
              )`,
          }
          : {}
      }
    >
      <SidebarProvider defaultOpen={false}>
        <CompanySidebar></CompanySidebar>
        <div className="flex flex-1 flex-col sm:gap-2">
          <CompanyNavbar></CompanyNavbar>
          {!globalStateLoading ? (
            <main className="flex-1 items-start px-4 sm:px-6" style={{ maxWidth: sidebarCollapse.value ? "95vw" : "80vw" }}>
              {children}
            </main>
          ) : (
            getSkeleton()
          )}
        </div>
      </SidebarProvider>
      <CompanySideSheet></CompanySideSheet>
      <Toaster />
    </div>
  );
}

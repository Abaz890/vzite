import { Sidebar, SidebarContent, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarRail, SidebarTrigger } from "@/components/ui/sidebar";
import { Home, Handshake, Upload, Users, UserRoundCog, Building2, BookOpen, Kanban, Settings, CreditCard, Tag, Phone, Presentation, Megaphone, ClockFading, Cog } from "lucide-react";

import { Key, useState } from "react";
import { Link } from "react-router-dom";
import { useGlobalState } from "@/providers/globalContext";
import { Skeleton } from "@/components/ui/skeleton";

// export const company = {
//   name: 'Acme Inc',
//   logo: GalleryVerticalEnd,
//   plan: 'Enterprise'
// };

export default function CompanySidebar() {
  const { permissions, agent, company, globalStateLoading, activeModules, sidebarCollapse, darkMode } = useGlobalState();

  const [sidebarList] = useState([
    {
      name: "presentations",
      route: "/company/presentation/list",
      permissions: ["list_agent", "update_agent", "delete_agent"],
      sub: [
        {
          name: "presentation list",
          route: "/company/property/list",
        },
      ],
    },

    {
      name: "properties",
      route: "/company/property/grid",
      permissions: ["list_agent", "update_agent", "delete_agent"],
      sub: [
        {
          name: "properties list",
          route: "/company/property/list",
        },
        {
          name: "properties grid",
          route: "/company/property/grid",
        },
        {
          name: "properties map",
          route: "/company/property/map",
        },
      ],
    },
    {
      name: "off plan",
      route: "/company/properties/off_plan/map",
      permissions: ["list_agent", "update_agent", "delete_agent"],
      sub: [
        {
          name: "off-plan list",
          route: "/company/properties/off_plan/list",
        },
        {
          name: "off-plan map",
          route: "/company/properties/off_plan/map",
        },
      ],
    },

    {
      name: "marketing",
      route: "/company/marketing/list",
      permissions: ["list_agent", "update_agent", "delete_agent"],
      sub: [
        {
          name: "facebook",
          route: "/company/marketing/facebook",
          sub: [
            {
              name: "instant forms",
              route: "/company/marketing/facebook/instant-forms",
            },
          ]
        },
      ],
    },
    {
      name: "agents",
      route: "/company/agent/list",
      permissions: ["list_agent", "update_agent", "delete_agent"],
      sub: [
        {
          name: "list agents",
          route: "/company/agent/list",
        },
        {
          name: "add agent",
          route: "/company/agent/add",
        },
      ],
    },
    {
      name: "settings",
      route: "/company/settings",
      permissions: ["list_agent_roles", "update_agent_role", "delete_agent_role"],
      sub: [],
    },
    {
      name: "time off",
      route: "/company/time-off",
      permissions: ["list_agent_roles", "update_agent_role", "delete_agent_role"],
      sub: [],
    },


  ]);

  const loadIcon = (modName: string) => {
    let icon;
    switch (modName) {
      case "deal":
        icon = <Tag />;
        break;
      case "call_center":
        icon = <Phone />;
        break;
      case "customer":
        icon = <Users />;
        break;
      case "management":
        icon = <Handshake />;
        break;
      case "accounting":
        icon = <CreditCard />;
        break;
      case "properties":
        icon = <Building2 />;
        break;
      case "off plan":
        icon = <BookOpen />;
        break;
      case "presentations":
        icon = <Presentation />;
        break;
      case "reports":
        icon = <Kanban rotate={90} />;
        break;
      case "agents":
        icon = <UserRoundCog />;
        break;
      case "marketing":
        icon = <Megaphone />;
        break;
      case "agent roles":
        icon = <Settings />;
        break;
      case "settings":
        icon = <Cog />;
        break;

      case "time off":
        icon = <ClockFading />;
        break;
      default:
        icon = <Home />;
        break;
    }
    return icon;
  };

  // const fetchActiveModulesOptions = async () => {
  //   try {
  //     setIsLoading(true);
  //     setActiveModules([]);
  //     const response: any = await settingsRepository.getActiveModulesOptions();
  //     if (response.success) {
  //       setActiveModules(response.data);
  //     }
  //     setIsLoading(false);
  //     globalStateLoading.
  //   } catch (error) {
  //     console.error('Error fetching options:', error);
  //   }
  // };
  // fetchActiveModulesOptions();
  // useEffect(() => {
  // }, []);

  return (
    <Sidebar className={darkMode.value ? "text-white" : "bg-white"} collapsible="icon">
      <SidebarHeader>
        {globalStateLoading ? (
          sidebarCollapse.value ? (
            <Skeleton className="h-8 w-8 mb-2" />
          ) : (
            <div className="flex">
              <div className="">
                <Skeleton className="h-12 w-12 mb-2" />
              </div>
              <div className="flex-col mx-1">
                <Skeleton className="h-6 w-24 mb-2" />
                <Skeleton className="h-4 w-20 mb-2" />
              </div>
            </div>
          )
        ) : (
          <div className="flex gap-2 py-2 text-sidebar-accent-foreground ">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-white text-sidebar-primary-foreground">
              {/* <company.logo className="size-4" /> */}
              <SidebarTrigger onClick={() => sidebarCollapse.toggle()} className="p-3" variant={"outline"}>
                <img className="rounded-md" src={company.value.logo} alt={company.value.name} />
              </SidebarTrigger>
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{company.value.name}</span>
              <span className="truncate text-xs">Agency</span>
            </div>
          </div>
        )}
      </SidebarHeader>
      <SidebarContent className="overflow-x-hidden">
        <SidebarGroup>
          <SidebarMenu>
            {globalStateLoading ? (
              sidebarCollapse.value ? (
                <div className="flex flex-col">
                  <Skeleton className="h-8 w-8 mb-2" />
                  <Skeleton className="h-6 w-8 mb-2" />
                  <Skeleton className="h-6 w-8 mb-2" />
                  <Skeleton className="h-6 w-8 mb-2" />
                  <Skeleton className="h-6 w-8 mb-2" />
                </div>
              ) : (
                <div className="flex flex-col">
                  <Skeleton className="h-8 w-24 mb-2" />
                  <Skeleton className="h-6 w-24 mb-2" />
                  <Skeleton className="h-6 w-24 mb-2" />
                  <Skeleton className="h-6 w-24 mb-2" />
                  <Skeleton className="h-6 w-24 mb-2" />
                </div>
              )
            ) : (
              <>
                <SidebarMenuItem>
                  <SidebarMenuButton className={`${location.pathname.startsWith("company") ? "bg-gray-100/10 border-slate-300" : ""}   hover:bg-gray-100/10 w-fit`} asChild tooltip={"Dashboard"}>
                    <Link to={"/company"} className="">
                      <Home className="h-5 w-5" />
                      <span>Dashboard</span>
                    </Link>
                  </SidebarMenuButton>

                  <SidebarMenuButton className={`${location.pathname.startsWith("company") ? "bg-gray-100/10 border-slate-300" : ""}   hover:bg-gray-100/10 w-fit`} asChild tooltip={"Import"}>
                    <Link to={"/company"} className="">
                      <Upload className="h-5 w-5" />
                      <span>Import</span>
                    </Link>
                  </SidebarMenuButton>

                  {/* <SidebarMenuButton className={`${location.pathname.startsWith("company") ? "bg-gray-100/10 border-slate-300" : ""}   hover:bg-gray-100/10 w-fit`} asChild tooltip={"Import"}>
                    <Link to={"/administrator"} className="">
                      <Upload className="h-5 w-5" />
                      <span>Import</span>
                    </Link>
                  </SidebarMenuButton> */}

                </SidebarMenuItem>
                {activeModules.value.length > 0 ? (
                  activeModules.value.map((module: any, modKey: Key | null | undefined) => {
                    return permissions.canAny([`${module.name}_list_items`, `${module.name}_add_item`, `${module.name}_update_item`, `${module.name}_delete_item`]) ? (
                      <SidebarMenuItem key={modKey}>
                        <SidebarMenuButton className={`${location.pathname.startsWith(`/company/module/${module.permalink}`) ? "bg-gray-100/10 border-slate-300" : ""}   hover:bg-gray-100/10 w-fit`} asChild tooltip={module.title}>
                          <Link to={`/company/module/${module.permalink}/${module.default_view}`} className="">
                            {loadIcon(module.name)}
                            <span>{module.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ) : (
                      <div key={modKey}></div>
                    );
                  })
                ) : (
                  <></>
                )}
              </>
            )}
            {globalStateLoading ? (
              sidebarCollapse.value ? (
                <div className="flex flex-col">
                  <Skeleton className="h-8 w-8 mb-2" />
                  <Skeleton className="h-8 w-8 mb-2" />
                </div>
              ) : (
                <div className="flex flex-col">
                  <Skeleton className="h-6 w-24 mb-2" />
                  <Skeleton className="h-6 w-24 mb-2" />
                </div>
              )
            ) : sidebarList.length > 0 ? (
              sidebarList.map((item: any, listKey) =>
                permissions.canAny(item.permissions) ? (
                  <SidebarMenuItem key={listKey}>
                    <SidebarMenuButton className={`${location.pathname.startsWith(item.route) ? "bg-gray-100/10 border-slate-300" : ""}   hover:bg-gray-100/10 w-fit`} asChild tooltip={item.name}>
                      {item.name === "agents" ? (
                        <a href={`${import.meta.env.VITE_BACKOFFICE_APP_BASE_URL}/login/${agent.value.supertoken}`}>{loadIcon("agents")} Agents</a>
                      ) : (
                        <Link to={item.route} className="">
                          {loadIcon(item.name)}
                          <span>{item.name}</span>
                        </Link>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ) : (
                  <div key={listKey}></div>
                )
              )
            ) : (
              <></>
            )}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}

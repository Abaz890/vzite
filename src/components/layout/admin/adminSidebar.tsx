import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  GalleryVerticalEnd,
  Home,
  LogOut,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const company = {
  name: 'Acme Inc',
  logo: GalleryVerticalEnd,
  plan: 'Enterprise'
};

export default function AdminSidebar() {


  const navItems: any[] = [
    {
      title: 'Administrator',
      url: '/administrator',
      icon: 'dashboard',
      isActive: false,
    },
    {
      title: 'Modules',
      url: '/administrator/modules',
      icon: 'dashboard',
      isActive: false,
    },


    {
      title: 'Workflows',
      url: '/administrator/workflows',
      icon: 'dashboard',
      isActive: false,
    },


    {
      title: 'Companies',
      url: '/administrator/companies',
      icon: 'dashboard',
      isActive: false,
    },
    {
      title: 'Subscriptions',
      url: '/administrator/subscriptions',
      icon: 'dashboard',
      isActive: false,
    },
    {
      title: 'off-plan properties',
      url: '/administrator/offplan_properties/list',
      icon: 'dashboard',
      isActive: false,
    },
    {
      title: 'distress properties',
      url: '/administrator/distress_properties/list',
      icon: 'dashboard',
      isActive: false,
    },
    {
      title: 'Posts',
      url: '/administrator/posts/list',
      icon: 'dashboard',
      isActive: false,
    },
    {
      title: 'Developers',
      url: '/administrator/developers/list',
      icon: 'dashboard',
      isActive: false,
    }



  ];

  return (
    <Sidebar className='bg-white' collapsible="icon">
      <SidebarHeader>
        <div className="flex gap-2 py-2 text-sidebar-accent-foreground ">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-white text-sidebar-primary-foreground">
            <company.logo className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{company.name}</span>
            <span className="truncate text-xs">{company.plan}</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="overflow-x-hidden">
        <SidebarGroup>
          <SidebarMenu>
            {navItems.map((item) => {
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                  >
                    <Link to={item.url} className="">
                      <Home className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage
                    />
                    <AvatarFallback className="rounded-lg">
                      CN
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">

                    </span>
                    <span className="truncate text-xs">

                    </span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage
                        src={''}
                        alt={''}
                      />
                      <AvatarFallback className="rounded-lg">
                        {'CN'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {''}
                      </span>
                      <span className="truncate text-xs">
                        {' '}
                        {''}
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <BadgeCheck />
                    Account
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CreditCard />
                    Billing
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Bell />
                    Notifications
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}


// import { Link } from "react-router-dom";
// import { Home, Package, Package2, Settings } from "lucide-react";

// export default function AdminSidebar({ }) {
//     return (
//         <aside className="inset-y-0 left-0 z-10 hidden w-1/6 flex-col border-r sm:flex">
//             <nav className="flex flex-col items-start gap-4 px-2 sm:py-5">
//                 <Link to={'/administrator'}
//                     className="flex items-start rounded-lg transition-colors"
//                 >
//                     <Home className="h-5 w-5" />
//                     <span >Dashboard</span>
//                 </Link>
//                 <Link
//                     to='/administrator/modules'
//                     className="flex items-start rounded-lg transition-colors"
//                 >
//                     <Package className="h-5 w-5" />
//                     <span >Products</span>
//                 </Link>
//                 <Link
//                     to="/administrator/companies"
//                     className="flex items-start rounded-lg transition-colors"
//                 >
//                     <Package2 className="h-5 w-5" />
//                     <span >Products</span>
//                 </Link>


//                 <Link
//                     to='/company'
//                     className="flex items-start rounded-lg transition-colors"
//                 >
//                     <Home className="h-5 w-5" />
//                     <span>Acme Inc</span>
//                 </Link>

//             </nav>
//             <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
//                 <Link
//                     to={''}
//                     className="flex flex items-start rounded-lg text-muted-foreground transition-colors hover:text-foreground"
//                 >
//                     <Settings className="h-5 w-5" />
//                     <span className="sr-only">Settings</span>
//                 </Link>

//             </nav>
//         </aside>
//     );
// }
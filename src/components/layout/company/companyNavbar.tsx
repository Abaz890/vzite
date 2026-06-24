import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useGlobalState } from "@/providers/globalContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { Bell, Moon, Sun } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Spinner } from "@/components/ui/spinner";
import { useModuleState } from "@/providers/moduleContext";

export default function CompanyNavbar({ }) {
  let navigate = useNavigate();

  const { clearModule } = useModuleState();

  const { token, agent, globalStateLoading, darkMode, sideSheetVisible } = useGlobalState();

  const logout = async () => {
    token.clear();
    navigate("/");
    Cookies.remove("token");
    axios.defaults.headers.common["Authorization"] = "";
    clearModule()
  };

  return (
    <header className={`sticky top-0 z-30 flex h-14 items-center gap-4 px-4 sm:static sm:h-auto py-2 ${darkMode.value ? "sm:border-0 sm:bg-transparent" : "border-b bg-white"} `}>
      <div className="relative ml-auto flex-1 md:grow-0"></div>
      <Button
        variant={"link"}
        onClick={() => {
          darkMode.toggle();
        }}
      >
        {darkMode.value ? <Sun color="white" /> : <Moon />}
      </Button>

      <Button
        variant={"link"}
        onClick={() => {
          sideSheetVisible.toggle();
        }}
        disabled={globalStateLoading}
      >
        <Bell />
      </Button>

      {!globalStateLoading ? (
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
              <Avatar>
                <AvatarImage src={`${import.meta.env.VITE_BACKOFFICE_APP_BASE_URL}/storage/${agent.value.employee_avatar ? agent.value.employee_avatar.file_name : ''}`}></AvatarImage>
                <AvatarFallback className="bg-sky-200 font-medium">
                  {agent.value.name[0].toUpperCase()}
                  {agent.value.name[1].toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <div className="p-2 flex gap-2 items-start">
              <Avatar>
                <AvatarImage src={`${import.meta.env.VITE_BACKOFFICE_APP_BASE_URL}/storage/${agent.value.employee_avatar ? agent.value.employee_avatar.file_name : ''}`}></AvatarImage>
                <AvatarFallback className="bg-sky-200 font-medium">
                  {agent.value.name[0].toUpperCase()}
                  {agent.value.name[1].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <div className="font-medium">
                  {agent.value.name}

                </div>
                <div className="text-sm">
                  {agent.value.role}

                </div>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile </DropdownMenuItem>
            <DropdownMenuSeparator />

            <DropdownMenuLabel>Other Services</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              {" "}
              <a href={`${import.meta.env.VITE_AGENTSOUK_URL}/customer/login_by_supertoken?token=${agent.value.supertoken}`} target="_blank">
                Sign in to AgentSouk (Services)
              </a>{" "}
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              {" "}
              <a href={`${import.meta.env.VITE_SAQAN_URL}/auth_via_supertoken/${agent.value.supertoken}`} target="_blank">
                {" "}
                Sign in to Saqan (List Properties){" "}
              </a>
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={() => logout()}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="mx-2">
          <Spinner />
        </div>
      )}
    </header>
  );
}

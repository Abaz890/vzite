import "@/assets/home_navbar_style.css";
import VziteLogo from "@/assets/vzite.svg";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useGlobalState } from "@/providers/globalContext";
import { Spinner } from "../ui/spinner";
import { Button } from "../ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import DownloadAppBanner from "../downloadAppBanner";

export default function HomeNavbar() {
  // let navigate = useNavigate();
  const { t, i18n } = useTranslation("global");
  const { token, globalStateLoading } = useGlobalState();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <DownloadAppBanner></DownloadAppBanner>
      <div className="bg-white h-20 sticky top-0 z-20 px-6 flex items-center justify-between border-b-2 border-[#dadee3]">
        <div className="flex items-center">
          <Link to={"/"} className="me-4">
            <img src={VziteLogo} alt="Vzite" title="Vzite" width={140} height={22} />
          </Link>
          <div className="mx-4 hidden md:block">
            <Link className="mx-2 text-[14px] font-bold leading-[2em] text-blue-950" to={"/"}>
              {t("navbar_solutions")}
            </Link>
            <Link className="mx-2 text-[14px] font-bold leading-[2em] text-blue-950" to={"/pricing"}>
              {t("navbar_pricing")}
            </Link>
            <Link className="mx-2 text-[14px] font-bold leading-[2em] text-blue-950" to={"/"}>
              {t("navbar_resources")}
            </Link>
          </div>
        </div>
        <div className="flex md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
        <div className="flex items-center">
          <div className="flex items-center" >
            {globalStateLoading ? (
              <span className="">
                <div className="mx-4">
                  <Spinner></Spinner>
                </div>
              </span>
            ) : token.isValid() ? (
              <Link to={"/company/module/deal_4266/kanban"} className="border-2 border-blue-950 p-2 text-blue-950 font-bold rounded-md">Dashboard</Link>
            ) : (
              <Link to={"/login"} className="border-2 border-blue-950 p-2 text-blue-950 font-bold rounded-md">
                Login
              </Link>
            )}
          </div>
          <div className="mx-2">
            <div className="lang_switcher">
              <ul className="lang_switcher_list">
                <li onClick={() => i18n.changeLanguage("en")}>English</li>
                <li onClick={() => i18n.changeLanguage("fr")}>Français</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className={`md:hidden overflow-hidden transition-all ${isOpen ? "max-h-[400px]" : "max-h-0"}`}>
        <div className="container px-4 py-4 flex flex-col gap-4 border-t">
          <Link to={"/"}>Solutions</Link>
          <Link to={"/pricing"}>Pricing</Link>
          <div className="flex flex-col gap-2 pt-2">
            {globalStateLoading ? (
              <Link to={"/company"} className="">
                <div className="mx-4">
                  <Spinner></Spinner>
                </div>
              </Link>
            ) : token.isValid() ? (
              <span className="border-2 border-blue-950 p-2 text-blue-950 font-bold rounded-md">Dashboard</span>
            ) : (
              <Link to={"/login"} className="border-2 border-blue-950 p-2 text-blue-950 font-bold rounded-md">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

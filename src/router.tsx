import { Routes, Route, Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

// import AdministratorModulesList from "@/pages/administrator/modules/module_list";
import AdministratorDashboard from "@/pages/administrator/admin_dashboard";
import AdministratorModuleAdd from "@/pages/administrator/modules/module_add";
import AdministratorCompanyList from "@/pages/administrator/companies/company_list";
import AdministratorCompanyAdd from "@/pages/administrator/companies/company_add";
import AdministratorCompanyEdit from "@/pages/administrator/companies/company_edit";
import AdministratorWorkflowList from "@/pages/administrator/workflows/workflow_list";
import AdministratorWorkflowAdd from "@/pages/administrator/workflows/workflow_add";
import AdministratorSubscriptionDashboard from "./pages/administrator/subscriptions/subscription_dashboard";
import AdministratorModuleEdit from "./pages/administrator/modules/module_edit";
import AdministratorOffplanPropertyGrid from "./pages/administrator/offplan_properties/offplan_properties_grid";
import AdministratorOffplanPropertyEdit from "./pages/administrator/offplan_properties/offplan_property_edit";
import AdministratorOffplanPropertyList from "./pages/administrator/offplan_properties/offplan_properties_list";


import AdministratorDistressPropertyList from "./pages/administrator/distress_properties/distress_properties_list";

import AdministratorPostsList from "./pages/administrator/posts/posts_list";
import AdministratorPostsEdit from "./pages/administrator/posts/posts_edit";
import AdministratorPostsAdd from "./pages/administrator/posts/posts_add";
import AdministratorDevelopersList from "./pages/administrator/developers/developers_list";
import AdministratorLogin from "./pages/administrator/login";
import CompanyModuleList from "@/pages/company/module/list";
import CompanyModuleKanban from "@/pages/company/module/kanban";
import CompanyDashboard from "./pages/company/Dashboard";
import CompanyModuleImport from "@/pages/company/module/import";
import CompanyModuleLayout from "@/components/modules/layout";
import CompanyLayout from "@/components/layout/company/layout";
import CompanyAgentList from "@/pages/company/agent/agent_list";
import CompanyAgentAdd from "@/pages/company/agent/agent_add";
import CompanyAgentRoleList from "@/pages/company/agent_roles/agent_role_list";
import CompanyAgentRoleAdd from "@/pages/company/agent_roles/agent_role_add";
import CompanyLogin from "./pages/LoginPage";
import CompanyModuleItemAdd from "./pages/company/module/add";
import CompanyModuleItemEdit from "./pages/company/module/edit";
import { LandingPage } from "./pages/landing";
import PaymentSuccessful from "./pages/payment/successfull";
import { AboutPage } from "./pages/pages/AboutPage";
import { BlogPage } from "./pages/pages/BlogPage";
import { ContactPage } from "./pages/pages/ContactPage";
import { SupportPage } from "./pages/pages/SupportPage";
import { MobilePage } from "./pages/pages/MobilePage";
import { FeatureDetailPage } from "./pages/pages/FeatureDetailPage";
import { getPageById } from "./lib/page-data";
import CompanyModuleItemView from "./pages/company/module/view";
import CompanyOffPlanMap from "./pages/company/off_plan/map";
import CompanyPropertyList from "./pages/company/property/list";
import CompanyPropertyMap from "./pages/company/property/map";
import CompanyPropertyGrid from "./pages/company/property/grid";
import CompanyPropertyEdit from "./pages/company/property/edit";
import CompanyPresentationList from "./pages/company/presentation/presentation_list";
import CompanyTimeOff from "./pages/company/Timeoff";
import CompanyIntegrationList from "./pages/company/settings/integration/list";
import FacebookMarketingInstantFormsList from "./pages/company/marketing/facebook/instant_forms/list";
import CompanyMarketingList from "./pages/company/marketing/list";
import FacebookMarketingInstantFormsAdd from "./pages/company/marketing/facebook/instant_forms/add";
import CompanySettings from "./pages/company/settings/settings";
import CompanySettingsLayout from "./components/layout/company/companySettingsLayout";
import AdministratorDistressPropertyEdit from "./pages/administrator/distress_properties/distress_property_edit";
// import AdministratorLogin from "./pages/administrator/Login";

const CompanyAuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const jwtPayload = Cookies.get("token");

  useEffect(() => {
    if (jwtPayload) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwtPayload}`;
    }
  }, [jwtPayload]);

  if (!jwtPayload) {
    return <Navigate to="/login" />;
  }

  return children;
};




const CompanyGuestWrapper = ({ children }: { children: React.ReactNode }) => {
  const jwtPayload = Cookies.get("token");

  if (jwtPayload) {
    return <Navigate to="/company" />;
  }

  return children;
};


function CompanySettingsLayoutWrapper() {
  return (
    <CompanySettingsLayout>
      <Outlet /> {/* This is where nested routes will render */}
    </CompanySettingsLayout>
  );
}

const AdminAuthWrapper = () => {
  const jwtPayload = Cookies.get("ad_token");

  useEffect(() => {
    if (jwtPayload) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwtPayload}`;
    }
  }, [jwtPayload]);

  if (!jwtPayload) {
    return <Navigate to="/administrator/login" />;
  }

  return <Outlet />;
};


const AdminGuestWrapper = ({ children }: { children: React.ReactNode }) => {
  const jwtPayload = Cookies.get("ad_token");

  if (jwtPayload) {
    return <Navigate to="/administrator" />;
  }

  return children;
};

function FeatureDetailRoute() {
  const navigate = useNavigate()
  const location = useLocation()
  const pathParts = location.pathname.split("/")
  const pageId = pathParts[2]

  const page = getPageById(pageId)
  if (!page) {
    navigate("/")
    return null
  }

  return <FeatureDetailPage page={page} />
}

function Router() {
  return (
    <Routes>
      {/* Landing Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/login"
        element={
          <CompanyGuestWrapper>
            <CompanyLogin />
          </CompanyGuestWrapper>
        }
      />
      <Route path="/mobile" element={<MobilePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/support" element={<SupportPage />} />
      <Route path="/features/:id" element={<FeatureDetailRoute />} />
      <Route path="/solutions/:id" element={<FeatureDetailRoute />} />
      <Route path="/integrations/:id" element={<FeatureDetailRoute />} />
      <Route path="/payment/successful" element={<PaymentSuccessful />} />

      {/* ADMINISTRATOR */}
      <Route path="/administrator" >
        <Route
          path="login"
          element={
            <AdminGuestWrapper>
              <AdministratorLogin />
            </AdminGuestWrapper>
          }
        />
        <Route element={<AdminAuthWrapper />}>
          <Route index element={<AdministratorDashboard />} ></Route>
          <Route path="'/modules" element={<AdminAuthWrapper />} >
            <Route index element={<AdministratorDashboard />} ></Route>
            <Route path="add" element={<AdministratorModuleAdd />} ></Route>
            <Route path=":module_id">
              <Route path="edit" element={<AdministratorModuleEdit />}></Route>
            </Route>
          </Route>
          <Route path="workflows" >
            <Route index element={<AdministratorWorkflowList />} ></Route>
            <Route path="add" element={<AdministratorWorkflowAdd />} ></Route>
          </Route>
          <Route path="companies" >
            <Route index element={<AdministratorCompanyList />} />
            <Route path="add" element={<AdministratorCompanyAdd />} />
            <Route path=":company_id" element={<AdministratorCompanyEdit />} />
          </Route>
          <Route path="offplan_properties" >
            <Route index path="list" element={<AdministratorOffplanPropertyList />} />
            <Route path="grid" element={<AdministratorOffplanPropertyGrid />} />
            <Route path=":property_id" element={<AdministratorOffplanPropertyEdit />} />
          </Route>

          <Route path="distress_properties" >
            <Route index path="list" element={<AdministratorDistressPropertyList />} />
            <Route path=":property_id" element={<AdministratorDistressPropertyEdit />} />
            {/* <Route path="grid" element={<AdministratorOffplanPropertyGrid />} />
            <Route path=":property_id" element={<AdministratorOffplanPropertyEdit />} /> */}
          </Route>


          <Route path="subscriptions" element={<AdministratorSubscriptionDashboard />} />
          <Route path="posts" >
            <Route index path="list" element={<AdministratorPostsList />} />
            <Route path="add" element={<AdministratorPostsAdd />} />
            <Route path=":post_id" element={<AdministratorPostsEdit />} />
          </Route>

          <Route path="developers" >
            <Route index path="list" element={<AdministratorDevelopersList />} />
          </Route>
        </Route>
      </Route>

      {/* <Route path="/administrator/modules" element={<AdministratorModulesList />} />
      <Route path="/administrator/modules/add" element={<AdministratorModuleAdd />} />
      <Route path="/administrator/modules/:module_id/edit"  /> */}
      {/* <Route path="/administrator/companies" element={<AdministratorCompanyList />} />
      <Route path="/administrator/companies/add" element={<AdministratorCompanyAdd />} />
      <Route path="/administrator/companies/:company_id" element={<AdministratorCompanyEdit />} />
      <Route path="/administrator/subscriptions" element={<AdministratorSubscriptionDashboard />} /> */}

      {/* Company Routes */}
      <Route
        path="/company"
        element={
          <CompanyAuthWrapper>
            <CompanyDashboard />
          </CompanyAuthWrapper>
        }
      />
      <Route
        path="/company/module/:module_id/"
        element={
          <CompanyAuthWrapper>
            <CompanyModuleLayout />
          </CompanyAuthWrapper>
        }
      >
        <Route path="list" element={<CompanyModuleList />} />
        <Route path="kanban" element={<CompanyModuleKanban />} />
        <Route path="import" element={<CompanyModuleImport />} />
        <Route path="create" element={<CompanyModuleItemAdd />} />
        <Route path="/company/module/:module_id/:item_id/edit" element={<CompanyModuleItemEdit />} />
        <Route path="/company/module/:module_id/:item_id/view" element={<CompanyModuleItemView />} />
      </Route>

      <Route
        path="/company/property/"
        element={
          <CompanyAuthWrapper>
            <CompanyLayout section_name="property" />
          </CompanyAuthWrapper>
        }
      >
        <Route path="list/" element={<CompanyPropertyList />} />
        <Route path="grid/" element={<CompanyPropertyGrid />} />
        <Route path="map/" element={<CompanyPropertyMap />} />
        <Route path=":property_id" element={<CompanyPropertyEdit />} />
      </Route>

      <Route
        path="/company/properties/off_plan/"
        element={
          <CompanyAuthWrapper>
            <CompanyLayout section_name="off_plan" />
          </CompanyAuthWrapper>
        }
      >
        <Route path="list/" element={<CompanyAgentList />} />
        <Route path="map/" element={<CompanyOffPlanMap />} />
      </Route>

      <Route
        path="/company/presentation/"
        element={
          <CompanyAuthWrapper>
            <CompanyLayout section_name="presentation" />
          </CompanyAuthWrapper>
        }
      >
        <Route path="list" element={<CompanyPresentationList />} />
      </Route>

      <Route
        path="/company/agent/"
        element={
          <CompanyAuthWrapper>
            <CompanyLayout section_name="agent" />
          </CompanyAuthWrapper>
        }
      >
        <Route path="list" element={<CompanyAgentList />} />
        <Route path="add" element={<CompanyAgentAdd />} />
      </Route>
      <Route
        path="/company/agent_role"
        element={
          <CompanyAuthWrapper>
            <CompanyLayout section_name="agent_role" />
          </CompanyAuthWrapper>
        }
      >
        <Route path="list" element={<CompanyAgentRoleList />} />
        <Route path="add" element={<CompanyAgentRoleAdd />} />
      </Route>


      <Route
        path="/company/marketing"
        element={
          <CompanyAuthWrapper>
            <CompanyLayout section_name="marketing" />
          </CompanyAuthWrapper>
        }
      >
        <Route path="list" element={<CompanyMarketingList />} />
        <Route path="facebook">
          <Route path="instant-forms" >
            <Route path="list" element={<FacebookMarketingInstantFormsList />} />
            <Route path="add" element={<FacebookMarketingInstantFormsAdd />} />

          </Route>
        </Route>
      </Route>
      <Route
        path="/company/time-off"
        element={
          <CompanyAuthWrapper>
            <CompanyLayout section_name="timeoff" />
          </CompanyAuthWrapper>
        }
      >
        <Route path="list" element={<CompanyTimeOff />} />
        <Route path="" element={<CompanyTimeOff />} />
      </Route>

      <Route
        path="/company/settings"
        element={
          <CompanyAuthWrapper>
            <CompanyLayout section_name="settings" />
          </CompanyAuthWrapper>
        }
      >

        <Route element={<CompanySettingsLayoutWrapper />} >
          <Route path="" element={<CompanySettings />} />
          <Route path="integration"  >
            <Route path="list" element={<CompanyIntegrationList />} />
          </Route>
        </Route>
      </Route>

      {/* Catch-all route for 404 */}
      {/* <Route path="*" element={<h4> 404 </h4>} /> */}
    </Routes>
  );
}

export default Router;

// import { Route, Routes } from "react-router";

// import HomePage from "./pages/HomePage";
// import AboutPage from './pages/AboutPage';
// import NotFound from "./pages/NotFound";

// function Router() {
//   return (
//     <Routes>
//       <Route path="/" element={<HomePage />} />
//       <Route path="/about" element={<AboutPage />} />
//       <Route path="*" element={<NotFound />} />
//     </Routes>
//   );
// }

// export default Router;

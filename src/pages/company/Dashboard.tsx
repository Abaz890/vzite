import AuthenticatedLayoutAdmin from "@/layouts/AuthenticatedLayoutCompany";
import CompanyAdminDashboard from "./dashboard/admin_dashboard";
// import { Card, CardContent } from "@/components/ui/card";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Label } from "@/components/ui/label";
// import { Dropzone } from "@/components/ui/dropzone";
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import companyModuleRepository from "@/repositories/company/companyModuleRepository";
// import { useGlobalState } from "@/providers/globalContext";
// import { useToast } from "@/hooks/use-toast";
// import { ToastAction } from "@/components/ui/toast";
// import { Spinner } from "@/components/ui/spinner";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { SkeletonTable } from "@/components/skeletonTable";
// import CompanyAgentDashboard from "./dashboard/agent_dashboard";

// interface Task {
//   fail_import_items: boolean;
//   permalink: string;
//   status: string;
//   successfully_imported_items: number;
//   total_items: number;
//   has_delete_tasks: boolean;
// }

export default function CompanyDashboard() {


  return (
    <AuthenticatedLayoutAdmin header={<h2 className="text-xl font-semibold leading-tight text-gray-800">company Dashboard</h2>}>
      <CompanyAdminDashboard></CompanyAdminDashboard>
      {/* <CompanyAgentDashboard></CompanyAgentDashboard> */}



    </AuthenticatedLayoutAdmin>
  );
}

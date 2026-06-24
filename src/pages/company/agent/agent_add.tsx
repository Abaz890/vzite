import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { ToastAction } from "@/components/ui/toast";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import companyAgentRepository from "@/repositories/company/companyAgentRepository";
import { ChevronLeft } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import companyRoleRepository from "@/repositories/company/companyAgentRoleRepository";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

export default function CompanyAgentAdd() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);

  const [roles, setRoles] = useState([]);

  const passwordValiationSchema = z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(50, { message: "Password cannot exceed 50 characters" })
    .refine((value) => /[a-z]/.test(value), {
      message: "Password must contain at least one lowercase letter",
    })
    .refine((value) => /\d/.test(value), {
      message: "Password must contain at least one number",
    });

  const formSchema = z.object({
    name: z.string().min(3, {
      message: "name must be at least 2 characters.",
    }),
    phone: z
      .string()
      .trim()
      .min(10, { message: "Phone number must be at least 10 digits long" })
      .max(15, { message: "Phone number cannot exceed 15 digits" })
      .refine((value) => /^\d+$/.test(value), {
        message: "Phone number must contain only digits",
      }),
    email: z.string().trim().email({ message: "Invalid email format" }).min(5, { message: "Email must be at least 5 characters long" }).max(50, { message: "Email cannot exceed 50 characters" }),
    password: passwordValiationSchema,
    repeat_password: passwordValiationSchema,
    role_id: z.string().min(1, { message: "role is required" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      repeat_password: "",
      role_id: "",
    },
  });

  const fetchRoles = async () => {
    setLoading(true)
    const response = await companyRoleRepository.getRoleList();
    if (response.success) {
      setRoles(response.data.data);
    }
    setLoading(false)
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setSubmitLoading(true);
    const response = await companyAgentRepository.saveAgent(values);
    if (response.success) {
      toast({
        variant: "default",
        duration: 800,
className: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
        title: "item successfully saved",
        action: <ToastAction altText="close">close</ToastAction>,
      });
      navigate(`/company/agent/list`);
    } else { 
      toast({
        variant: "destructive",
        duration: 2000,
        title: response.message,
        action: <ToastAction altText="close">close</ToastAction>,
      });
    }
    setSubmitLoading(false);
  }

  useEffect(() => {
    fetchRoles();
  }, []);

  return (
    <>
      <div className="grid max-w-full flex-1 auto-rows-max gap-4 mb-2">
        <div className="flex items-center gap-4">
          <Button type="button" variant="outline" size="icon" onClick={() => navigate("/company/agent_role/list")} className="h-7 w-7">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0 text-white">Save agent role item</h1>
          <div className="hidden items-center gap-2 md:ml-auto md:flex"></div>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Agent Informations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-12">
                <div className="col-span-12 md:col-span-6 flex flex-col">
                  <div className="mb-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Agent name</FormLabel>
                          <FormControl>
                            <Input id="name" type="text" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="mb-2">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Agent phone</FormLabel>
                          <FormControl>
                            <Input id="phone" type="text" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="mb-2">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Agent email</FormLabel>
                          <FormControl>
                            <Input id="email" type="text" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="mb-2">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Agent password</FormLabel>
                          <Input id="password" type="text" {...field} />
                          <FormControl></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="mb-2">
                    <FormField
                      control={form.control}
                      name="repeat_password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Agent repeat password</FormLabel>
                          <Input id="repeat_password" type="text" {...field} />
                          <FormControl></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="mb-2">
                    <FormField
                      control={form.control}
                      name="role_id"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Agent role</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder={`Select a Role`} />
                            </SelectTrigger>
                            <SelectContent>{roles.length > 0 ? roles.map((role: any, key: number) => <SelectItem key={key} value={role.id}>{role.title}</SelectItem>) : null}</SelectContent>
                          </Select>
                          <FormControl></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="col-span-12 md:col-span-6"></div>
              </div>
            </CardContent>
          </Card>
          <Button type="submit" disabled={loading || submitLoading}>
            {submitLoading ? <Spinner></Spinner> : <></>} Save Agent
          </Button>
        </form>
      </Form>
    </>
  );

  // return loading ? (
  //   <div></div>
  // ) : (
  // );
}

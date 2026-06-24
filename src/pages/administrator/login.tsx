import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ToastAction } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toaster";
import { useAdminState } from "@/providers/adminContext";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { useToast } from "@/hooks/use-toast";
import adminRepository from "@/repositories/admin/adminRepository";


export default function AdministratorLogin() {
  // const {can ,canAny , updatePermissions } = useGlobalState();
  const { token, init } = useAdminState();

  let navigate = useNavigate();

  const { toast } = useToast();

  const passwordValiationSchema = z
    .string()
    .min(6, { message: "Password must be at least 8 characters long" })
    .max(50, { message: "Password cannot exceed 50 characters" });

  const formSchema = z.object({
    email: z.string().trim().email({ message: "Invalid email format" }).min(5, { message: "Email must be at least 5 characters long" }).max(50, { message: "Email cannot exceed 50 characters" }),
    password: passwordValiationSchema,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = await adminRepository.adminLogin(values);
    if (response.success) {
      token.set(response.data.token);

      axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
      Cookies.set("ad_token", response.data.token);
      Cookies.set("props_token", response.data.props_db);
      toast({
        variant: "default",
        duration: 800,
        className: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
        title: "Admin Successfully Logged-in",
        action: <ToastAction altText="close">close</ToastAction>,
      });

      init();
      navigate("/administrator", { replace: true });
    }
    else {

      toast({
        variant: "destructive",
        duration: 2000,
        title: response.message,
        action: <ToastAction altText="close">close</ToastAction>,
      });
    }
  };

  return (
    <main className="payment-main py-8 h-screen">
      <div className="flex justify-items-center gap-6 my-8 mx-10">
          <Card className="mx-auto p-6 w-[30%]">
            <CardContent className="flex flex-col p-0">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="grid grid-cols-12">
                    <div className="col-span-12 md:col-span-12 flex flex-col">
                      <div className="mb-2">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input id="email" type="text" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="mb-4">
                        <FormField
                          control={form.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Password</FormLabel>
                              <FormControl>
                                <Input id="password" type="password" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div>
                        <Button type="submit">Login</Button>
                      </div>
                    </div>
                  </div>
                </form>
              </Form>

              <div className="flex flex-col space-y-2">
                {/* <Button variant={"outline"}>Login with Google</Button> */}
                {/* <Button
                  onClick={() => {
                    // navigate("/login?token=b1212laxk123blaxk1233&redirectTo=company", { replace: true }), login();
                  }}
                  variant={"outline"}
                >
                  Login with supertoken
                </Button> */}
              </div>
            </CardContent>
          </Card>
      </div>
      <div className="flex flex-col "></div>
      <Toaster />

    </main>
  );
}

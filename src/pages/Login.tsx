// import { useGlobalState } from "@/providers/globalContext";
import VziteLogo from "@/assets/vzite.svg";
import { Input } from "@/components/ui/input";
import { ToastAction } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toaster";
import { useGlobalState } from "@/providers/globalContext";
import companyAuthRepository from "@/repositories/company/companyAuthRepository";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useToast } from "@/hooks/use-toast";
import LoginScreen from '@/assets/login image.jpg';
import GooglePlayBadge from '@/assets/googleplay.png';
import AppStoreBadge from '@/assets/appstore.png';


export default function CompanyLogin() {
  // const {can ,canAny , updatePermissions } = useGlobalState();
  const { permissions, token, init } = useGlobalState();
  const [isLoading, setIsLoading] = useState(false);
  let { search } = useLocation();
  let navigate = useNavigate();

  const { toast } = useToast();


  const appStoreUrl = import.meta.env.VITE_APPSTORE_APP_URL;
  const playStoreUrl = import.meta.env.VITE_GOOGLE_PLAY_APP_URL;



  const query = new URLSearchParams(search);

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
    mode: "onChange",
  });

  const loginViaSuperToken = async () => {
    const qToken = query.get("token")!;
    const email = query.get('email')!;
    const data = {
      email,
      token: qToken
    }
    if (qToken && email) {
      const response = await companyAuthRepository.companyLoginBySupertoken(data);
      if (response.success) {
        permissions.set(response.data.permissions);
        token.set(response.data.token);

        axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
        Cookies.set("token", response.data.token);
        init();
        let redirectTo = '/company/module/deal_4266/kanban';
        if (response.data.is_admin) {
          redirectTo = '/company/module/management_5873/kanban';
        }
        navigate(redirectTo, { replace: true });
      }
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    const response = await companyAuthRepository.companyLogin(values);
    if (response.success) {
      permissions.set(response.data.permissions);
      token.set(response.data.token);

      axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
      Cookies.set("token", response.data.token);
      toast({
        variant: "default",
        duration: 800,
        className: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
        title: "Agent Successfully Logged-in",
        action: <ToastAction altText="close">close</ToastAction>,
      });

      init();

      let redirectTo = '/company/module/deal_4266/kanban';
      if (response.data.is_admin) {
        redirectTo = '/company/module/management_5873/kanban';
      }
      navigate(redirectTo, { replace: true });
    }
    else {

      toast({
        variant: "destructive",
        duration: 2000,
        title: response.message,
        action: <ToastAction altText="close">close</ToastAction>,
      });
    }

    setIsLoading(false)
  };
  useEffect(() => {
    loginViaSuperToken();
  }, []);

  return (
    <main className="h-screen">
      <div className="hidden md:flex grid grid-cols-12 gap-6 h-full">
        <div className="col-span-0 md:col-span-7 h-full">
          <img src={LoginScreen} alt="" className="h-full" />
        </div>
        <div className="col-span-12 md:col-span-5">
          <div className="flex justify-center">
            <Link to={"/"} className="my-8">
              <img src={VziteLogo} alt="Vzite" title="Vzite" width={140} height={22} />
            </Link>
          </div>
          <div className="flex-col space-y-6 my-10 me-4">
            <div className="">
              <div className="text-2xl  font-bold" >Login To Your Account</div>
              <p className="text-gray-500 dark:text-gray-400">Enter your email below to login to your account</p>
            </div>
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
                      <Button type="submit" disabled={isLoading || !form.formState.isValid} >
                        {isLoading ? <Spinner></Spinner> : <></>}
                        Login
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>


      <div className="flex md:hidden flex-col items-center justify-center space-y-6 px-6 flex-1">
        <Link to={"/"} className="my-8">
          <img src={VziteLogo} alt="Vzite" title="Vzite" width={140} height={22} />
        </Link>
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-bold">Download Our App</h2>
          <p className="text-muted-foreground text-lg">Get the best experience with our mobile app</p>
        </div>

        <div className="flex flex-col gap-4 w-full max-w-xs items-center">
          {/* App Store Button */}
          <a
            href={appStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block transition-transform hover:scale-105"
          >
            <img src={AppStoreBadge} alt="Download on the App Store" className="w-[160px] h-auto" />
          </a>

          {/* Google Play Button */}
          <a
            href={playStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block transition-transform hover:scale-105"
          >
            <img src={GooglePlayBadge} alt="Get it on Google Play" className="w-[180px] h-auto" />
          </a>
        </div>
      </div>
      <Toaster />

    </main>
  );
}

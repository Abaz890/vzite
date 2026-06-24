import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useGlobalState } from "@/providers/globalContext";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { debounce } from "@/lib/utils";
import settingsRepository from "@/repositories/settingsRepository";


export default function CompanySettings() {


    const { settings, globalStateLoading } = useGlobalState();
    const [isLoading, setIsLoading] = useState(false);

    const formSchema = z.object({
        pfUrl: z.string(),
        bayutUrl: z.string(),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            pfUrl: "",
            bayutUrl: "",
        },
        mode: "onChange",
    });

    const handleUpdateSetting = async (values: any) => {

        setIsLoading(true);
        const response = await settingsRepository.updateSetting(values);
        if(response.success){
            settings.set(response.data)
        }
        setIsLoading(false);
    }

    useEffect(() => {
        const debouncedUpdateSetting = debounce((values) => {
            handleUpdateSetting(values);
        }, 1000);

        const subscription = form.watch((values) => {
            debouncedUpdateSetting(values);
        });
        return () => {
            subscription.unsubscribe();
        };

    }, [form.watch]);

    useEffect(() => {
        if (!globalStateLoading) {
            Object.keys(settings.list).map((setting: any) => {
                form.setValue(setting, settings.list[setting]);
            })
        }
    }, [globalStateLoading]);

    return (
        <Card>
            <CardHeader className="pb-4">
                <div className="mb-2">
                    <h1 className="font-semibold tracking-tight">Company Settings</h1>
                    <p className="text-muted-foreground mt-2">
                        Manage Company Settings
                    </p>
                </div>
            </CardHeader>
            <CardContent>

                <Form {...form}>
                    <form>
                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-12 md:col-span-6 flex flex-col">
                                <div className="mb-2">
                                    <FormField
                                        control={form.control}
                                        name="pfUrl"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Property Finder Url</FormLabel>
                                                <FormControl>
                                                    <Input id="pfUrl" type="text" placeholder="Enter Your Property Finder Agency Url" disabled={isLoading} {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-6 flex flex-col">
                                <div className="mb-4">
                                    <FormField
                                        control={form.control}
                                        name="bayutUrl"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Bayut Url</FormLabel>
                                                <FormControl>
                                                    <Input id="bayutUrl" type="text" placeholder="Enter Your Bayut Agency Url" disabled={isLoading} {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

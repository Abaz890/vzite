import { useEffect, useState } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Facebook, } from "lucide-react"
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";


export default function CompanyMarketingList() {



    let navigate = useNavigate();

    const [marketingSections,] = useState<any[]>([
        {
            id: "facebook_instant_forms",
            name: "Facebook Instant Froms",
            description: "Connect your Facebook pages to sync leads and manage social media interactions",
            icon: <Facebook className="h-6 w-6" />,
            route: '/company/marketing/facebook/instant-forms/list'
        },
    ])

    const fetchItems = async () => {


    };

    useEffect(() => {
        fetchItems();
    }, []);


    return (
        <div className="">
            <div className="mb-8">
                <h1 className="font-semibold tracking-tight">Marketing</h1>
                <p className="text-muted-foreground mt-2">
                    Marketing Description
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {marketingSections.map((marketingSection) => {
                    return (
                        <Card key={marketingSection.id} className=" ">
                            <CardHeader className="pb-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-muted rounded-lg">{marketingSection.icon}</div>
                                        <div>
                                            <CardTitle className="text-xl">{marketingSection.name}</CardTitle>
                                            <CardDescription className="mt-1">{marketingSection.description}</CardDescription>
                                        </div>
                                    </div>
                                    <Button variant="default" onClick={() => { navigate(marketingSection.route) }} >
                                        Manage
                                    </Button>
                                </div>


                            </CardHeader>
                        </Card>
                    )
                })}
            </div>


        </div >
    )
}

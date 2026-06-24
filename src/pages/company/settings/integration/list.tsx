import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Facebook, Loader2 } from "lucide-react"
import companyIntegrationRepository from "@/repositories/company/companyIntegrationRepository";
import { useGlobalState } from "@/providers/globalContext";


export default function CompanyIntegrationList() {


    const { company } = useGlobalState();

    const [integrations, setIntegrations] = useState<any[]>([
        {
            id: "facebook",
            name: "Facebook",
            description: "Connect your Facebook pages to sync leads and manage social media interactions",
            icon: <Facebook className="h-6 w-6" />,
            isConnected: company.value.facebook_integrated,
        },
        {
            id: "bayut",
            name: "Bayut",
            description: "Connect your Bayut account to sync leads",
            icon: <Facebook className="h-6 w-6" />,
            isConnected: false,
        }
    ])

    const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({})



    const handleConnect = async (integrationId: string) => {
        setLoadingStates((prev) => ({ ...prev, [integrationId]: true }))

        if (integrationId === 'facebook') {

            const response = await companyIntegrationRepository.getFacebookUrl();
            if (response.success) {
                window.location.href = response.data.redirect_url;
            }
        }

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 2000));

    }

    const handleDisconnect = async (integrationId: string) => {
        setLoadingStates((prev) => ({ ...prev, [integrationId]: true }))

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        setIntegrations((prev) =>
            prev.map((integration) =>
                integration.id === integrationId
                    ? {
                        ...integration,
                        isConnected: false,
                        status: undefined,
                        metadata: undefined,
                    }
                    : integration,
            ),
        )

        setLoadingStates((prev) => ({ ...prev, [integrationId]: false }))
    }

    const fetchItems = async () => {


    };

    useEffect(() => {
        fetchItems();
    }, []);


    return (
        <div className="">
            <div className="mb-2">
                <h1 className="font-semibold tracking-tight">Integrations</h1>
                <p className="text-muted-foreground mt-2">
                    Connect your CRM with external services to streamline your workflow and enhance productivity.
                </p>
            </div>


            <div className="grid gap-6 md:grid-cols-2">
                {integrations.map((integration) => {
                    const isLoading = loadingStates[integration.id] || false

                    return (
                        <Card key={integration.id} className=" ">
                            <CardHeader className="pb-4"> 
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-muted rounded-lg">{integration.icon}</div>
                                        <div>
                                            <CardTitle className="text-xl">{integration.name}</CardTitle>
                                            <CardDescription className="mt-1">{integration.description}</CardDescription>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 flex-wrap">
                                        {integration.status && (integration.status)}
                                        {integration.isConnected && integration.metadata?.pages && (
                                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                                {integration.metadata.pages} pages
                                            </Badge>
                                        )}
                                        {integration.isConnected ? (
                                            <Button
                                                variant="outline"
                                                onClick={() => handleDisconnect(integration.id)}
                                                disabled={isLoading || integration.isConnected}
                                                className="text-red-600 hover:text-red-700 hover:bg-red-50 disabled:opacity-50"
                                        >
                                                {isLoading ? (
                                                    <>
                                                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                                        Disconnecting...
                                                    </>
                                                ) : (
                                                    "Disconnect"
                                                )}
                                            </Button>
                                        ) : (
                                            <Button
                                                onClick={() => handleConnect(integration.id)}
                                                disabled={isLoading}
                                                className="disabled:opacity-50"
                                            >
                                                {isLoading ? (
                                                    <>
                                                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                                        Connecting...
                                                    </>
                                                ) : (
                                                    "Connect"
                                                )}
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </CardHeader>
                        </Card>
                    )
                })}
            </div>


        </div>
    )
}

import { Grid, List } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { useGlobalState } from "@/providers/globalContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";



export default function PropertyTab({ dashboard, property_type }: { dashboard: string, property_type: string }) {



    let navigate = useNavigate();
    const { darkMode } = useGlobalState();
    const [tab, setTab] = useState('list');


    const handleActiveViewChange = function (value: string) {
        setTab(value);
        navigate(`/${dashboard}/${property_type}/${value}`);
    };


    return (
        <Tabs defaultValue={tab} value={tab} onValueChange={(value) => handleActiveViewChange(value)}>
            <TabsList className="bg-gray-100/10 p-1 rounded-md py-5">
                <TabsTrigger className={`${darkMode.value ? "data-[state=active]:bg-transparent data-[state=active]:border-gray-300 data-[state=active]:border-b-2 text-white data-[state=active]:text-white rounded-none" : ""} p-5 h-1 gap-1`} value="list">
                    <List />
                </TabsTrigger>
                <TabsTrigger className={`${darkMode.value ? "data-[state=active]:bg-transparent data-[state=active]:border-gray-300 data-[state=active]:border-b-2 text-white data-[state=active]:text-white rounded-none" : ""} p-5 h-1 gap-1`} value="grid">
                    <Grid />
                </TabsTrigger>
            </TabsList>
        </Tabs>
    )

}
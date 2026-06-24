import { PlusCircle } from "lucide-react"
import { Button } from '@/components/ui/button';
import { useNavigate } from "react-router-dom";
import { useGlobalState } from '@/providers/globalContext';
export default function CompanyActions({ section_title, section_name }: { section_title: string, section_name: string }) {

    let navigate = useNavigate();
    const { permissions, darkMode } = useGlobalState();

    return (
        <div className="flex justify-between mb-5">
            <div className={`${darkMode.value ? "text-white" : ""} capitalize font-normal text-3xl`}>
                {section_title}
            </div>
            <div className="flex gap-2">
                {
                    permissions.can(`add_${section_name}`) ?
                        <Button size="sm" onClick={() => { navigate(`/company/${section_name}/add`) }} className="h-8 gap-1">
                            <PlusCircle className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                Add {section_name}
                            </span>
                        </Button>
                        : <></>
                }
            </div>
        </div>

    );
}

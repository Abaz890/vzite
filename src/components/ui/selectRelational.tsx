import companyModuleRepository from "@/repositories/company/companyModuleRepository";
import { Plus } from "lucide-react";
import { Button } from "./button"
import { useNavigate } from "react-router-dom";
import { useGlobalState } from '@/providers/globalContext';
import { SelectDynamic } from "./selectDynamic";
import { useEffect, useState } from "react";

interface SelectRelationalProps {
    title: string;
    name: string;
    relatedModule: { title: string, name: string, permalink: string; primary_field: string | number; isQuickCreateEnabled: boolean; };
    enableAddRelatedItems: boolean,
    defaultValue?: { label: string, value: string } | undefined,
    onChange: (value: string) => void
    disabled?: boolean
}


export function SelectRelational({ title, relatedModule, enableAddRelatedItems, defaultValue, onChange, disabled }: SelectRelationalProps) {

    let navigate = useNavigate(); 
    const { permissions,modalRefs } = useGlobalState();
    const [val, setVal] = useState(defaultValue)

    const fetchModuleItems = async (page: number, query: string,) => {
        const response = await companyModuleRepository.getModuleSelectRelationalValues(relatedModule.permalink, page, query);
        return {
            data: response.success ? response.data.data.map((item: any) => ({ id: item.id, label:`${item[relatedModule.primary_field] ?? '(empty)'}`, value: item.id.toString(), })) : [],
            lastPage: response.success ? response.data.last_page : 1,
        };
    }

    const handleAddRelatedItemClicked = (module: any) => {
        if (module.isQuickCreateEnabled) {
            
            let isAddRelatedModule = false
            if(modalRefs.addModalRef?.current.isOpen){ 
                // isAddRelatedModule = false;
                modalRefs.addModalRef?.current.closeModal()
            }
            modalRefs.addModalRef?.current.toggleModal(isAddRelatedModule, module);
        }
        else {
            navigate(`/company/module/${module.permalink}/create`);
        }
    }

    const handleRelatedItemAdded = function (e: any) { 
        if(relatedModule.name === e.detail.module){
            onChange(e.detail.id)
            console.log(e.detail)
            setVal({label:e.detail.label,value:e.detail.id})
        } 
    }

    useEffect(() => {

        window.addEventListener("itemAdded", handleRelatedItemAdded);
        return () => {
            window.removeEventListener("itemAdded", handleRelatedItemAdded);
        }

    }, [])

    return <div className="grid grid-cols-8" >
        <div className="col-span-7">
            <SelectDynamic
                name={title}
                field={{ value: val ? val.value : '' }}
                defaultValue={val ? { label: val.label, value: val.value } : undefined}
                onChange={(value) => {
                    onChange(value)
                    setVal({ label: `select ${title}`, value })
                }}
                fetchOptions={async (page, query) => await fetchModuleItems(page, query)}
                disabled={disabled}
            />
        </div>
        <div className="col-span-1">
            {
                enableAddRelatedItems ?
                    permissions.can(`${relatedModule.name}_add_item`) ?
                        <Button type='button' onClick={() => handleAddRelatedItemClicked(relatedModule)} className='mx-2 px-3' disabled={disabled}><Plus></Plus></Button>
                        : <></>
                    : <></>
            }
        </div>


    </div>
}
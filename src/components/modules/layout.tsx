import { AddItemModal, AddItemModalRef } from '@/components/addItemModal';
import ModuleActions from '@/components/modules/actions';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayoutCompany';
import companyModuleRepository from '@/repositories/company/companyModuleRepository';
import { useEffect, useRef } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { EditItemModal, EditItemModalRef } from '@/components/edititemModal';
import { DeleteItemModal, DeleteItemModalRef } from '@/components/deleteItemModal';
import { useLocation } from 'react-router-dom';
import { useGlobalState } from "@/providers/globalContext";
import { SkeletonAction } from '../skeletonAction';
import { useModuleState } from '@/providers/moduleContext';

export default function CompanyModuleLayout() {

    const addModalRef = useRef<AddItemModalRef>(null)
    const editModalRef = useRef<EditItemModalRef>(null)
    const deleteModalRef = useRef<DeleteItemModalRef>(null)

    let params = useParams();
    const location = useLocation();
    const { globalStateLoading, setGlobalModalRefs } = useGlobalState();
    const { isModuleLoading, isModuleItemsLoading, allowedActionRoutes, setModule, clearModule } = useModuleState()
    const module_id = params.module_id;

    const fetchModuleDetails = async () => {

        try {
            clearModule()
            const moduleResponse: any = await companyModuleRepository.getModuleDetails(module_id!);
            if (moduleResponse.success) {
                console.log('fetching and setting module details')
                setModule(moduleResponse.data, module_id!)
            }

        } catch (err) {
            console.log(err)
        }
        finally {
        }
    };

    useEffect(() => {
        if (!globalStateLoading) {
            isModuleItemsLoading.set(true);
            console.log('am inside module_id changed from params')
            clearModule();
            isModuleLoading.set(true);
            fetchModuleDetails();

        }
    }, [module_id, globalStateLoading]);

    const handleItemAdded = (module: string, id: number, label: string) => {
        // 
        const event = new CustomEvent('itemAdded', { detail: { module, id, label } });
        window.dispatchEvent(event);
    }


    const handleItemEdited = () => {
        // 
        const event = new CustomEvent('itemUpdated', {});
        window.dispatchEvent(event);
    }

    const handleRefresh = () => {
        const event = new CustomEvent('itemsRefresh', {});
        window.dispatchEvent(event);
    }

    useEffect(() => {
        setGlobalModalRefs({
            addModalRef,
            editModalRef,
            deleteModalRef,
        });
    }, [])

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">List</h2>}>
            {
                isModuleLoading.value ? <SkeletonAction></SkeletonAction> : allowedActionRoutes.value.includes(location.pathname) ? <ModuleActions add_modal_ref={addModalRef} onRefresh={() => { handleRefresh(); }} /> : <></>
            }
            {
                isModuleLoading.value ? <></> :
                    <Outlet key={module_id} context={{ add_moduel_item_ref: { addModalRef }, edit_moduel_item_ref: { editModalRef }, delete_moduel_item_ref: { deleteModalRef } }} />
            }
            <AddItemModal ref={addModalRef} onSubmit={handleItemAdded}></AddItemModal>
            <EditItemModal ref={editModalRef} onSubmit={handleItemEdited}></EditItemModal>
            <DeleteItemModal ref={deleteModalRef} onSubmit={handleItemEdited}></DeleteItemModal>
        </AuthenticatedLayout>
    )

}
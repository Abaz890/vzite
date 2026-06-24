import { usePropertyState } from '@/providers/propertyContext';
import { useEffect, useRef } from 'react';
import { PresentationModal, PresentationModalRef } from '@/components/presentationModal';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayoutCompany';
import { Outlet } from 'react-router-dom';
import { DeleteConfirmationModal, DeleteConfirmationModalRef } from '@/components/deleteConfirmationDialog';
import { useGlobalState } from '@/providers/globalContext';

export default function CompanyLayout({ section_name }: { section_name: string }) {

    const presentationModalRef = useRef<PresentationModalRef>(null)
    const deleteModalRef = useRef<DeleteConfirmationModalRef>(null)
    const { setModalRefs } = usePropertyState();
    const { setGlobalModalRefs } = useGlobalState();
    useEffect(() => {
        setModalRefs({
            presentationModalRef
        });
        setGlobalModalRefs({
            deleteModalRef
        })
    }, [])

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {section_name}
                </h2>
            }
        >
            <Outlet />
            <PresentationModal ref={presentationModalRef} />
            <DeleteConfirmationModal ref={deleteModalRef} onSubmit={()=>{}} />
        
        </AuthenticatedLayout>
    )

}
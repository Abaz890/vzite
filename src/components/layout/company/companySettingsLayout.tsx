import { usePropertyState } from '@/providers/propertyContext';
import { useEffect, useRef } from 'react';
import { PresentationModalRef } from '@/components/presentationModal';
import { DeleteConfirmationModalRef } from '@/components/deleteConfirmationDialog';
import { useGlobalState } from '@/providers/globalContext';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

export default function CompanySettingsLayout({ children }: { children: React.ReactNode }) {

    const presentationModalRef = useRef<PresentationModalRef>(null)
    const deleteModalRef = useRef<DeleteConfirmationModalRef>(null)
    const { setModalRefs } = usePropertyState();
    const { setGlobalModalRefs } = useGlobalState();
    const { pathname } = useLocation();
    useEffect(() => {
        setModalRefs({
            presentationModalRef
        });
        setGlobalModalRefs({
            deleteModalRef
        })
    }, []);

    const currentPath = pathname;

    const sidebarNavItems = [
        {
            title: 'Company',
            href: '/company/settings/',
            icon: null,
        },
        {
            title: 'Integration',
            href: '/company/settings/integration/list',
            icon: null,
        }
    ];

    return (

        <div className=""> 
            <div className="mb-8">
                <h1 className="font-semibold tracking-tight">Settings</h1>
                <p className="text-muted-foreground mt-2">
                    Connect your CRM with external services to streamline your workflow and enhance productivity.
                </p>
            </div>
            <div className="px-4 py-6">
                <div className="flex flex-col lg:flex-row lg:space-x-12">
                    <aside className="w-full max-w-xl lg:w-48">
                        <nav className="flex flex-col space-y-1 space-x-0">
                            {sidebarNavItems.map((item, index) => (
                                <Button
                                    key={index}
                                    size="sm"
                                    variant={currentPath === item.href ? "default" : "outline"}
                                    asChild
                                    className={cn('w-full justify-start',)}
                                >
                                    <Link to={item.href}>
                                        {item.title}
                                    </Link>
                                </Button>
                            ))}
                        </nav>
                    </aside>
                    <Separator className="my-6 lg:hidden" />

                    <div className="flex-1 !ms-6">
                        {children}
                    </div>
                </div>
            </div>
        </div>

    )
}
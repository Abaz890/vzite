import AuthenticatedLayoutAdmin from "@/layouts/AuthenticatedLayoutAdmin";
import {
    ChevronLeft, 
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent, 
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FormEventHandler, useState, } from "react";
import { useNavigate } from "react-router-dom";
import adminCompanyRepository from "@/repositories/admin/adminCompanyRepository";
import { toast } from "sonner";
export default function CompanyAdd() {

    let navigate = useNavigate();

    interface FormData {
        name: string;
        owner_name: string;
        owner_email: any;
        owner_phone: string;
        owner_password: string;
    }
    const [formData, setFormData] = useState<FormData>(
        {
            name: '',
            owner_name: '',
            owner_email: '',
            owner_phone: '',
            owner_password: '',
        }
    );

    const handleChange = (field: keyof FormData, value: string) => {
        setFormData(prevData => {
            if (!prevData) return prevData;

            const newData = { ...prevData };
            (newData as FormData)[field] = value;

            return newData;
        });
    };



    // const { data, setData, post, processing, errors, reset } = useForm({
    // });


    const submit: FormEventHandler = async (e) => {
        e.preventDefault();
        const response = await adminCompanyRepository.saveModule(formData);
        if (response.success) {
            toast(response.message)
            navigate('/administrator/companies')
        }
        // post(route('administrator.companies.store'));
    };

    return (
        <AuthenticatedLayoutAdmin
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Add Company
                </h2>
            }
        >
            <form onSubmit={submit}>
                <div className="grid max-w-full flex-1 auto-rows-max gap-4">
                    <div className="flex items-center gap-4">
                        <Button type="button" variant="outline" size="icon" onClick={() => navigate('/administrator/companies')} className="h-7 w-7">
                            <ChevronLeft className="h-4 w-4" />
                            <span className="sr-only">Back</span>
                        </Button>
                        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                            Add Company
                        </h1>
                        <div className="hidden items-center gap-2 md:ml-auto md:flex">
                            <Button type="submit" size="sm">Save Company</Button>
                        </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-4 lg:gap-8">
                        <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                            <Card x-chunk="dashboard-07-chunk-0">
                                <CardHeader>
                                    <CardTitle>Company Admin Details</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-6">
                                        <div className="grid gap-3">
                                            <Label htmlFor="name">Owner Name</Label>
                                            <Input
                                                type="text"
                                                className="w-full"
                                                value={formData.owner_name}
                                                onChange={(e) => handleChange('owner_name', e.target.value)}
                                            />
                                        </div>
                                        <div className="grid gap-3">
                                            <Label htmlFor="name">Owner Email</Label>
                                            <Input
                                                type="text"
                                                className="w-full"
                                                value={formData.owner_email}
                                                onChange={(e) => handleChange('owner_email', e.target.value)}
                                            />
                                        </div>
                                        <div className="grid gap-3">
                                            <Label htmlFor="name">Owner Phone</Label>
                                            <Input
                                                type="text"
                                                className="w-full"
                                                value={formData.owner_phone}
                                                onChange={(e) => handleChange('owner_phone', e.target.value)}
                                            />
                                        </div>
                                        <div className="grid gap-3">
                                            <Label htmlFor="name">Password</Label>
                                            <Input
                                                type="password"
                                                className="w-full"
                                                value={formData.owner_password}
                                                onChange={(e) => handleChange('owner_password', e.target.value)}
                                                autoComplete="true"
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>


                        <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                            <Card x-chunk="dashboard-07-chunk-0">
                                <CardHeader>
                                    <CardTitle>Company Details</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-6">
                                        <div className="grid gap-3">
                                            <Label htmlFor="name">Name</Label>
                                            <Input
                                                id="name"
                                                type="text"
                                                className="w-full"
                                                value={formData.name}
                                                onChange={(e) => handleChange('name', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                    </div>
                    <div className="flex items-center justify-center gap-2 md:hidden">
                        <Button type="button" variant="outline" size="sm">
                            Discard
                        </Button>
                        <Button type="submit" size="sm">Save Company</Button>
                    </div>

                </div>
            </form>
        </AuthenticatedLayoutAdmin>
    )
}
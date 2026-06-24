// import {  useEffect, FormEventHandler, } from 'react'
// import { Button } from "@/components/ui/button"
// import { useNavigate, useOutletContext } from "react-router-dom";
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { ChevronLeft } from 'lucide-react';
// import { Label } from '@/components/ui/label';
// import { Input } from '@/components/ui/input';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
// // import { useToast } from "@/hooks/use-toast";
// // import { Spinner } from '@/components/ui/spinner'
// // import companyModuleRepository from "@/repositories/company/companyModuleRepository"
// // import { ToastAction } from '@/components/ui/toast';
// // import { ModuleField } from '@/components/moduleField'

// export default function PropertyAdd() {

//     // interface FormData {
//     //     [key: string]: string;
//     // }

//     let navigate = useNavigate();
//     // const { toast } = useToast();
//     const context: any = useOutletContext();
//     const { module_id, module_name, } = context;
//     // const [isLoading, setIsLoading] = useState(false);
//     // const [, setIsError] = useState(false);
//     // const [grouped_modules_fields, setGroupedModulesFields] = useState<any>();
//     // const [formData, setFormData] = useState<FormData>({});

//     const fetchModuleData = async function () {
//         // const fieldsResponse = await companyModuleRepository.getModuleFieldsGrouped(module_id);
//         // if (fieldsResponse.success) {
//         //     const fields = fieldsResponse.data;
//         //     setGroupedModulesFields(fields)
//         // }
//         // else {
//         //     setIsError(true);
//         // }
//         // setIsLoading(false);
//     }

//     useEffect(() => {
//         fetchModuleData();
//     }, []);

//     useEffect(() => {
//         fetchModuleData();
//     }, [module_id]);


//     const submit: FormEventHandler = async (e) => {
//         e.preventDefault();

//         // modules_fields.  
//         // const response = await companyModuleRepository.saveModuleItem(module_id, formData);
//         // if (response.success) {
//         //     toast({
//         //         variant: "default",
//         //         duration: 800,
// className: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
//         //         title: "data items successfully imported",
//         //         action: <ToastAction altText="close">close</ToastAction>,
//         //     })
//         //     navigate(`/company/module/${module_id}/${default_view}`)
//         // }
//     }

//     return (
//         <form onSubmit={submit} className='flex flex-col' >
//             <div className="grid max-w-full flex-1 auto-rows-max gap-4 mb-2">
//                 <div className="flex items-center gap-4">
//                     <Button type="button" variant="outline" size="icon" onClick={() => navigate('/administrator/companies')} className="h-7 w-7">
//                         <ChevronLeft className="h-4 w-4" />
//                         <span className="sr-only">Back</span>
//                     </Button>
//                     <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0 text-white">
//                         Add {module_name}
//                     </h1>
//                     <div className="hidden items-center gap-2 md:ml-auto md:flex">
//                         {/* <Button disabled={isLoading} type="submit" size="sm" >
//                             {
//                                 isLoading ? <Spinner></Spinner> : <></>
//                             }
//                             Add {module_name}
//                         </Button> */}
//                     </div>
//                 </div>
//             </div>
//             <div className="grid gap-4 py-4">
//                 <Card>
//                     <CardHeader>
//                         <CardTitle>
//                             <div>
//                                 Property Type
//                             </div>
//                         </CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                         <div className="grid gap-6 grid-cols-12">
//                             <div className="grid gap-3 col-span-6">
//                                 <Label>Property type</Label>
//                                 <Select onValueChange={(e) => console.log('changed',e)} >
//                                     <SelectTrigger className="col-span-3">
//                                         <SelectValue placeholder={`Select Property type`} />
//                                     </SelectTrigger>
//                                     <SelectContent>
//                                         <SelectItem value='Apartment'>Apartment</SelectItem>
//                                     </SelectContent>
//                                 </Select>
//                             </div>
//                             <div className="grid gap-3 col-span-6">
//                                 <Label> Built-up area</Label>
//                                 <Input className="col-span-3" onChange={(e) => console.log('changed',e)} />
//                             </div>
//                             <div className="grid gap-3 col-span-6">
//                                 <Label>No of Bedroom</Label>
//                                 <Select onValueChange={(e) => console.log('changed',e)} >
//                                     <SelectTrigger className="col-span-3">
//                                         <SelectValue placeholder={`Select No of Bedroom`} />
//                                     </SelectTrigger>
//                                     <SelectContent>
//                                         <SelectItem value='sudio'>Studio</SelectItem>
//                                         <SelectItem value='1'>1</SelectItem>
//                                         <SelectItem value='2'>2</SelectItem>
//                                     </SelectContent>
//                                 </Select>
//                             </div>
//                             <div className="grid gap-3 col-span-6">
//                                 <Label>No of Bathrooms</Label>
//                                 <Select onValueChange={(e) => console.log('changed',e)} >
//                                     <SelectTrigger className="col-span-3">
//                                         <SelectValue placeholder={`Select No of Bathrooms`} />
//                                     </SelectTrigger>
//                                     <SelectContent>
//                                         <SelectItem value='1'>1</SelectItem>
//                                         <SelectItem value='2'>2</SelectItem>
//                                     </SelectContent>
//                                 </Select>
//                             </div>
//                             <RadioGroup defaultValue="unfurnished" className='grid grid-cols-12 gap-3 col-span-12 '>
//                                 <div className="col-span-6">
//                                     <RadioGroupItem id="unfurnished" value='unfurnished' />
//                                     <Label className='mx-1' htmlFor="option-two">Unfurnished</Label>
//                                 </div>
//                                 <div className="col-span-6">
//                                     <RadioGroupItem id="furnished" value='furnished' />
//                                     <Label className='mx-1' htmlFor="option-two">Furnished</Label>
//                                 </div>
//                             </RadioGroup>


//                             <div className="grid gap-3 col-span-6">
//                                 <Label>Location</Label>
//                                 <Select onValueChange={(e) => console.log('changed',e)} >
//                                     <SelectTrigger className="col-span-3">
//                                         <SelectValue placeholder={`Select Location`} />
//                                     </SelectTrigger>
//                                     <SelectContent>
//                                         <SelectItem value='sudio'>Studio</SelectItem>
//                                         <SelectItem value='1'>1</SelectItem>
//                                         <SelectItem value='2'>2</SelectItem>
//                                     </SelectContent>
//                                 </Select>
//                             </div>
//                             <div className="grid gap-3 col-span-6">
//                                 <Label>Building</Label>
//                                 <Select onValueChange={(e) => console.log('changed',e)} >
//                                     <SelectTrigger className="col-span-3">
//                                         <SelectValue placeholder={`Select Building`} />
//                                     </SelectTrigger>
//                                     <SelectContent>
//                                         <SelectItem value='1'>1</SelectItem>
//                                         <SelectItem value='2'>2</SelectItem>
//                                     </SelectContent>
//                                 </Select>
//                             </div>
//                             <div className="grid gap-3 col-span-6">
//                                 <Label> Unit No</Label>
//                                 <Input className="col-span-3" onChange={(e) => console.log('changed',e)} />
//                             </div>
//                             <div className="grid gap-3 col-span-6">
//                                 <Label>Completion State</Label>
//                                 <Select onValueChange={(e) => console.log('changed',e)} >
//                                     <SelectTrigger className="col-span-3">
//                                         <SelectValue placeholder={`Select Completion State`} />
//                                     </SelectTrigger>
//                                     <SelectContent>
//                                         <SelectItem value='ready'>Ready</SelectItem>
//                                         <SelectItem value='off_plan'>Off-Plan</SelectItem>
//                                     </SelectContent>
//                                 </Select>
//                             </div>
//                         </div>
//                     </CardContent>
//                 </Card>

//                 <Card>
//                     <CardHeader>
//                         <CardTitle>
//                             <div>
//                                 Property Pricing
//                             </div>
//                         </CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                         <RadioGroup className="grid grid-cols-12 gap-3">
//                             <Card className='col-span-2'>
//                                 <CardContent className='flex flex-col px-2'>
//                                     <div className="p-5">
//                                         Year
//                                     </div>
//                                     <div className="bg-gray-300 border-b-[3px] border-b-gray-500 p-2">
//                                         <div className="">Year</div>
//                                         <div className="flex items-end">
//                                             <Input className='border-0 shadow-none p-0' placeholder='AED'></Input>
//                                             <div className="mx-1">AED</div>
//                                         </div>
//                                     </div>
//                                 </CardContent>
//                             </Card>
//                         </RadioGroup>
//                     </CardContent>
//                 </Card>

//                 <div className="flex justify-end">
//                     <Button className='mx-4'>Previous</Button>
//                     <Button>Next</Button>
//                 </div>


//             </div>
//             {/* {
//                 isLoading ? <h4>loading</h4> :
//                     grouped_modules_fields ?
//                         <div className="grid gap-4 py-4">
//                             {grouped_modules_fields.map((group: { title: string, description: string, fields: any[] }, key: number) => (
//                             ))}

//                         </div>
//                     : <></>
//             } */}
//         </form>
//     );
// }
import AuthenticatedLayoutAdmin from "@/layouts/AuthenticatedLayoutAdmin";
import {
    ChevronLeft,
    Trash,
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
import { FormEventHandler, useEffect, useState, } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import settingsRepository from "@/repositories/settingsRepository";
import adminModuleRepository from "@/repositories/admin/adminModuleRepository";
import adminWorkflowRepository from "@/repositories/admin/adminWorkflowRepository";

export interface Condition {
    attribute: string;
    attribute_type: string,
    attribute_values: [],
    operator: string;
    value: string;
}

export interface Action {
    type: string;
    related_module: string;
    related_modules: [];
    related_module_fields: [];
    related_module_field_type: string,
    related_module_field_values: [],
    mapping: MappingItem[]
}

interface MappingItem {
    name: string;
    source: string;
    value: string;
    selected_related_module: string;
    related_modules?: [];
    related_module_fields?: Array<{ id: number; title: string; value: string }>;
}

export default function WorkflowAdd() {

    let navigate = useNavigate();

    interface FormData {
        name: string;
        description: string;
        event: string;
        module: string
    }

    const [formData, setFormData] = useState<FormData>(
        {
            name: '',
            description: '',
            event: '',
            module: ''
        }
    );

    const [conditions, setConditions] = useState<Condition[]>([]);
    const [actions, setActions] = useState<Action[]>([]);
    const [events, setEvents] = useState([]);
    const [moduleInputs, setModuleInputs] = useState([]);
    const [isMapAddModalOpen, setIsMapAddModalOpen] = useState(false);
    const [actionMapId, setActionMapId] = useState<number>();
    const [mapping, setMapping] = useState<MappingItem[]>([]);

    const actionTypes = [
        {
            name: 'add related item',
            value: 'add_related_item',
        },
        {
            name: 'update related item',
            value: 'update_related_item',
        },
        {
            name: 'send email',
            value: 'send_email'
        },
        {
            name: 'Set Reminder',
            value: 'set_reminder'

        }
    ];

    const fetchActiveModulesOptions = async () => {

        try {

            const response: any = await settingsRepository.getActiveModulesOptions();
            if (response.success) {

                const eventsArr: any = [];
                response.data.modules.map((module: { name: string; permalink: string }) => {
                    const moduleEvents = [
                        {
                            name: `${module.name} created`,
                            value: `${module.permalink}_created`
                        },
                        {
                            name: `${module.name} updated`,
                            value: `${module.permalink}_updated`
                        },
                        {
                            name: `${module.name} deleted`,
                            value: `${module.permalink}_deleted`
                        },
                    ];
                    eventsArr.push({ module: module.name, events: moduleEvents });

                })
                setEvents(eventsArr)
            }
        } catch (error) {
            console.error('Error fetching options:', error);
        }
    };

    const fetchSelectedModuleFields = async (module: string) => {
        const response: any = await adminModuleRepository.getModuleFields(module);
        if (response.success) {
            setModuleInputs(response.data);

        }
    }

    const handleChange = async (field: keyof FormData, value: string) => {
        setFormData(prevData => {
            if (!prevData) return prevData;
            const newData = { ...prevData };
            (newData as FormData)[field] = value;
            return newData;
        });

        //get field inputs
        if (field === 'event') {
            const module = value.replace(/_(?:created|deleted|updated)$/, '');
            fetchSelectedModuleFields(module);

            //set module
            setFormData(prevData => {
                if (!prevData) return prevData;
                const newData = { ...prevData };
                (newData as FormData)['module'] = module;
                return newData;
            });
        }
    };

    const submit: FormEventHandler = async (e) => {
        e.preventDefault();

        const newActions = actions.map(action => ({
            ...action,
            related_module_field_values: undefined,
            related_module_fields: undefined,
            related_modules: undefined,
        }));



        const newConditions = conditions.map(condition => ({
            ...condition,
            attribute_values: undefined,
        }));

        const response = await adminWorkflowRepository.saveWorkflow(formData, { actions: newActions, conditions: newConditions });
        if (response.success) {
            toast(response.message)
            navigate('/administrator/workflows')
        }
        // post(route('administrator.companies.store'));
    };

    const handleAddCondition = function (): void {
        const newCondition: Condition = {
            attribute: '',
            attribute_type: 'text',
            attribute_values: [],
            operator: '',
            value: ''
        }
        setConditions(prevConditions => [...prevConditions, newCondition]);
    }

    const handleUpdateCondition = function (index: number, name: string, value: string) {

        const updatedConditions = [...conditions];

        if (name === 'attribute') {
            const inp = moduleInputs.find((input: { name: string }) => input.name === value)
            if (inp) {
                console.log(moduleInputs, inp)
                updatedConditions[index] = {
                    ...updatedConditions[index],
                    ['attribute_type']: (inp as any).type,
                    ['attribute_values']: (inp as any).values
                };
            }
        }

        updatedConditions[index] = {
            ...updatedConditions[index],
            [name]: value
        };
        setConditions(updatedConditions);
    }

    const handleDeleteCondition = function (index: number) {
        setConditions(prevConditions => {
            return prevConditions.filter((_, i) => i !== index);
        });
    }

    const handleAddAction = function (): void {
        const newAction: Action = {
            type: '',
            related_module: '',
            related_modules: [],
            related_module_fields: [],
            related_module_field_type: '',
            related_module_field_values: [],
            mapping: []
        }
        setActions(prevActions => [...prevActions, newAction]);
    }

    const handleUpdateAction = async function (index: number, name: string, value: string) {

        const updatedActions = [...actions];

        if (name === 'type') {
            if (value === 'update_related_item' || value === 'add_related_item') {

                //get module parent relations
                const response = await adminModuleRepository.getModuleParentRelations(formData.module)
                if (response.success) {
                    updatedActions[index] = {
                        ...updatedActions[index],
                        ['related_modules']: response.data
                    };
                }
            }
        }

        if (name === 'related_module') {
            //get related module fields
            const response = await adminModuleRepository.getModuleFields(value);
            if (response.success) {
                updatedActions[index] = {
                    ...updatedActions[index],
                    ['related_module_fields']: response.data
                };
            }
        }

        if (name === 'related_module_field') {
            const inp = actions[index].related_module_fields.find((input: { name: string }) => input.name === value)
            if (inp) {
                updatedActions[index] = {
                    ...updatedActions[index],
                    ['related_module_field_type']: (inp as any).type,
                    ['related_module_field_values']: (inp as any).values
                };
            }
        }

        updatedActions[index] = {
            ...updatedActions[index],
            [name]: value
        };

        setActions(updatedActions);

        //show mapping popup
        if (name === 'related_module') {

            setActionMapId(index);
            var mappingItems: MappingItem[] = [];
            updatedActions[index].related_module_fields!.map((field: { name: string, type: string }) => {

                console.log(field)
                let source = field.type === 'select' ? 'input_value' : '';
                let value = '';
                let selected_related_module = '';

                mappingItems.push({
                    name: field.name,
                    source,
                    value,
                    selected_related_module,
                    related_modules: [],
                    related_module_fields: []
                });
            })

            setMapping(mappingItems);

            setIsMapAddModalOpen(true);

        }
    }

    const handleDeleteAction = function (index: number) {
        setActions(prevActions => {
            return prevActions.filter((_, i) => i !== index);
        });
    }

    const handleUpdateMapping = async function (name: keyof MappingItem, fieldIndex: number, value: string) {

        const updatedMapping = [...mapping];

        var mappingItem = mapping[fieldIndex];

        //if source value is related_item fetch related modules  
        if (name === 'source' && value === 'related_item') {
            const response = await adminModuleRepository.getModuleParentRelations(formData.module);
            if (response.success) {
                mappingItem.related_modules = response.data;
            }
        }

        //if source  is related_item and input name is related_module fetch selected module inputs 
        if (mappingItem.source === 'related_item' && name === 'selected_related_module') {
            const response: any = await adminModuleRepository.getModuleFields(value);
            if (response.success) {
                mappingItem.related_module_fields = response.data;
                const idItem = {
                    id: 999,
                    title: 'id',
                    value: 'id'
                };
                mappingItem.related_module_fields!.push(idItem);
            }
        }

        updatedMapping[fieldIndex] = { ...mappingItem, [name]: value };

        setMapping(updatedMapping);

    }

    const handleSaveMapping = async function (actionMapId: number) {

        const act = actions[actionMapId];

        const updatedMapping = mapping.map(obj => {
            const newObj = { ...obj };
            delete newObj.related_modules;
            delete newObj.related_module_fields;
            return newObj;
        });

        act.mapping = updatedMapping;

        setActions(prevActions => {
            const newActions = [...prevActions];
            newActions[actionMapId] = act;
            return newActions;
        });

        setIsMapAddModalOpen(false);

    }

    useEffect(() => {
        fetchActiveModulesOptions();

    }, []);

    return (
        <AuthenticatedLayoutAdmin
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Add Workflow
                </h2>
            }
        >
            <form onSubmit={submit}>
                <div className="grid max-w-full flex-1 auto-rows-max gap-4">
                    <div className="flex items-center gap-4">
                        <Button type="button" variant="outline" size="icon" onClick={() => navigate('/administrator/workflows')} className="h-7 w-7">
                            <ChevronLeft className="h-4 w-4" />
                            <span className="sr-only">Back</span>
                        </Button>
                        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                            Add Workflow
                        </h1>
                        <div className="hidden items-center gap-2 md:ml-auto md:flex">
                            <Button type="submit" size="sm">Save Workflow</Button>
                        </div>
                    </div>
                    <div className="grid gap-4  lg:gap-8">
                        <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                            <Card x-chunk="dashboard-07-chunk-0">
                                <CardHeader>
                                    <CardTitle>Workflow Basic Details</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-col md:w-8/12">
                                        <div className="grid gap-3 mb-4">
                                            <Label htmlFor="name">Name</Label>
                                            <Input
                                                type="text"
                                                className="w-full"
                                                value={formData.name}
                                                onChange={(e) => handleChange('name', e.target.value)}
                                            />
                                        </div>
                                        <div className="grid gap-3">
                                            <Label htmlFor="name">Description</Label>
                                            <Textarea
                                                rows={6}
                                                className="w-full"
                                                value={formData.description}
                                                onChange={(e) => handleChange('description', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card x-chunk="dashboard-07-chunk-0">
                                <CardHeader>
                                    <CardTitle>Workflow Conditions</CardTitle>
                                </CardHeader>
                                <CardContent className="md:w-8/12">
                                    <div className="flex flex-col mb-4">
                                        <div className="grid gap-3 mb-4">
                                            <Label htmlFor="name">Event</Label>
                                            <Select onValueChange={(value) => handleChange('event', value)} >
                                                <SelectTrigger aria-label="Select event">
                                                    <SelectValue placeholder="Select event" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {events.length > 0 ?
                                                        events.map((event: { module: string, events: [] }, key) =>
                                                            <SelectGroup key={key}>
                                                                <SelectLabel>{event.module}</SelectLabel>
                                                                {event.events.map((ev: { value: string; name: string }, evIndex) => <SelectItem key={evIndex} value={ev.value}>{ev.name}</SelectItem>)}
                                                            </SelectGroup>
                                                        )
                                                        : <></>
                                                    }
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="flex flex-col mb-4">
                                        <div className="grid gap-3 ">
                                            <Label htmlFor="name">Conditions</Label>

                                            {conditions.length > 0 ?
                                                conditions.map((condition, key) =>
                                                    <div key={key} className="md:grid grid-cols-12 gap-2">
                                                        <div className="col-span-4">
                                                            <Select disabled={moduleInputs.length == 0} onValueChange={(value) => handleUpdateCondition(key, 'attribute', value)} >
                                                                <SelectTrigger aria-label="Select attribute">
                                                                    <SelectValue placeholder="Select attribute" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    {
                                                                        moduleInputs.length > 0 ? moduleInputs.map((input: { name: string, title: string }, index) => <SelectItem key={index} value={input.name}>{input.title}</SelectItem>) : <></>
                                                                    }
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                        <div className="col-span-4">
                                                            <Select disabled={moduleInputs.length == 0} onValueChange={(value) => handleUpdateCondition(key, 'operator', value)} >
                                                                <SelectTrigger aria-label="Select operator">
                                                                    <SelectValue placeholder="Select operator" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="is_equal">Is Equal</SelectItem>
                                                                    <SelectItem value="is_not_equal">Is Not Equal</SelectItem>
                                                                    <SelectItem value="greater_than">Greater than</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                        {
                                                            condition.attribute_type === 'select' || condition.attribute_type === 'select_relational' ?
                                                                <div className="col-span-3" >
                                                                    <Select disabled={moduleInputs.length == 0} onValueChange={(value) => handleUpdateCondition(key, 'value', value)} >
                                                                        <SelectTrigger aria-label="Select operator">
                                                                            <SelectValue placeholder="Select operator" />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            {condition.attribute_values.map((attribute_value: { title: string, value: string }, attribute_value_key) =>
                                                                                <SelectItem key={attribute_value_key} value={attribute_value.value}>{attribute_value.title}</SelectItem>
                                                                            )}
                                                                        </SelectContent>
                                                                    </Select>
                                                                </div>
                                                                : <Input onChange={(event) => handleUpdateCondition(key, 'value', event.target.value)} className="col-span-3" type="text" />
                                                        }
                                                        <Button className="col-span-1" variant={"outline"} onClick={() => handleDeleteCondition(key)} ><Trash /></Button>
                                                    </div>
                                                )
                                                : <></>}
                                            <button type="button" className="text-sky-500 text-start w-fit" onClick={() => handleAddCondition()} >+ Add Condition</button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card x-chunk="dashboard-07-chunk-0">
                                <CardHeader>
                                    <CardTitle>Workflow Actions</CardTitle>
                                </CardHeader>
                                <CardContent className="">
                                    <div className="flex flex-col mb-4">
                                        <div className="grid gap-3 ">
                                            {actions.length > 0 ?
                                                actions.map((action, key) =>
                                                    <div key={key} className="md:grid grid-cols-12 gap-2">
                                                        <div className="col-span-3">
                                                            <Select onValueChange={(value) => handleUpdateAction(key, 'type', value)} >
                                                                <SelectTrigger aria-label="Select type">
                                                                    <SelectValue placeholder="Select type" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    {
                                                                        actionTypes.length > 0 ?
                                                                            actionTypes.map((actionType, index) => <SelectItem key={index} value={actionType.value}>{actionType.name}</SelectItem>)
                                                                            : <></>
                                                                    }
                                                                </SelectContent>
                                                            </Select>
                                                        </div>

                                                        {
                                                            action.type === "update_related_item" || action.type === "add_related_item" && action.related_modules.length > 0 ?
                                                                <div className="col-span-2">
                                                                    <Select onValueChange={(value) => handleUpdateAction(key, 'related_module', value)} >
                                                                        <SelectTrigger aria-label="Select type">
                                                                            <SelectValue placeholder="Select type" />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            {action.related_modules.map((related_module: { name: string, permalink: string }, index) => <SelectItem key={index} value={related_module.permalink}>{related_module.name}</SelectItem>)}
                                                                        </SelectContent>
                                                                    </Select>
                                                                </div>
                                                                : <></>
                                                        }
                                                        {
                                                            action.type === "update_related_item" && action.related_module_fields.length > 0 ?
                                                                <div className="col-span-3">
                                                                    <Select onValueChange={(value) => handleUpdateAction(key, 'related_module_field', value)} >
                                                                        <SelectTrigger aria-label="Select type">
                                                                            <SelectValue placeholder="Select type" />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            {action.related_module_fields.map((input: { name: string, title: string }, index) => <SelectItem key={index} value={input.name}>{input.title}</SelectItem>)}
                                                                        </SelectContent>
                                                                    </Select>
                                                                </div>
                                                                : <></>
                                                        }
                                                        {
                                                            action.type === "set_reminder" ?
                                                                <div className="col-span-3">
                                                                    <div className="flex items-center gap-2">
                                                                        <Input type="number" defaultValue={1} onChange={(e) => handleUpdateAction(key, 'days', e.target.value)} ></Input><div>Days</div>

                                                                    </div>
                                                                </div>
                                                                : <></>
                                                        }
                                                        {
                                                            action.type === "update_related_item" && action.related_module_fields.length > 0 && action.related_module_field_values.length > 0 ?
                                                                <div className="col-span-3">
                                                                    <Select onValueChange={(value) => handleUpdateAction(key, 'related_module_field_value', value)} >
                                                                        <SelectTrigger aria-label="Select value">
                                                                            <SelectValue placeholder="Select value" />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            {action.related_module_field_values.map((related_module_field_value: { id: number, title: string }, index) => <SelectItem key={index} value={related_module_field_value.id.toString()}>{related_module_field_value.title}</SelectItem>)}
                                                                        </SelectContent>
                                                                    </Select>
                                                                </div>
                                                                : <></>
                                                        }
                                                        <Button className="col-span-1" variant={"outline"} onClick={() => handleDeleteAction(key)} ><Trash /></Button>
                                                    </div>
                                                )
                                                : <></>}
                                            <button type="button" className="text-sky-500 text-start w-fit" onClick={() => handleAddAction()} disabled={formData.event.length == 0} >+ Add Action</button>
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

            <Dialog open={isMapAddModalOpen} onOpenChange={setIsMapAddModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Item Fields Mapping {mapping.length}</DialogTitle>
                    </DialogHeader>
                    <div className="">
                        {
                            actionMapId !== null && actionMapId !== undefined && actions.length > 0 ?
                                <>
                                    <div className="grid grid-cols-12 gap-4 mb-3">
                                        <div className="col-span-4">
                                            {actions[actionMapId].related_module}
                                        </div>
                                        <div className="col-span-4">
                                            source
                                        </div>
                                        <div className="col-span-4">
                                            test
                                        </div>
                                    </div>
                                    <div className="">
                                        {actions[actionMapId].related_module_fields.map((field: { name: string, type: string, values: [] }, key) => {
                                            return (
                                                <div key={key} className="grid grid-cols-12 gap-4 mb-3" >
                                                    <Input className="col-span-4" disabled={true} defaultValue={field.name} ></Input>

                                                    <div className="col-span-4">
                                                        <Select onValueChange={(value) => handleUpdateMapping('source', key, value)} value={field.type === 'select' ? 'input_value' : ''} disabled={field.type === 'select' ? true : false}>
                                                            <SelectTrigger value={mapping[key].source} className="mb-2" aria-label="Select source">
                                                                <SelectValue placeholder="Select source" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value='input_value' >Input value</SelectItem>
                                                                <SelectItem value='item' >Item</SelectItem>
                                                                <SelectItem value='related_item' >Related Item</SelectItem>
                                                            </SelectContent>
                                                        </Select>

                                                        {
                                                            field.type === 'select_relational' && mapping[key].source === 'related_item' ?
                                                                <Select onValueChange={(value) => handleUpdateMapping('selected_related_module', key, value)} >
                                                                    <SelectTrigger value={mapping[key].selected_related_module} aria-label="Select module">
                                                                        <SelectValue placeholder="Select module" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        {
                                                                            mapping[key].related_modules!.length ?
                                                                                mapping[key].related_modules!.map((module: { id: number, name: string, permalink: string }, key: number) =>
                                                                                    <SelectItem key={key} value={module.permalink} >{module.name}</SelectItem>
                                                                                )
                                                                                : <></>
                                                                        }
                                                                    </SelectContent>
                                                                </Select>
                                                                : <></>
                                                        }
                                                    </div>
                                                    <div className="col-span-4">
                                                        {
                                                            field.type === 'select' ?
                                                                <Select onValueChange={(value) => handleUpdateMapping('value', key, value)} >
                                                                    <SelectTrigger value={mapping[key].value} aria-label="Select value">
                                                                        <SelectValue placeholder="Select value" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        {
                                                                            field.values.map((value: { id: number, title: string, value: string }, valKey) => (
                                                                                <SelectItem key={valKey} value={value.value}>{value.title}</SelectItem>
                                                                            ))
                                                                        }
                                                                    </SelectContent>
                                                                </Select>
                                                                : <></>
                                                        }
                                                        {
                                                            // && mapping[key].source ==='related_item'
                                                            field.type === 'select_relational' ?
                                                                <Select onValueChange={(value) => handleUpdateMapping('value', key, value)} disabled={mapping[key].source === '' || mapping[key].source === 'related_item' && mapping[key].selected_related_module === ''} >
                                                                    <SelectTrigger value={mapping[key].value} aria-label="Select value">
                                                                        <SelectValue placeholder="Select value" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        {
                                                                            mapping[key].source === 'input_value' ?
                                                                                moduleInputs.map((inp: { id: number, title: string, name: string }, inpKey) => (<SelectItem key={inpKey} value={inp.id.toString()}>{inp.title}</SelectItem>))
                                                                                :
                                                                                <></>
                                                                        }
                                                                        {
                                                                            mapping[key].source === 'related_item' ?
                                                                                mapping[key].related_module_fields!.map((inp, inpKey) => (<SelectItem key={inpKey} value={inp.id.toString()}>{inp.title}</SelectItem>))
                                                                                :
                                                                                <></>
                                                                        }
                                                                    </SelectContent>
                                                                </Select>
                                                                : <></>
                                                        }

                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </>

                                : <></>
                        }
                    </div>
                    <DialogFooter>
                        <Button type="submit" onClick={() => handleSaveMapping(actionMapId!)} >Save mapping</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AuthenticatedLayoutAdmin>
    )
}
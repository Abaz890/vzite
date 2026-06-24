import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TableCell, TableRow } from "@/components/ui/table";
import { Input } from '@/components/ui/input';
import { ModuleField, ModuleRelation } from '@/types';
// import { Separator } from "@/components/ui/separator";


interface ImportRowProps {
    module_id: string;
    inputs: ModuleField[];
    titles: string[];
    directories: string[];
    isLoading: boolean;
    onInputChange: (name: string, source: string, value: string) => void;
    depth?: number;
}

interface RecursiveImportRowsProps {
    rleation: ModuleRelation;
    module_id: string;
    titles: string[];
    directories: string[];
    isLoading: boolean,
    onInputChange: (name: string, value: any) => void;
    depth?: number;
}



const RecursiveImportRows: React.FC<RecursiveImportRowsProps> = ({
    rleation,
    module_id,
    titles,
    directories,
    isLoading,
    onInputChange,
    depth = 0
}) => {
    return (
        <div className={`${depth > 0 ? 'ml-4' : ''}`}>
            {/* Render current module's ImportRow */}
            {rleation.relations != undefined && Object.entries(rleation.relations).map(([relationId, relation]) => (
                <div key={relationId}>
                    <RecursiveImportRows
                        rleation={relation}
                        module_id={relationId}
                        titles={titles}
                        directories={directories}
                        isLoading={isLoading}
                        onInputChange={onInputChange}
                        depth={depth + 1}
                    />
                </div>
            ))}
            <ImportRow
                titles={titles}
                directories={directories}
                module_id={module_id}
                inputs={rleation.inputs}
                isLoading={isLoading}
                onInputChange={onInputChange}
            />
        </div>
    );
};

export default function ImportRow({ module_id, inputs, titles, directories, isLoading, onInputChange }: ImportRowProps): JSX.Element {


    return <>
        {inputs.map((input, key) =>
            <TableRow key={key}>
                <TableCell>
                    {module_id} - {input.name}
                </TableCell>
                <TableCell>
                    {
                        <Select onValueChange={(value) => onInputChange(`${module_id}__${input.name}`, 'row', value)}
                            required={input.isRequired == 1}
                            disabled={isLoading}
                        >
                            <SelectTrigger className={input.isRequired == 1 ? 'required-field' : ''}
                                id="category"
                                aria-label="Select value"
                            >
                                <SelectValue placeholder="Select value" />
                            </SelectTrigger>
                            <SelectContent>
                                {
                                    titles.length > 0 ?
                                        titles.map((title, key) => (
                                            <SelectItem value={title} key={key} >{title}</SelectItem>
                                        ))
                                        : null
                                }
                            </SelectContent>
                        </Select>
                    }
                    {
                        input.type === 'dropzone_media_single' || input.type === "dropzone_media_multiple" ?
                            <div className="my-2">
                                <Select onValueChange={(value) => onInputChange(`${module_id}__${input.name}__folder`, 'row', value)}
                                    required={input.isRequired == 1}
                                    disabled={isLoading}
                                >
                                    <SelectTrigger className={input.isRequired == 1 ? 'required-field' : ''}
                                        id="category"
                                        aria-label="Select folder"
                                    >
                                        <SelectValue placeholder="Select folder" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {
                                            directories.length > 0 ?
                                                directories.map((title, key) => (
                                                    <SelectItem value={title} key={key} >{title}</SelectItem>
                                                ))
                                                : null
                                        }
                                    </SelectContent>
                                </Select>
                            </div>

                            : <></>
                    }
                </TableCell>
                <TableCell>
                    {
                        input.type === "select" ?
                            <Select
                                onValueChange={(value) => onInputChange(`${module_id}__${input.name}`, 'default_value', value)}
                                disabled={isLoading}
                            >
                                <SelectTrigger className={input.isRequired == 1 ? 'required-field' : ''}
                                    id="category"
                                    aria-label="Select value"
                                >
                                    <SelectValue placeholder="Select value" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Array.from(input.values).map((option: any, optionKey) => (<SelectItem key={optionKey} value={option.value} >{option.title}</SelectItem>))}
                                </SelectContent>
                            </Select>
                            : null
                    }
                    {
                        input.type === "text" || input.type === "textarea" || input.type === "number" ?
                            <Input
                                id="stock-1"
                                type="text"
                                onChange={(e) => onInputChange(`${module_id}__${input.name}`, 'default_value', e.target.value)}
                                disabled={isLoading}
                            // disabled={input.isAutoIncremental}
                            // required={input.isRequired==1}
                            />
                            : null
                    }
                </TableCell>
            </TableRow>
        )}


    </>

}
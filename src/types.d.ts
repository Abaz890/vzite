



export interface repositoryResponse {
    success:boolean,
    data : [] | Object
}


export interface ModuleFieldValue {
    title: string;
    value: string;
}

export interface ModuleField {
    id: number;
    name: string;
    title: string;
    isRequired: number;
    type: string;
    default_value: string | null;
    values: ModuleFieldValue[];
}

export interface ModuleRelation {
    inputs: ModuleField[];
    relations?: {
        [key: string]: ModuleRelation;
    };
}

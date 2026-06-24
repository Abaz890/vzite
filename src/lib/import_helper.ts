interface InputField {
  id: number;
  name: string;
  title: string;
  isRequired: number;
  type: string;
  default_value?: any;
  values?: Array<{ title: string; value: string }>;
}

// interface Relation {
//   inputs: InputField[];
//   relations?: Record<string, Relation>;
// }

// interface Payload {
//   inputs: InputField[];
//   relations: Record<string, Relation>;
// }

// interface RootObject {
//   success: boolean;
//   payload: Payload;
// }

export function transformObject(obj: any): Record<string, string> {
  const result: Record<string, string> = {};

  function generateKey(path: string[], obj: any): string | undefined {
    if (typeof obj === 'object' && obj !== null) {
      for (const [key, value] of Object.entries(obj)) {
        console.log(path,key,value)
        // const newPath = [...path, key];
        if (Array.isArray(value) && value.length > 0 && 'id' in value[0]) {
          // Handle input fields
          const inputField = value[0];
          const newKey = generateNewKey(inputField);
          if (newKey) {
            result[newKey] = '';
          }
        } else if (typeof value === 'object' && value !== null) {
          // Handle nested objects
          const nestedResult = transformObject({ payload: value });
          Object.assign(result, nestedResult);
        }
      }
    }
    return undefined;
  }

  function generateNewKey(field: InputField): string | undefined {
    return `${field.name}__${field.title}__source:""`;
  }

  // Start traversing from the root object
  generateKey([], obj.payload);

  return result;
}

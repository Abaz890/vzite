import axios from 'axios';


export default class adminModuleRepository {


    public static async getModules(page = 1)  {

        const url = import.meta.env.VITE_API_BASE_URL+'/admin/modules?page='+page;
        var response = await axios.get(url);
        let obj : any = {success:response.data.success};
        if(response.data.success){ 
            obj.data=response.data.payload;
        }
        else{
            console.log(response.data.message)
        }

        return obj;
    }

    public static async saveModule(data : any,fields : any[]) {
        
        const url = import.meta.env.VITE_API_BASE_URL+'/admin/modules';
        data.fields=fields; 
        var response = await axios.post(url,data);
        let obj : any = {success:response.data.success};
        if(response.data.success){ 
            obj.data=response.data.payload;
        }
        else{
            console.log(response.data.message)
        }
    
        return obj;
    }

    public static async getModuleFields(module_name: string) {

        const url = import.meta.env.VITE_API_BASE_URL + `/admin/modules/${module_name}/fields`;
        var response = await axios.get(url);
        let obj: any = { success: response.data.success };
        if (response.data.success) {
            obj.data = response.data.payload;
        }
        else {
            console.log(response.data.message)
        }

        return obj;
    }

    public static async getModuleFieldsGrouped(module_name: string) {

        const url = import.meta.env.VITE_API_BASE_URL + `/admin/modules/${module_name}/grouped_fields`;
        var response = await axios.get(url);
        let obj: any = { success: response.data.success };
        if (response.data.success) {
            obj.data = response.data.payload;
        }
        else {
            console.log(response.data.message)
        }
        return obj;
    }

    public static async getModuleParentRelations(module_name : string){
       
        const url = import.meta.env.VITE_API_BASE_URL + `/admin/modules/${module_name}/parent_relations`;
        var response = await axios.get(url);
        let obj: any = { success: response.data.success };
        if (response.data.success) {
            obj.data = response.data.payload;
        }
        else {
            console.log(response.data.message)
        }

        return obj;
    }

    public static async sortModuleGroupFields(data: { module_id: any; payload: any; }) {

        const url = import.meta.env.VITE_API_BASE_URL + `/admin/modules/${data.module_id}/sort`;
        var response = await axios.post(url,{groups:data.payload});
        let obj: any = { success: response.data.success };
        if (response.data.success) {
            obj.data = response.data.payload;
        }
        else {
            console.log(response.data.message)
        }

        return obj;
    }
}



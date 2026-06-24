import axios from 'axios';


export default class companyAgentRoleRepository {

    public static async getRoleList(page = 1,) {
    
        const url = import.meta.env.VITE_API_BASE_URL + `/company/agent_role?page=${page}`;
        var response = await axios.get(url);
        let obj: any = { success: response.data.success, message:response.data.message };
        if (response.data.success) {
            obj.data = response.data.payload;
        }
        else {
            console.log(response.data.message)
        }
    
        return obj;
    }

    public static async saveRole(data : any) {
             
        const url = import.meta.env.VITE_API_BASE_URL + `/company/agent_role`;
        var response = await axios.post(url,data);
        let obj: any = { success: response.data.success ,message:response.data.message};
        if (response.data.success) {
            obj.data = response.data.payload;
        }
        else {
            console.log(response.data.message)
        }
        return obj;
    }

    public static async deleteRole(id:any) {

        const url = import.meta.env.VITE_API_BASE_URL + `/company/agent_role/${id}`;
        var response = await axios.delete(url);
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




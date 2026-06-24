import axios from 'axios';
 
export default class adminCompanyRepository {


    public static async getCompanies(page = 1)  {

        const url = import.meta.env.VITE_API_BASE_URL+'/admin/companies?page='+page;
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

    public static async saveModule(data : any) {
        
        const url = import.meta.env.VITE_API_BASE_URL+'/admin/companies';
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


    public static async getCompanyAgents(page = 1,company : number)  {

        const url = import.meta.env.VITE_API_BASE_URL+`/admin/companies/${company}/agents?page=${page}`;
        var response = await axios.get(url);
        return response.data;
    }


    public static async updateCompanyAgentAdmin(agent_id : number,company : number,selectedRole : string )  {

        const url = import.meta.env.VITE_API_BASE_URL+`/admin/companies/${company}/agents/${agent_id}/change_admin`;
        var response = await axios.post(url,{selected_role:selectedRole});
        return response.data;
    }


    public static async getCompanyRoles(company : number)  {

        const url = import.meta.env.VITE_API_BASE_URL+`/admin/companies/${company}/roles`;
        var response = await axios.get(url);
        return response.data;
    }





}



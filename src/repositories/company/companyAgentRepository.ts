import axios from 'axios';


export default class companyAgentRepository {

    public static async getAgentList(page = 1,) {
    
        const url = import.meta.env.VITE_API_BASE_URL + `/company/agent?page=${page}`;
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

    public static async saveAgent(data : any) {
             
        const url = import.meta.env.VITE_API_BASE_URL + `/company/agent`;
        var response = await axios.post(url,data);
        let obj: any = { success: response.data.success,message:response.data.message };
        if (response.data.success) {
            obj.data = response.data.payload;
        }
        else { 
        }
        return obj;
    }

    public static async deleteAgent(id : string){

        const url = import.meta.env.VITE_API_BASE_URL + `/company/agent/${id}`;
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


    public static async getAgentProfile() {
    
        const url = import.meta.env.VITE_API_BASE_URL + `/company/agent/profile`;
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





}




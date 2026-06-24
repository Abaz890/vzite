import axios from 'axios';


export default class adminWorkflowRepository {




    public static async getWorkflows(page = 1)  {

        const url = import.meta.env.VITE_API_BASE_URL+'/admin/workflows?page='+page;
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


    public static async saveWorkflow(data : any, extra : { conditions : any , actions : any }) {
        const url = import.meta.env.VITE_API_BASE_URL+'/admin/workflows';
        data.condition=extra.conditions;
        data.actions=extra.actions;
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




}
import axios from 'axios';


export default class adminSubscriptionRepository {


    public static async getSubscriptionDashboard()  {

        const url = import.meta.env.VITE_API_BASE_URL+'/admin/subscriptions';
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



}
import axios from 'axios';


export default class companyRepository {


    
    public static async getSubscriptionCheckout(price_id: string) {

        const url = import.meta.env.VITE_API_BASE_URL + `/company/subscribe`;
        var response = await axios.post(url,{price_id});
        let obj: any = { success: response.data.success };
        if (response.data.success) {
            obj.data = response.data.payload;
        }
        else {
            console.log(response.data.message)
        }

        return obj;
    }

    public static async getCompanyInit() {

        
        const url = import.meta.env.VITE_API_BASE_URL + `/company/init`;
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



    public static async getPropertiesDBAuthToken(supertoken : string) {
     
        const url = import.meta.env.VITE_PROPERTIES_APP_BASE_URL + `/login?${supertoken}`;
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

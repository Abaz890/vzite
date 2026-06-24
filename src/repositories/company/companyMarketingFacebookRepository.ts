import axios from 'axios';



export default class companyMarketingFacebookRepository {


    public static async getPages(page: number, name = "") {

        let url = import.meta.env.VITE_API_BASE_URL + `/company/marketing/facebook/pages?page=${page}`
        if (name) {
            url = url + `&name=${name}`
        }

        const response = await axios.get(url);
        let obj: any = { success: response.data.success };
        if (response.data.success) {
            obj.data = response.data.payload;
        } else {
            console.log(response.data.message);
        }

        return obj;

    }



    public static async syncPages() {

        let url = import.meta.env.VITE_API_BASE_URL + `/company/marketing/facebook/pages/sync`

        const response = await axios.get(url);
        let obj: any = { success: response.data.success };
        if (response.data.success) {
            obj.data = response.data.payload;
        } else {
            console.log(response.data.message);
        }

        return obj;

    }


    public static async getInstantForms() {
        const url = import.meta.env.VITE_API_BASE_URL + `/company/marketing/facebook/instant_forms`
        const response = await axios.get(url);
        console.log(response);
        let obj: any = { success: response.data.success };
        if (response.data.success) {
            obj.data = response.data.payload;
        } else {
            console.log(response.data.message);
        }

        return obj;
    }



    public static async saveInstantForm(data: any) {


        const url = import.meta.env.VITE_API_BASE_URL + `/company/marketing/facebook/instant_forms`
        const response = await axios.post(url, data);
        let obj: any = { success: response.data.success };
        if (response.data.success) {
            obj.data = response.data.payload;
        } else {
            console.log(response.data.message);
        }

        return obj;

    }




    public static async attachMedia(upload_id: any) {

        let url = import.meta.env.VITE_API_BASE_URL + `/company/marketing/facebook/instant_forms/media`
        const data = {
            upload_id,
        };
        var response = await axios.post(url, data);
        let obj: any = { success: response.data.success };
        if (response.data.success) {
            obj.data = response.data.payload;
        }

        return obj;
    }

    public static async unAttachMedia() {


        let url = import.meta.env.VITE_API_BASE_URL + `/company/marketing/facebook/instant_forms/media`

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
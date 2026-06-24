import axios from 'axios';

export default class companyTimeOffRequestRepository {

    // private static get authToken(): string {
    //     return `Bearer ${Cookies.get("backoffice_token") ?? ""}`;
    // }


    public static async getTimeOffRequest(id: string) {

        const url = import.meta.env.VITE_API_BASE_URL + `/company/time_off/${id}`;
        var response = await axios.get(url);
        let obj: any = { success: response.data.success, message: response.data.message };
        if (response.data.success) {
            obj.data = response.data.payload;
        }
        else {
        }
        return obj;
    }

    public static async saveTimeOffRequest() {

        const url = import.meta.env.VITE_API_BASE_URL + `/company/time_off`;
        var response = await axios.post(url, {});
        let obj: any = { success: response.data.success, message: response.data.message };
        if (response.data.success) {
            obj.data = response.data.payload;
        }
        else {
        }
        return obj;
    }

    public static async updateTimeOffRequest(id: string, data: any) {

        const url = import.meta.env.VITE_API_BASE_URL + `/company/time_off/${id}`;
        var response = await axios.put(url, data);
        let obj: any = { success: response.data.success, message: response.data.message };
        if (response.data.success) {
            obj.data = response.data.payload;
        }
        else {
        }
        return obj;
    }


    public static async validateOtp(data: any) {

        const url = import.meta.env.VITE_API_BASE_URL + `/company/time_off/${data.id}/validate_otp`;
        var response = await axios.post(url, {
            otp: data.otp
        });
        let obj: any = { success: response.data.success, message: response.data.message };
        if (response.data.success) {
            obj.data = response.data.payload;
        }
        else {
        }
        return obj;
    }

    public static async add_attachment(data: any) {

        const url = import.meta.env.VITE_API_BASE_URL + `/company/time_off/${data.id}/attachment`;
        const response = await axios.post(url, {
            attachment_id: data.attachment_id
        });
        let obj: any = { success: response.data.success, message: response.data.message };
        if (response.data.success) {
            obj.data = response.data.payload;
        }
        else {
        }
        return obj;
    }

    public static async remove_attachment(data: any) {


        const url = import.meta.env.VITE_API_BASE_URL + `/company/time_off/${data.id}/attachment/${data.attachment_id}`;
        const response = await axios.delete(url);
        let obj: any = { success: response.data.success, message: response.data.message };
        if (response.data.success) {
            obj.data = response.data.payload;
        }
        else {
        }
        return obj;
    }

}

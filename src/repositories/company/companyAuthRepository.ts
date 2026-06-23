import axios from 'axios';

export default class companyAuthRepository {

    public static async companyLoginBySupertoken(data: { email: any; token: any; }) {
        const url = import.meta.env.VITE_API_BASE_URL + `/company/loginBySuperToken?supertoken=${data.token}&email=${data.email}`;
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

    public static async companyLogin(data: { email: string, password: string }) {
        const url = import.meta.env.VITE_API_BASE_URL + `/company/login`;
        var response = await axios.post(url, { email: data.email, password: data.password });
        let obj: any = { success: response.data.success, data: response.data.payload, message: response.data.message };
        return obj;
    }

    public static async companyDetails() {
        const url = import.meta.env.VITE_API_BASE_URL + `/company`;
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

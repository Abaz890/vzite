import axios from 'axios';

export default class adminRepository {



    public static async adminLogin(data: { email: string, password: string }) {

        const url = import.meta.env.VITE_API_BASE_URL + `/admin/login`;
        var response = await axios.post(url, { email: data.email, password: data.password });
        let obj: any = { success: response.data.success, data: response.data.payload, message: response.data.message };
        return obj;

    }




}
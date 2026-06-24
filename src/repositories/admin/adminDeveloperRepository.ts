import axios from 'axios';
import Cookies from "js-cookie";


export default class adminDeveloperRepository {


    public static async getDevelopers(page: number, filters: { source: any; name:string }) {

        const url = import.meta.env.VITE_PROPERTIES_APP_BASE_URL + `/developers?page=${page}&source=${filters.source}&name=${filters.name}`;
        const authToken = `Bearer ${Cookies.get("props_token")}`;
        var response = await axios.get(url, {
            headers: {
                Authorization: authToken,
            }
        });

        let obj: any = { success: response.data.success };
        if (response.data.success) {
            obj.data = response.data.payload;
        }
        else {
            console.log(response.data.message)
        }

        return obj;

    }

    public static async updateDeveloperStatus(referenceId: string) {

        const url = import.meta.env.VITE_PROPERTIES_APP_BASE_URL + `/developers/${referenceId}/update_status`;
        const authToken = `Bearer ${Cookies.get("props_token")}`;
        var response = await axios.get(url, {
            headers: {
                Authorization: authToken,
            },
        });

        let obj: any = { success: response.data.success, message: response.data.message };
        if (response.data.success) {
            obj.data = response.data.payload;
        } else {
            console.log(response.data.message);
        }

        return obj;

    }

}
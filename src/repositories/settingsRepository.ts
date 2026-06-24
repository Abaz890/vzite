import axios from 'axios';


export default class settingsRepository {


    public static async getActiveModulesOptions() {

        const url = import.meta.env.VITE_API_BASE_URL + '/settings/get_active_modules_options';
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


    public static async getPermissions() {

        const url = import.meta.env.VITE_API_BASE_URL + '/settings/get_permissions';
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


    public static async updateSetting(data: any) {

        const url = import.meta.env.VITE_API_BASE_URL + '/settings';
        const response = await axios.put(url, data);
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
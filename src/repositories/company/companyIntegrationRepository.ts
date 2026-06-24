import axios from 'axios';


export default class companyIntegrationRepository {

    public static async getFacebookUrl() {

        const url = import.meta.env.VITE_API_BASE_URL + `/integration/facebook`;
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
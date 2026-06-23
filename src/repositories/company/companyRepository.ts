import axios from 'axios';

export default class companyRepository {

    public static async getCompanyInit() {
        const url = import.meta.env.VITE_API_BASE_URL + `/company/init`;
        try {
            var response = await axios.get(url);
            let obj: any = { success: response.data.success };
            if (response.data.success) {
                obj.data = response.data.payload;
            }
            return obj;
        } catch (error) {
            return { success: false, data: null };
        }
    }

}

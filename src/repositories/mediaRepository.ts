import axios from 'axios';
import Cookies from "js-cookie";


export default class MediaRepository {

    public static async upload(file: File) {

        const url = import.meta.env.VITE_API_BASE_URL + `/media`;
        const formData = new FormData();
        if (!file || !file.name) {
            console.error('No file selected or invalid file');
            throw new Error('No file selected or invalid file');
        }
        formData.append('file', file);
        var response = await axios.post(url, formData, {
            headers: {
                "Content-Type": `multipart/form-data;`
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

    public static async uploadDelete(id: string) {


        const url = import.meta.env.VITE_API_BASE_URL + `/media/${id}`;
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


    public static async propertyUpload(file: File, isFeature: boolean) {

        const url = import.meta.env.VITE_PROPERTIES_APP_BASE_URL + `/media`;
        const authToken = `Bearer ${Cookies.get("props_token")}`;

        const formData = new FormData();
        if (!file || !file.name) {
            console.error('No file selected or invalid file');
            throw new Error('No file selected or invalid file');
        }
        formData.append('file', file);
        if (isFeature) {
            formData.append('featured', '1');
        }
        var response = await axios.post(url, formData, {
            headers: {
                "Content-Type": `multipart/form-data;`,
                "Authorization": authToken
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

    public static async backofficeUpload(file: File) {

        const url = import.meta.env.VITE_BACKOFFICE_APP_BASE_URL + `/api/v1/media`;
        const authToken = `Bearer ${Cookies.get("backoffice_token")}`;

        const formData = new FormData();
        if (!file || !file.name) {
            console.error('No file selected or invalid file');
            throw new Error('No file selected or invalid file');
        }
        formData.append('file', file);

        var response = await axios.post(url, formData, {
            headers: {
                "Content-Type": `multipart/form-data;`,
                "Authorization": authToken
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

    // if(uploadToProperties) { 

    //     const response = await companyPropertyRepository.unAttachPropertyMedia(file.upload_id!);
    //   }



}




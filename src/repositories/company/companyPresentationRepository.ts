

import axios from "axios";
import { toast } from "sonner";
// import Cookies from "js-cookie";

export default class companyPresentationRepository {


    public static async getPresentationList(page = 1,) {

        const url = import.meta.env.VITE_API_BASE_URL + `/company/presentation?page=${page}`;
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

    public static async getPresentation(id: string) {

        const url = import.meta.env.VITE_API_BASE_URL + `/company/presentation/${id}`;
        var response = await axios.get(url);
        let obj: any = { success: response.data.success };
        if (response.data.success) {
            obj.data = response.data.payload;
        } else {
            console.log(response.data.message);
        }

        return obj;
    }

    public static async savePresentation() {

        const url = import.meta.env.VITE_API_BASE_URL + `/company/presentation`;
        var response = await axios.post(url);
        let obj: any = { success: response.data.success };
        if (response.data.success) {
            obj.data = response.data.payload;
        } else {
            console.log(response.data.message);
        }

        return obj;
    }

    public static async deletePresentation(id: string) {

        const url = process.env.VITE_API_BASE_URL + `/company/presentation/${id}`;
        var response = await axios.delete(url);
        let obj: any = { success: response.data.success };
        if (response.data.success) {
            obj.data = response.data.payload;
        }
        else {
            console.log(response.data.message)
        }
        return obj;

    };

    public static async getTheme() {
        const url = import.meta.env.VITE_API_BASE_URL + `/company/presentation/getTheme`;
        var response = await axios.get(url);
        return response;
    }

    public static async generatePresentationPdf(presentation_id: string, bg_hex: string, text_bg: string, save:boolean) {
        
        const url = import.meta.env.VITE_API_BASE_URL + `/company/presentation/${presentation_id}/generate?bg-hex=${encodeURIComponent(bg_hex)}&text-hex=${encodeURIComponent(text_bg)}&save=${save}`;
        // const url = import.meta.env.VITE_API_BASE_URL + `/company/presentation/${presentation_id}/generate`;
        var response = await axios.get(url);
        let obj: any = { success: response.data.success };
        if (response.data.success) {
            obj.data = response.data.payload;
        } else {
            console.log(response.data.message);
        }

        return obj;

    }

    public static async downloadPresentationPdf(presentation_id: string) {

        try {

            const toastId = toast.loading("Initializing download...");

            const url = import.meta.env.VITE_API_BASE_URL + `/company/presentation/${presentation_id}/download`;
            var response = await axios.get(url, {
                responseType: 'blob',
                onDownloadProgress: (progressEvent) => {

                    const total = progressEvent.total;
                    const current = progressEvent.loaded;
                    if (total) {
                        const percentCompleted = Math.round((current / total) * 100);
                        toast.loading(`Downloading... ${percentCompleted}%`, {
                            id: toastId
                        });
                    } else {
                        toast.loading(`Downloading... ${(current / 1024 / 1024).toFixed(2)} MB`, {
                            id: toastId
                        });
                    }
                }
            });
            const disposition = response.headers['content-disposition'];
            let fileName = 'download.pdf';
            if (disposition && disposition.includes('filename=')) {
                fileName = disposition.split('filename=')[1].replace(/['"]/g, '');
            }

            const blob = new Blob([response.data], { type: 'application/pdf' });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = fileName;
            link.click();
            window.URL.revokeObjectURL(link.href);

            toast.success(`Downloaded: ${fileName}`, {
                id: toastId,
                duration: 3000
            });

        } catch (error) {
            console.error('Failed to download:', error);
        }
    }

    public static async addPresentationUnit(presentation_id: string, unit_id: number) {
        const url = import.meta.env.VITE_API_BASE_URL + `/company/presentation/${presentation_id}/presentation_unit`;
        var response = await axios.post(url, {
            unit_id
        });
        let obj: any = { success: response.data.success };
        if (response.data.success) {
            obj.data = response.data.payload;
        } else {
            console.log(response.data.message);
        }

        return obj;
    }

    public static async removePresentationUnit(presentation_id: string, unit_id: number) {

        const url = import.meta.env.VITE_API_BASE_URL + `/company/presentation/${presentation_id}/presentation_unit/${unit_id}`;
        var response = await axios.delete(url);
        let obj: any = { success: response.data.success };
        if (response.data.success) {
            obj.data = response.data.payload;
        } else {
            console.log(response.data.message);
        }

        return obj;
    }

    public static async sortPresentationUnit(presentation_id: string, data: any) {

        const url = import.meta.env.VITE_API_BASE_URL + `/company/presentation/${presentation_id}/presentation_unit/sort`;
        var response = await axios.post(url, { units: data });
        let obj: any = { success: response.data.success };
        if (response.data.success) {
            //
        } else {
            console.log(response.data.message);
        }

        return obj;
    }



}
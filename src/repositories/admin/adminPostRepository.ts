import axios from 'axios';
import Cookies from "js-cookie";


export default class adminPostRepository {


    public static async getPosts(page: number, filters: { source: any; }) {

        const url = import.meta.env.VITE_PROPERTIES_APP_BASE_URL + `/posts?page=${page}&source=${filters.source}`;
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

    public static async getPost(referenceId: string) {

        const url = import.meta.env.VITE_PROPERTIES_APP_BASE_URL + `/posts/${referenceId}`;
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

    public static async savePost(data: any) {

        const url = import.meta.env.VITE_PROPERTIES_APP_BASE_URL + '/posts';
        const authToken = `Bearer ${Cookies.get("props_token")}`;
        var response = await axios.post(url, data, {
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

    public static async updatePost(referenceId: string, data: any) {
        const url = import.meta.env.VITE_PROPERTIES_APP_BASE_URL + `/posts/${referenceId}`;
        const authToken = `Bearer ${Cookies.get("props_token")}`;
        var response = await axios.put(url, data, {
            headers: {
                Authorization: authToken,
            },
        });
        let obj: any = { success: response.data.success };
        if (response.data.success) {
            obj.data = response.data.payload;
        } else {
            console.log(response.data.message);
        }

        return obj;
    }

    public static async updatePostStatus(referenceId: string) {

        const url = import.meta.env.VITE_PROPERTIES_APP_BASE_URL + `/posts/${referenceId}/update_status`;
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

    public static async deletePost(referenceId: string) {

        const url = import.meta.env.VITE_PROPERTIES_APP_BASE_URL + `/posts/${referenceId}`;
        const authToken = `Bearer ${Cookies.get("props_token")}`;
        var response = await axios.delete(url, {
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

    public static async attachPostMedia(referenceId: string, type: string, upload_id: any) {
        const url = import.meta.env.VITE_PROPERTIES_APP_BASE_URL + `/posts/${referenceId}/media`;
        const authToken = `Bearer ${Cookies.get("props_token")}`;
        const data = {
            type,
            upload_id,
        };
        var response = await axios.post(url, data, {
            headers: {
                Authorization: authToken,
            },
        });
        let obj: any = { success: response.data.success };
        if (response.data.success) {
            obj.data = response.data.payload;
        }

        return obj;
    }

    public static async unAttachPostMedia(referenceId: string, id: string) {


        const url = import.meta.env.VITE_PROPERTIES_APP_BASE_URL + `/posts/${referenceId}/media/${id}`;
        const authToken = `Bearer ${Cookies.get("props_token")}`;

        var response = await axios.delete(url, {
            headers: {
                Authorization: authToken
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

    public static async updatePostTag(referenceId: string, ids: string) {

        const url = `${import.meta.env.VITE_PROPERTIES_APP_BASE_URL}/posts/${referenceId}/update_tag`;
        const authToken = `Bearer ${Cookies.get("props_token")}`;
        var response = await axios.post(url, { tags: ids }, {
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

    public static async updatePostCategory(referenceId: string, ids: string) {

        const url = `${import.meta.env.VITE_PROPERTIES_APP_BASE_URL}/posts/${referenceId}/update_category`;
        const authToken = `Bearer ${Cookies.get("props_token")}`;
        var response = await axios.post(url, { categories: ids }, {
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

    public static async getPostsCategories(page: number, query: string) {

        // const response = 
        let url = import.meta.env.VITE_PROPERTIES_APP_BASE_URL + `/posts/category?page=${page}&name=${query}`;
        const authToken = `Bearer ${Cookies.get("props_token")}`;


        var response = await axios.get(url, {
            headers: {
                Authorization: authToken,
            },
        });
        let obj: any = { success: response.data.success };
        if (response.data.success) {
            obj.data = response.data.payload;
        } else {
            console.log(response.data.message);
        }

        return obj;

    }

    public static async savePostCategory(name: string) {


        const url = import.meta.env.VITE_PROPERTIES_APP_BASE_URL + '/posts/category';
        const authToken = `Bearer ${Cookies.get("props_token")}`;
        var response = await axios.post(url, { name }, {
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

    public static async removePostCategory(id: string) {

        const url = `${import.meta.env.VITE_PROPERTIES_APP_BASE_URL}/posts/category/${id}`;
        const authToken = `Bearer ${Cookies.get("props_token")}`;
        var response = await axios.delete(url, {
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

    public static async getPostsTags(page: number, query: string) {

        // const response = 
        let url = import.meta.env.VITE_PROPERTIES_APP_BASE_URL + `/posts/tag?page=${page}&name=${query}`;
        const authToken = `Bearer ${Cookies.get("props_token")}`;


        var response = await axios.get(url, {
            headers: {
                Authorization: authToken,
            },
        });
        let obj: any = { success: response.data.success };
        if (response.data.success) {
            obj.data = response.data.payload;
        } else {
            console.log(response.data.message);
        }

        return obj;

    }

    public static async savePostTag(name: string) {


        const url = import.meta.env.VITE_PROPERTIES_APP_BASE_URL + '/posts/tag';
        const authToken = `Bearer ${Cookies.get("props_token")}`;
        var response = await axios.post(url, { name }, {
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

    public static async pullPosts() {

        const url = import.meta.env.VITE_PROPERTIES_APP_BASE_URL + `/posts/pull`;
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




}
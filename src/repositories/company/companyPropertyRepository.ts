import { PropertyFilterType } from "@/providers/propertyContext";
import axios from "axios";
import Cookies from "js-cookie";

export default class companyPropertyRepository {


  public static async saveProperty(data: any) {
    console.log(data);
    const url = import.meta.env.VITE_PROPERTIES_APP_BASE_URL + `/properties`;
    const authToken = `Bearer ${Cookies.get("props_token")}`;
    var response = await axios.post(url, data, {
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

  public static async getProperty(id: string) {
    const url = import.meta.env.VITE_PROPERTIES_APP_BASE_URL + `/properties/${id}`;
    const authToken = `Bearer ${Cookies.get("props_token")}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: authToken,
      },
    });
    let obj: any = { success: response.data.success };
    console.log(response);
    if (response.data.success) {
      obj.data = response.data.payload;
    } else {
      console.log(response.data.message);
    }

    return obj;
  }

  public static async updateProperty(referenceId: string, data: any) {
    console.log(referenceId);
    const url = import.meta.env.VITE_PROPERTIES_APP_BASE_URL + `/properties/${referenceId}`;
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

  public static async syncProperties(source: string, agencyUrl: string) {

    const url = import.meta.env.VITE_PROPERTIES_APP_BASE_URL + `/properties/sync/${source}`;
    const authToken = `Bearer ${Cookies.get("props_token")}`;
    const response = await axios.post(url, { agencyUrl }, {
      headers: {
        Authorization: authToken,
      }
    });
    let obj: any = { success: response.data.success };
    console.log(response);
    if (response.data.success) {
      obj.data = response.data.payload;
    } else {
      console.log(response.data.message);
    }

    return obj;

  }


  public static async syncBayutProperties() {

    const url = import.meta.env.VITE_PROPERTIES_APP_BASE_URL + `/properties/sync/bayut`;
    const authToken = `Bearer ${Cookies.get("props_token")}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: authToken,
      },
    });
    let obj: any = { success: response.data.success };
    console.log(response);
    if (response.data.success) {
      obj.data = response.data.payload;
    } else {
      console.log(response.data.message);
    }

    return obj;

  }


  public static async attachPropertyMedia(referenceId: string, type: string, upload_id: any) {
    const url = import.meta.env.VITE_PROPERTIES_APP_BASE_URL + `/properties/${referenceId}/media`;
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

  public static async unAttachPropertyMedia(referenceId: string, id: string) {


    const url = import.meta.env.VITE_PROPERTIES_APP_BASE_URL + `/properties/${referenceId}/media/${id}`;
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

  public static async getEmirates(size = "full") {

    const url = import.meta.env.VITE_PROPERTIES_APP_BASE_URL + `/emirates?size=${size}`;
    var response = await axios.get(url);
    let obj: any = { success: response.data.success };
    if (response.data.success) {
      obj.data = response.data.payload;
    } else {
      console.log(response.data.message);
    }

    return obj;
  }

  public static async getDistricts(page: number, name = "", emirate_id: string | null, size = "full", limit = 999) {

    let url = import.meta.env.VITE_PROPERTIES_APP_BASE_URL + `/districts?page=${page}&size=${size}&limit=${limit}`;
    if (emirate_id) {
      url = url + `&emirate_id=${emirate_id}`;
    }
    if (name) {
      url = url + `&name=${name}`
    }

    var response = await axios.get(url);
    let obj: any = { success: response.data.success };
    if (response.data.success) {
      obj.data = response.data.payload;
    } else {
      console.log(response.data.message);
    }

    return obj;
  }

  public static async getDevelopers(page: number, name = "") {

    let url = import.meta.env.VITE_PROPERTIES_APP_BASE_URL + `/developers?page=${page}`;
    if (name) {
      url = url + `&name=${name}`
    }

    var response = await axios.get(url);
    let obj: any = { success: response.data.success };
    if (response.data.success) {
      obj.data = response.data.payload;
    } else {
      console.log(response.data.message);
    }

    return obj;
  }

  public static async getProperties(page: number, filters: PropertyFilterType) {


    const params = new URLSearchParams({
      limit: '8',
      order_by: filters.orderBy,
    });


    if (filters.emirate_id) params.append('emirate_id', String(filters.emirate_id));
    if (filters.district_id) params.append('district_id', String(filters.district_id));
    if (filters.name) params.append('name', String(filters.name));
    

    const baseUrl = import.meta.env.VITE_PROPERTIES_APP_BASE_URL + `/properties?page=${page}&source=admin`;
    const url = `${baseUrl}?${params.toString()}`;

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

  public static async getBuildings(page: number, name = "") {
    const url = import.meta.env.VITE_PROPERTIES_APP_BASE_URL + `/buildings?page=${page}&name=${name}`;
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

  public static async getAreas(page = 1, name = "") {
    const url = import.meta.env.VITE_PROPERTIES_APP_BASE_URL + `/areas?page=${page}&name=${name}`;
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

  public static async getAmenities() {
    const url = import.meta.env.VITE_PROPERTIES_APP_BASE_URL + `/amenities`;
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

}

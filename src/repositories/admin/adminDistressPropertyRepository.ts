import axios from "axios";
import Cookies from "js-cookie";

export default class adminDistressPropertyRepository {


  public static async saveProperty(data: any) {
    console.log(data);
    const url = import.meta.env.VITE_PROPERTIES_APP_BASE_URL + `/properties/offplan`;
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

  public static async getProperty(id: string, source = "") {
    let url = import.meta.env.VITE_PROPERTIES_APP_BASE_URL + `/properties/distress/${id}`;
    if (source.length > 0) {
      url = `${url}?source=${source}`
    }
    const authToken = `Bearer ${Cookies.get("props_token")}`;
    const response = await axios.get(url, {
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

  public static async updateProperty(referenceId: string, data: any) {
    const url = import.meta.env.VITE_PROPERTIES_APP_BASE_URL + `/properties/distress/${referenceId}`;
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

  public static async updatePropertyStatus(referenceId: string) {

    const url = import.meta.env.VITE_PROPERTIES_APP_BASE_URL + `/properties/distress/${referenceId}/update_status`;
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

  public static async deleteProperty(referenceId: string) {

    const url = import.meta.env.VITE_PROPERTIES_APP_BASE_URL + `/properties/distress/${referenceId}`;
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


  public static async attachPropertyMedia(referenceId: string, type: string, upload_id: any) {
    const url = import.meta.env.VITE_PROPERTIES_APP_BASE_URL + `/properties/offplan/${referenceId}/media`;
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


    const url = import.meta.env.VITE_PROPERTIES_APP_BASE_URL + `/properties/offplan/${referenceId}/media/${id}`;
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


    let url = import.meta.env.VITE_PROPERTIES_APP_BASE_URL + `/districts?page=${page}size=${size}&limit=${limit}`;
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

  public static async getProperties(page: number, filters: string) {
    console.log(filters)
    const url = import.meta.env.VITE_PROPERTIES_APP_BASE_URL + `/properties?page=${page}`;
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

  public static async getUnits(property_id: string) {
    const url = import.meta.env.VITE_PROPERTIES_APP_BASE_URL + `/properties/offplan/${property_id}/units?limit=999`;
    const authToken = `Bearer ${Cookies.get("props_token")}`;
    const response = await axios.get(url,
      {
        headers: {
          Authorization: authToken,
        },
      }
    );

    let obj: any = { success: response.data.success };
    if (response.data.success) {
      obj.data = response.data.payload;
    } else {
      console.log(response.data.message);
    }
    return obj;
  }

  public static async addUnit(property_id: string, data: any) {
    const url = import.meta.env.VITE_PROPERTIES_APP_BASE_URL + `/properties/offplan/${property_id}/units`;
    const authToken = `Bearer ${Cookies.get("props_token")}`;
    const response = await axios.post(url, data, {
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


  public static async updateUnit(property_id: string, unit_id: string, data: any) {
    const url = import.meta.env.VITE_PROPERTIES_APP_BASE_URL + `/properties/offplan/${property_id}/units/${unit_id}`;
    const authToken = `Bearer ${Cookies.get("props_token")}`;
    const response = await axios.put(url, data, {
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

  public static async deleteUnit(property_id: string, unit_id: string) {
    const url = import.meta.env.VITE_PROPERTIES_APP_BASE_URL + `/properties/offplan/${property_id}/units/${unit_id}`;
    const authToken = `Bearer ${Cookies.get("props_token")}`;
    const response = await axios.delete(url, {
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


  public static async attachPropertyUnitMedia(referenceId: string, unit_id: string, type: string, upload_id: any) {
    const url = import.meta.env.VITE_PROPERTIES_APP_BASE_URL + `/properties/offplan/${referenceId}/units/${unit_id}/media`;
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

  public static async unAttachPropertyUnitMedia(referenceId: string, unit_id: string, id: string) {

    const url = import.meta.env.VITE_PROPERTIES_APP_BASE_URL + `/properties/offplan/${referenceId}/units/${unit_id}/media/${id}`;
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




}

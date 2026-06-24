import { PropertyFilterType } from "@/providers/propertyContext";
import axios from "axios";
import Cookies from "js-cookie";

export default class companyOffPlanRepository {


  public static async getProjects(page: number, filters: PropertyFilterType, view: string) {
    console.log(filters)
    const baseUrl = import.meta.env.VITE_PROPERTIES_APP_BASE_URL + `/properties/offplan/elastic`;
    console.log(filters.homeTypes)
    const params = new URLSearchParams({
      property_types: filters.homeTypes ? filters.homeTypes.join(',') : '',
      size: 'xs',
      page: String(page),
      view,
      limit: '8',
      order_by: filters.orderBy,
      center_lat: String(filters.centerMap[1]),
      center_lng: String(filters.centerMap[0]),
      zoom: String(filters.zoomMap),
      min_lng: String(filters.boundsMap.southWest[0]),
      min_lat: String(filters.boundsMap.southWest[1]),
      max_lng: String(filters.boundsMap.northEast[0]),
      max_lat: String(filters.boundsMap.northEast[1])
    });

    // Add optional filters dynamically
    if (filters.emirate_id) params.append('emirate_id', String(filters.emirate_id));
    if (filters.district_id) params.append('district_id', String(filters.district_id));
    if (filters.price?.min && filters.price?.max) {
      params.append('min_price', String(filters.price.min));
      params.append('max_price', String(filters.price.max));
    }
    console.log(filters.size)
    if (filters.size?.min && filters.size?.max) {
      params.append('min_square', String(filters.size.min));
      params.append('max_square', String(filters.size.max));
    }

    if (filters.bedsAndBaths && filters.bedsAndBaths.baths) {
      params.append('bathrooms', String(filters.bedsAndBaths.baths));
    }

    if (filters.bedsAndBaths && filters.bedsAndBaths.beds) {
      params.append('bedrooms', String(filters.bedsAndBaths.beds));
    }

    if (filters.developer_id) params.append('developer_id', String(filters.developer_id));
    if (filters.name) params.append('name', filters.name);
    if (filters.source) params.append('source', filters.source);

    const url = `${baseUrl}?${params.toString()}`;
    const authToken = `Bearer ${Cookies.get('props_token')}`;
    var response = await axios.get(url, {
      headers: {
        Authorization: authToken
      }
    });
    console.log('response recived')
    let obj: any = { success: response.data.success };
    if (response.data.success) {
      obj.data = response.data.payload;
    } else {
      console.log(response.data.message);
    }

    return obj;


  }

  public static async getProject(id: string) {
    const url = import.meta.env.VITE_PROPERTIES_APP_BASE_URL + `/properties/offplan/${id}`;
    const authToken = `Bearer ${Cookies.get('props_token')}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: authToken
      }
    });
    let obj: any = { success: response.data.success };
    console.log(response)
    if (response.data.success) {
      obj.data = response.data.payload;
    } else {
      console.log(response.data.message);
    }

    return obj;
  }

  public static async attachPropertyMedia(referenceId: string, type: string, upload_id: any) {
    console.log(type)
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
  // public static async companyLoginBySupertoken(token : string) {

  //     const url = import.meta.env.VITE_API_BASE_URL + `/company/loginBySuperToken?supertoken=${token}`;
  //     var response = await axios.get(url);
  //     let obj: any = { success: response.data.success };
  //     if (response.data.success) {
  //         obj.data = response.data.payload;
  //     }
  //     else {
  //         console.log(response.data.message)
  //     }

  //     return obj;
  // }

  // public static async companyLogin(data:{ email: string , password : string }) {

  //     const url = import.meta.env.VITE_API_BASE_URL + `/company/login`;
  //     var response = await axios.post(url,{email:data.email,password:data.password});
  //     let obj: any = { success: response.data.success , data: response.data.payload  ,message:response.data.message };
  //     return obj;

  // }

  // public static async companyDetails() {

  //     const url = import.meta.env.VITE_API_BASE_URL + `/company`;
  //     var response = await axios.get(url);
  //     let obj: any = { success: response.data.success };
  //     if (response.data.success) {
  //         obj.data = response.data.payload;
  //     }
  //     else {
  //         console.log(response.data.message)
  //     }

  //     return obj;
  // }
}

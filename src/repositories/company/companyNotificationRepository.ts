import axios from "axios";

export default class companyNotificationRepository {
  public static async getNotifications(page : number) {
    const url = import.meta.env.VITE_API_BASE_URL + `/notification?page=${page}`;
    var response = await axios.get(url);
    let obj: any = { success: response.data.success };
    if (response.data.success) {
      obj.data = response.data.payload;
    } else {
      console.log(response.data.message);
    }

    return obj;
  }
}

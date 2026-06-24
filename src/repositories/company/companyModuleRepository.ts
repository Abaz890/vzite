import axios from "axios";

export default class companyModuleRepository {
  public static async getModuleDetails(module_id: string) {
    const url = import.meta.env.VITE_API_BASE_URL + `/company/module/${module_id}`;
    var response = await axios.get(url);
    let obj: any = { success: response.data.success };
    if (response.data.success) {
      obj.data = response.data.payload;
    } else {
      console.log(response.data.message);
    }

    return obj;
  }

  public static async getModuleItemsList(page = 1, module_name: string, query: string, limit = 10, filter: string, custom_filter: string) {
    let url = import.meta.env.VITE_API_BASE_URL + `/company/module/${module_name}/items/list?page=${page}&limit=${limit}`;
    if (query.length > 0) {
      url = `${url}&${query}`;
    }
    if (filter) {
      url = url + `&filter=${filter}`;
    }
    if (custom_filter) {
      url = url + `&${custom_filter}`
    }
    var response = await axios.get(url);
    let obj: any = { success: response.data.success, message: response.data.message };
    if (response.data.success) {
      obj.data = response.data.payload;
    } else {
      console.log(response.data.message);
    }

    return obj;
  }

  public static async getModuleItemsKanban(group = "status", module_name: string, filter: string, custom_filter: string) {
    console.log('filter val', filter);
    let url = import.meta.env.VITE_API_BASE_URL + `/company/module/${module_name}/items/kanban?group=${group}`;
    if (filter) {
      url = url + `&filter=${filter}`;
    }
    if (custom_filter) {
      url = url + `&${custom_filter}`
    }
    var response = await axios.get(url);
    let obj: any = { success: response.data.success, message: response.data.message };
    if (response.data.success) {
      obj.data = response.data.payload;
    } else {
      console.log(response.data.message);
    }

    return obj;
  }

  public static async updateModuleItemsKanbanSorting(module_name: string, data: any) {
    const url = import.meta.env.VITE_API_BASE_URL + `/company/module/${module_name}/items/kanban/update_sorting?group=${data.group}`;
    var response = await axios.post(url, data);
    let obj: any = { success: response.data.success };
    if (response.data.success) {
      obj.data = response.data.payload;
    } else {
      console.log(response.data.message);
    }
    return obj;
  }

  public static async getModuleItemsKanbanPagination(module_name: string, data: any) {
    let url = import.meta.env.VITE_API_BASE_URL + `/company/module/${module_name}/items/kanban/load_pagination?page=${data.page}&column=${data.column}&group=${data.group}&filter=${data.filter}`;
    if (data.custom_filter) {
      url = url + data.custom_filter;
    }
    const response = await axios.get(url);
    let obj: any = { success: response.data.success };
    if (response.data.success) {
      obj.data = response.data.payload;
    } else {
      console.log(response.data.message);
    }

    return obj;
  }

  public static async getModuleItemDetails(module_name: string, id: any) {
    const url = import.meta.env.VITE_API_BASE_URL + `/company/module/${module_name}/items/${id}`;
    var response = await axios.get(url);
    let obj: any = { success: response.data.success };
    if (response.data.success) {
      obj.data = response.data.payload;
    } else {
      console.log(response.data.message);
    }
    return obj;
  }

  public static async saveModuleItem(module_name: string, data: any) {
    const url = import.meta.env.VITE_API_BASE_URL + `/company/module/${module_name}/items`;
    var response = await axios.post(url, data);
    let obj: any = { success: response.data.success, message: response.data.message };
    if (response.data.success) {
      obj.data = response.data.payload;
    } else {
      console.log(response.data.message);
    }
    return obj;
  }

  public static async updateModuleItem(id: any, module_name: string, data: any) {
    const url = import.meta.env.VITE_API_BASE_URL + `/company/module/${module_name}/items/${id}`;
    var response = await axios.put(url, data);
    let obj: any = { success: response.data.success, message: response.data.message };
    if (response.data.success) {
      obj.data = response.data.payload;
    } else {
      console.log(response.data.message);
    }
    return obj;
  }

  public static async deleteModuleItem(id: any, module_name: string) {
    const url = import.meta.env.VITE_API_BASE_URL + `/company/module/${module_name}/items/${id}`;
    var response = await axios.delete(url);
    let obj: any = { success: response.data.success, message: response.data.message };
    if (response.data.success) {
      obj.data = response.data.payload;
    }
    return obj;
  }


  public static async bulkDeleteModuleItem(module_name: string, items_ids: string[]) {
    const url = import.meta.env.VITE_API_BASE_URL + `/company/module/${module_name}/items/bulk_delete`;
    const data = {
      items_ids
    };
    var response = await axios.post(url, data);
    let obj: any = { success: response.data.success, message: response.data.message };
    if (response.data.success) {
      obj.data = response.data.payload;
    }
    return obj;
  }


  public static async bulkAssignModuleItem(module_name: string, items_ids: string[], agent_id: string) {
    const url = import.meta.env.VITE_API_BASE_URL + `/company/module/${module_name}/items/bulk_assign`;
    const data = {
      agent_id,
      items_ids
    };
    var response = await axios.post(url, data);
    let obj: any = { success: response.data.success, message: response.data.message };
    if (response.data.success) {
      obj.data = response.data.payload;
    }
    return obj;
  }




  public static async getModuleItemActivities(module_name: string, id: any) {
    const url = import.meta.env.VITE_API_BASE_URL + `/company/module/${module_name}/items/${id}/activities`;
    var response = await axios.get(url);
    let obj: any = { success: response.data.success };
    if (response.data.success) {
      obj.data = response.data.payload;
    } else {
      console.log(response.data.message);
    }
    return obj;
  }

  public static async getModuleItemComments(module_name: string, id: any) {
    const url = import.meta.env.VITE_API_BASE_URL + `/company/module/${module_name}/items/${id}/comments`;
    var response = await axios.get(url);
    let obj: any = { success: response.data.success };
    if (response.data.success) {
      obj.data = response.data.payload;
    } else {
      console.log(response.data.message);
    }
    return obj;
  }

  public static async saveModuleItemComment(module_name: string, id: any, data: any) {
    const url = import.meta.env.VITE_API_BASE_URL + `/company/module/${module_name}/items/${id}/comments`;
    var response = await axios.post(url, data);
    let obj: any = { success: response.data.success, message: response.data.message };
    if (response.data.success) {
      obj.data = response.data.payload;
    } else {
      console.log(response.data.message);
    }
    return obj;
  }

  public static async getModuleItemNotes(module_name: string, id: any) {
    const url = import.meta.env.VITE_API_BASE_URL + `/company/module/${module_name}/items/${id}/notes`;
    var response = await axios.get(url);
    let obj: any = { success: response.data.success };
    if (response.data.success) {
      obj.data = response.data.payload;
    } else {
      console.log(response.data.message);
    }
    return obj;
  }

  public static async saveModuleItemNote(module_name: string, id: any, data: any) {
    const url = import.meta.env.VITE_API_BASE_URL + `/company/module/${module_name}/items/${id}/notes`;
    var response = await axios.post(url, data);
    let obj: any = { success: response.data.success, message: response.data.message };
    if (response.data.success) {
      obj.data = response.data.payload;
    } else {
      console.log(response.data.message);
    }
    return obj;
  }

  public static async getModuleItemAttachments(module_name: string, id: any) {
    const url = import.meta.env.VITE_API_BASE_URL + `/company/module/${module_name}/items/${id}/attachments`;
    var response = await axios.get(url);
    let obj: any = { success: response.data.success };
    if (response.data.success) {
      obj.data = response.data.payload;
    } else {
      console.log(response.data.message);
    }
    return obj;
  }

  public static async saveModuleItemAttachment(module_name: string, id: any, data: any) {
    const url = import.meta.env.VITE_API_BASE_URL + `/company/module/${module_name}/items/${id}/attachments`;
    var response = await axios.post(url, data);
    let obj: any = { success: response.data.success, message: response.data.message };
    if (response.data.success) {
      obj.data = response.data.payload;
    } else {
      console.log(response.data.message);
    }
    return obj;
  }

  public static async getModuleFields(module_name: string) {
    const url = import.meta.env.VITE_API_BASE_URL + `/company/module/${module_name}/fields`;
    var response = await axios.get(url);
    let obj: any = { success: response.data.success };
    if (response.data.success) {
      obj.data = response.data.payload;
    } else {
      console.log(response.data.message);
    }
    return obj;
  }

  public static async getModuleFieldsGrouped(module_name: string) {
    const url = import.meta.env.VITE_API_BASE_URL + `/company/module/${module_name}/grouped_fields`;
    var response = await axios.get(url);
    let obj: any = { success: response.data.success };
    if (response.data.success) {
      obj.data = response.data.payload;
    } else {
      console.log(response.data.message);
    }
    return obj;
  }

  public static async getModuleSelectRelationalValues(module_name: string, page: number, search = "") {
    let url = import.meta.env.VITE_API_BASE_URL + `/company/module/${module_name}/field_values?page=${page}`;
    if (search.length > 0) {
      url = `${url}&search=${search}`;
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

  public static async getModuleFieldsWithRelated(module_name: string) {
    const url = import.meta.env.VITE_API_BASE_URL + `/company/module/${module_name}/fields_with_related`;
    var response = await axios.get(url);
    let obj: any = { success: response.data.success };
    if (response.data.success) {
      obj.data = response.data.payload;
    } else {
      console.log(response.data.message);
    }
    return obj;
  }

  public static async getModuleImportPerp(module_name: string, file: File) {
    const url = import.meta.env.VITE_API_BASE_URL + `/company/module/${module_name}/items/import/prep`;

    const formData = new FormData();
    if (!file || !file.name) {
      console.error("No file selected or invalid file");
      throw new Error("No file selected or invalid file");
    }
    // const fileBlob = new Blob([file]);
    formData.append("file", file);

    var response = await axios.post(url, formData, {
      headers: {
        "Content-Type": `multipart/form-data;`,
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

  public static async getModuleImportExec(module_name: string, data: any, file: File) {
    const url = import.meta.env.VITE_API_BASE_URL + `/company/module/${module_name}/items/import/exec`;
    const formData = new FormData();
    if (!file || !file.name) {
      throw new Error("No file selected or invalid file");
    }
    formData.append("file", file);
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    var response = await axios.post(url, formData, {
      headers: {
        "Content-Type": `multipart/form-data;`,
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

  public static async getModuleImportTasks(module_name: string) {
    const url = import.meta.env.VITE_API_BASE_URL + `/company/module/${module_name}/items/import/tasks`;
    var response = await axios.get(url);
    let obj: any = { success: response.data.success };
    if (response.data.success) {
      obj.data = response.data.payload;
    } else {
      console.log(response.data.message);
    }
    return obj;
  }

  public static async deleteModuleImportTask(module_name: string, import_task_id: string) {
    const url = import.meta.env.VITE_API_BASE_URL + `/company/module/${module_name}/items/import/tasks/${import_task_id}`;
    var response = await axios.delete(url);
    let obj: any = { success: response.data.success };
    if (response.data.success) {
      obj.data = response.data.payload;
    } else {
      console.log(response.data.message);
    }
    return obj;
  }

  public static async getModuleDeletImportTasks(module_name: string) {
    const url = import.meta.env.VITE_API_BASE_URL + `/company/module/${module_name}/items/import/delete_tasks`;
    var response = await axios.get(url);
    let obj: any = { success: response.data.success };
    if (response.data.success) {
      obj.data = response.data.payload;
    } else {
      console.log(response.data.message);
    }
    return obj;
  }

  public static async getModuleFilters(module_name: string) {
    const url = import.meta.env.VITE_API_BASE_URL + `/company/module/${module_name}/filters`;
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

import axios from "axios";
import ToastService from "../services/ToastService";

//const api = axios.create({ baseURL: "https://localhost:7052/api/" });
const api = axios.create({ baseURL: "https://localhost:7161/api/" });

const addTokenHeader = () => {
    api.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem("Token")}`;
}
const addContentJson = () => { api.defaults.headers.common['Content-Type'] = 'application/json' };

export const Api = {
    async handleRequestGetAsync(requestUrl) {
        try {
            addContentJson();
            addTokenHeader();
                const res = await api.get(requestUrl)
                return { data: res.data, status: res.status }
           

        } catch (error) {
            let res;
            if (!error.response) res = { data: error.message, status: error.code };
            else res = { data: error.response.data.title, status: error.response.status };
            return res;
        }
    },
    async handleRequestPostAsync(requestUrl, requestData, hasToken = true) {
        addContentJson();

        if (hasToken) {
          addTokenHeader();
        }
      
        try {
          const response = await api.post(requestUrl, requestData);
          return handleSuccess(response);
        } catch (error) {
          return handleErrors(error);
        }

       },
    async handleRequestPutAsync(requestUrl, requestData) {
            addTokenHeader();
        
          try {
            const response = await api.put(requestUrl, requestData);
            return handleSuccess(response);
          } catch (error) {
            return handleErrors(error);
          }
    },
    async handleRequestDeleteAsync(requestUrl, id) {        
            addTokenHeader();            

            try {          
                const response = await api.delete(`${requestUrl}?id=${id}`);
              return handleSuccess(response);
            } catch (error) {
              return handleErrors(error);
            }
    },

    async handleRequestPatchAsync(requestUrl, requestData) {
        try {
            addTokenHeader();
            const res = await api.patch(requestUrl, requestData);
            return { data: res.data, status: res.status };
        } catch (error) {
            let res;
            if (!error.response) {
                res = { data: error.message, status: error.code };
            } else {
                res = { data: error.response.data.title, status: error.response.status };
            }
            return res;
        }
    }
}
const handleErrors = (error) => {
    if (!error.response) {
      ToastService.toastError('Network error');
      return { data: null, status: null };
    }
  
    const { data, status } = error.response;
  
    if (data.errors) {
      const firstError = Object.keys(data.errors)[0];
      ToastService.toastWarning(data.errors[firstError][0] || data.message);
    } else {
        ToastService.toastWarning(data.message);
    }
  
    return { data, status };
  };
  
  const handleSuccess = (response) => {
    //console.log(response);
    ToastService.toastSuccess(response.data.message);
    return { data: response.data, status: response.status };
  };
  



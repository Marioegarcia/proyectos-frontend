import { basePath, apiVersion} from "./config";

export function postRegistroApi(data) {
   
    const url = `${basePath}/visitas`;
    const params = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    };
  
    return fetch(url, params)
      .then(response => {
        return response.json();
      })
      .then(result => {
      
        return { ok: true, message: result.message };
      })
      .catch(err => {
        return { ok: false, message: err.message };
      });
}

export function getVisitasApi() {
  
    const url = `${basePath}/lista-visitas`;
    
  
    return fetch(url)
      .then(response => {
        
        return response.json();
      })
      .then(result => {
       
        return { ok: true, message: 'exito',result };
      })
      .catch(err => {
        return { ok: false, message: err.message };
      });
}

export function deleteVisitaApi(id) {
    
    const url = `${basePath}/delete-visita/${id}`;
  
    const params = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
        
      }
    };
  
    return fetch(url, params)
      .then(response => {
        return response.json();
      })
      .then(result => {
        return result;
      })
      .catch(err => {
        return err;
      });
  }
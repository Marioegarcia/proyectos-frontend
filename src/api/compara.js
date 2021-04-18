import { basePath, apiVersion} from "./config";

export function getML(val) {
    
    const url = `${basePath}/scraping-mercado-libre`;
    const params = {
      method: "POST",
      body: JSON.stringify(val),
      headers: {
        "Content-Type": "application/json"
      }
    };
  
    return fetch(url, params)
      .then(response => {
        return response.json();
      })
      .then(result => {
      
        return { ok: true, mercado: result.mercado ,message: result.message };
      })
      .catch(err => {
        return { ok: false, message: err.message };
      });
    
}
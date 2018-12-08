import fetch from 'isomorphic-fetch';
import { Feedback } from "@icedesign/base";
const Toast = Feedback.toast;



const checkHttpStatus = (response) => {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
}

const checkResponseStatus = (response) => {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    throw new Error(response.message);
}

  function parseJSON(response) {
    return response.json();
  }
 
 const post = (url , data) => {
    
    //设置accessToken
    const accessToken = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");
    let headers = { 'Content-Type': 'application/json', 'credentials': 'include' }  
    headers = accessToken ? {...headers}:{...headers,accessToken};
    const opt = { method:"post" , 
                  body: JSON.stringify(data), 
                  headers             
                } ;
    return fetch(url,opt)
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(checkResponseStatus)
            .then(response=>response.data)
            .catch(error=>{
                Toast.error(error.message);
                return false;
            });
   } 

   const get = (url) => {
    //设置accessToken
    const accessToken = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");
    let headers = {'credentials': 'include' }  
    headers = accessToken ? {...headers,accessToken}: {...headers};
    const opt = { method:"get" ,  
                  headers             
                } ;
    return fetch(url,opt)
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(checkResponseStatus)
            .then(response=>response.data)
            .catch(error=>{
                Toast.error(error.message);
                return false;
            });
   } 

   export default {post,get};
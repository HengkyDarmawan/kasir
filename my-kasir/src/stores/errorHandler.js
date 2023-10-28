export default function errorHandler(err, func) {
    if (err.response) {
        if (err.response.status === 401) {
            
        } else if (err.response.status === 403) {
            
        } else if (err.response.status === 404) {
            
        }else {
               
        }
    }else{
        
    }
}

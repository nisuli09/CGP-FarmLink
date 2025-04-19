export const createRequest = async(url, data, method = 'POST') => {
    console.log(`Making ${method} request to api/${url} with data:`, data);
    
    return await fetch('api/' + url, {
            method: method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data ? data : {})
        })
        .then(response => {
            console.log(`Response status from api/${url}:`, response.status);
            return response.json();
        })
        .then(data => {
            console.log(`Received data from api/${url}:`, data);
            return data;
        })
        .catch(error => {
            console.error(`Error in api/${url}:`, error);
            throw error;
        });
}
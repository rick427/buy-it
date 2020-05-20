function catchErrors(error, displayError){
    let errorMsg;
    if(error.response){
        // The request was made and the server responded with a status code
        // not in the range of 2XX
        errorMsg = error.response.data;
        console.error('Error response', errorMsg);

        // For cloudinary image uploads
        if(error.response.data.error){
            errorMsg = error.response.data.error.message;
        }
    }
    else if (error.request){
        // The request was made, but no response was received
        errorMsg = error.request;
        console.error('Error request')
    }
    else{
        // Something else happened in making the request that triggered an error
        errorMsg = error.message;
        console.error('Error request', errorMsg)
    }
    displayError(errorMsg);
}

export default catchErrors;
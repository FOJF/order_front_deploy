export function getErrorMessage(error) {
    if (error.response && error.response.data && error.response.data.message) {
        return error.response.data.message;
    } else if (error.message) {
        return error.message;
    } else {
        return "An unknown error occurred.";
    }
}

export function getResultData(response) {
    return response.data.data;
}
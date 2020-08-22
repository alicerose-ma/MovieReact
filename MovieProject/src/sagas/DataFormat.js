export const successResponse = (apiName, response) => {
    return {
        "apiName": apiName,
        "success": response.data.success || true,
        "status": response.status,
        "errMessage": response.status_message || '',
        "data": response.data,
    }
}

export const failResponse = (apiName, err) => {
    return {
        "apiName": apiName,
        "success": err.response.data.success || false,
        "status": err.response.status,
        "errMessage": err.response.data.status_message || 'An error occurs. Please retry',
    }
}
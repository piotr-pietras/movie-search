export const loading = (isLoading) => {
    if(isLoading) return{ type: "START_LOADING" }
    else return{ type: "STOP_LOADING" }
}
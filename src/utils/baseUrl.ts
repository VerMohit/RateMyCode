
export const getBaseUrlClientSide = () => {
    const protocol = window.location.protocol;
    const hostname = window.location.hostname;
    
    const backendPORT = 3005;
    
    return `${protocol}//${hostname}:${backendPORT}/api/database`;
}
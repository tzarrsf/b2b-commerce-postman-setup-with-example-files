const baseplateBanner = () => {
    console.log(`${pm.info.requestName} Tests...`);
    console.warn(`Code: ${pm.response.code} | Status: ${pm.response.status} | Response time: ${pm.response.responseTime} ms`);
}

baseplateBanner();

//console.warn(pm.request.getHeaders());
//console.warn(pm.request.auth.response);
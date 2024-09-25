console.log(`${pm.info.requestName} Tests...`);
console.warn(`Code: ${pm.response.code} | Status: ${pm.response.status} | Response time: ${pm.response.responseTime} ms`);
const expectedResponseCodes = [201];
pm.expect(pm.response.code).to.be.oneOf(expectedResponseCodes, "Response code not in expected range");
console.log(`${pm.info.requestName} Tests...`);
console.warn(`Code: ${pm.response.code} | Status: ${pm.response.status} | Response time: ${pm.response.responseTime} ms`);
const expectedResponseCodes = [200, 201];
pm.expect(pm.response.code).to.be.oneOf(expectedResponseCodes, "Response code not in expected range");

const responseJson = pm.response.json();
pm.collectionVariables.set('_addressId', responseJson.addressId);
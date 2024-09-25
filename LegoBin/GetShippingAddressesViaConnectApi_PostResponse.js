console.log(`${pm.info.requestName} Tests...`);
console.warn(`Code: ${pm.response.code} | Status: ${pm.response.status} | Response time: ${pm.response.responseTime} ms`);
const expectedResponseCodes = [200];
pm.expect(pm.response.code).to.be.oneOf(expectedResponseCodes, "Response code not in expected range");

const responseJson = pm.response.json();
const addressList = responseJson.items;
const context = pm.environment.name ? pm.environment : pm.collectionVariables;
context.set('_addressId', addressList[0].addressId);
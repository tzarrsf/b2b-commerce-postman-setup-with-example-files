console.log(`${pm.info.requestName} Tests...`);
console.warn(`Code: ${pm.response.code} | Status: ${pm.response.status} | Response time: ${pm.response.responseTime} ms`);
const expectedResponseCodes = [200];
pm.expect(pm.response.code).to.be.oneOf(expectedResponseCodes, "Response code not in expected range");

pm.test('Response is valid and has a JSON body', () => {
     pm.response.to.be.success;
     pm.response.to.be.withBody;
     pm.response.to.be.json;
});

const jsonData = pm.response.json();

pm.test('Cart is empty', () => {
    pm.expect(jsonData.cartItems).to.exist;
    pm.expect(jsonData.cartItems).to.be.empty;
    pm.expect(pm.collectionVariables.has('_cartItems').valueOf(false));
});

console.log('Double-check Cart item count: ' + jsonData.cartItems.length);
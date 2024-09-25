console.log(`${pm.info.requestName} Tests...`);
console.warn(`Code: ${pm.response.code} | Status: ${pm.response.status} | Response time: ${pm.response.responseTime} ms`);

if(pm.response.code === 400){
    pm.expect.fail("Buyer cart not clean. Suggested fix: Log in to storefront, empty cart and run this folder again.");
}

const expectedResponseCodes = [200];
pm.expect(pm.response.code).to.be.oneOf(expectedResponseCodes, "Response code not in expected range");

pm.test('Response is valid and has a JSON body', () => {
    pm.response.to.be.success;
    pm.response.to.be.withBody;
    pm.response.to.be.json;
});

pm.test('Validate the response contains a cart Id and set the collection variables', () => {
    const jsonData = pm.response.json();
    pm.expect(jsonData.cartId).to.exist;
    pm.expect(jsonData.cartId).to.be.an('string');
    pm.collectionVariables.set('_cartStateOrId', jsonData.cartId);
});
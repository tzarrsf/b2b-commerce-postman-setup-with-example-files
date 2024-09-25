console.log(`${pm.info.requestName} Tests...`);
console.warn(`Code: ${pm.response.code} | Status: ${pm.response.status} | Response time: ${pm.response.responseTime} ms`);
const expectedResponseCodes = [202, 201, 200];
pm.expect(pm.response.code).to.be.oneOf(expectedResponseCodes, "Response code not in expected range");

pm.test('Response is valid and has a JSON body', () => {
    pm.response.to.be.success;
    pm.response.to.be.withBody;
    pm.response.to.be.json;
});

/*
pm.test('Validate the response', () => {
    const jsonData = pm.response.json();
    pm.expect(jsonData.cartItemId).to.exist;
    pm.expect(jsonData.cartItemId).to.be.a.string;
    pm.collectionVariables.set('_cartStateOrId', jsonData.cartItemId);
});
*/
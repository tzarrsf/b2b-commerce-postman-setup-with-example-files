const buyerBanner = () => {
    console.log(`${pm.info.requestName} Tests...`);
    console.warn(`Code: ${pm.response.code} | Status: ${pm.response.status} | Response time: ${pm.response.responseTime} ms | Buyer: ${pm.environment.get('buyerUsername')} | Account: ${pm.environment.get('buyerAccountName')}`);

}

buyerBanner();

const validateSession = (jsonData) => {
    if(jsonData[0] !== undefined && jsonData[0].message !== undefined && jsonData[0].errorCode !== undefined &&
        (jsonData[0].message.toUpperCase() === 'SESSION EXPIRED OR INVALID' || jsonData[0].errorCode.toUpperCase() === 'INVALID_SESSION_ID')) {
        const msg = 'Steps to fix issue "Expected oAuth 2.0 token found but likely expired":\r\n' + 
        '1. Check in Setup -> OAuth and OpenID Connect Settings -> Allow OAuth Username-Password Flows: Enabled \r\n' +
        '2. Click on the Request with a name like "Set your oAuth 2.0 Token in Authorization tab"\r\n' +
        '3. Click the "Authorization" tab\r\n' + 
        '4. Click the "Get New Access Token" button\r\n' +
        '5. Click the "Proceed" button\r\n' + 
        '6. Click the "Use Token" button\r\n' +
        '7. Retry your request';
        console.error(msg);
        pm.expect.fail('oAuth 2.0 token found but likely expired. See steps above for a fix.');
    }
};

const jsonData = pm.response.json();
validateSession(jsonData);

const expectedResponseCodes = [201];
pm.expect(pm.response.code).to.be.oneOf(expectedResponseCodes, "Response code not in expected range");

pm.test('Response is valid and has a JSON body', () => {
    pm.response.to.be.success;
    pm.response.to.be.withBody;
    pm.response.to.be.json;
});

pm.test('Validate the response and save the product id to a collection variable', () => {
    pm.expect(jsonData.productsPage).to.exist;
    pm.expect(jsonData.productsPage).to.be.an('object');
    pm.expect(jsonData.productsPage.products).to.exist;
    pm.expect(jsonData.productsPage.products).to.be.an('array');
    pm.expect(jsonData.productsPage.products[0]).to.exist;
    pm.expect(jsonData.productsPage.products[0]).to.be.an('object');
    pm.expect(jsonData.productsPage.products[0]).to.exist;
    pm.expect(jsonData.productsPage.products[0].id).to.be.an('string');
    pm.collectionVariables.set('_productId', jsonData.productsPage.products[0].id);
});
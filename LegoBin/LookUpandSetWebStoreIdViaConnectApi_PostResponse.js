const baseplateBanner = () => {
    console.log(`${pm.info.requestName} Tests...`);
    console.warn(`Code: ${pm.response.code} | Status: ${pm.response.status} | Response time: ${pm.response.responseTime} ms`);
}

baseplateBanner();

const expectedResponseCodes = [200];
pm.expect(pm.response.code).to.be.oneOf(expectedResponseCodes, "Response code not in expected range");

pm.test('Response is valid and has a JSON body', () => {
     pm.response.to.be.success;
     pm.response.to.be.withBody;
     pm.response.to.be.json;
});

pm.test('Validate the response and saves the WebStore Id in the collection variables', () => {
    const data = pm.response.json();
    pm.expect(data.records).to.exist;
    pm.expect(data.records).to.be.an('array');
    pm.expect(data.records.length).to.eql(1);
    const webStore = data.records[0];
    pm.expect(webStore.Id).to.exist;
    pm.expect(webStore.Id).to.be.an('string');
    pm.collectionVariables.set('_webStoreId', webStore.Id);
});
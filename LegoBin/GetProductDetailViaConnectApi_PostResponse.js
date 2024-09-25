const buyerBanner = () => {
    console.log(`${pm.info.requestName} Tests...`);
    console.warn(`Code: ${pm.response.code} | Status: ${pm.response.status} | Response time: ${pm.response.responseTime} ms | Buyer: ${pm.environment.get('buyerUsername')} | Account: ${pm.environment.get('buyerAccountName')}`);

}

buyerBanner();

const expectedResponseCodes = [200];
pm.expect(pm.response.code).to.be.oneOf(expectedResponseCodes, "Response code not in expected range");

pm.test('Response is valid and has a JSON body', () => {
    pm.response.to.be.success;
    pm.response.to.be.withBody;
    pm.response.to.be.json;
});

pm.test('Validate the response', () => {
    const jsonData = pm.response.json();
    pm.expect(jsonData.defaultImage).to.exist;
    pm.expect(jsonData.defaultImage).to.be.an('object').with.property('id').to.be.an('string');

    pm.expect(jsonData.fields).to.exist;
    pm.expect(jsonData.fields).to.be.an('object').with.property('Name').to.be.an('string');
    pm.expect(jsonData.fields).to.be.an('object').with.property('Description').to.be.an('string');
    pm.expect(jsonData.fields).to.be.an('object').with.property('LastModifiedDate').to.match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z/);

    pm.expect(jsonData.mediaGroups).to.exist;
    pm.expect(jsonData.mediaGroups).to.be.an('array');
    pm.expect(jsonData.mediaGroups[0]).to.be.an('object').with.property('id').to.be.an('string');
    pm.expect(jsonData.mediaGroups[0].mediaItems[0]).to.be.an('object').with.property('url').to.be.an('string');
    pm.expect(jsonData.mediaGroups[0].mediaItems[0]).to.be.an('object').with.property('mediaType').to.be.an('string');
});

console.log(`${pm.info.requestName} Tests...`);
console.warn(`Code: ${pm.response.code} | Status: ${pm.response.status} | Response time: ${pm.response.responseTime} ms`);
const expectedResponseCodes = [200];
pm.expect(pm.response.code).to.be.oneOf(expectedResponseCodes, "Response code not in expected range");

pm.test('Response is valid and has a JSON body', () => {
     pm.response.to.be.success;
     pm.response.to.be.withBody;
     pm.response.to.be.json;
});

pm.test('Validate the response and save the Product Ids in the collection variables', () => {
    const data = pm.response.json();
    pm.expect(data.records).to.exist;
    pm.expect(data.records).to.be.an('array');
    pm.expect(data.records.length).greaterThan(1);

    const productIds = [];

    for(const p of data.records)
    {
        productIds.push(p.Id);
    }

    console.log('# of Product Ids: ' + productIds.length + ' Details:\r\n' + productIds.join(',\r\n'));
    pm.collectionVariables.set('_productIds', JSON.stringify(productIds));
});
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

pm.test('Validate top level data', () => {
    pm.expect(jsonData).to.be.an('object').with.property('currencyIsoCode').to.be.an('string').with.length.greaterThan(2);
    pm.expect(jsonData.success).to.be.an('boolean').that.equals(true);
    pm.expect(jsonData).to.be.an('object').with.property('pricingLineItemResults').to.be.an('array').with.length.greaterThan(1);
    pm.expect(jsonData.currencyIsoCode).equals(pm.environment.get('currencyIsoCode'));
});

pm.test('Validate pricingLineItemResults', () => {
    pm.expect(jsonData.pricingLineItemResults).to.be.an('array').with.length.greaterThan(1);

    for(const plir of jsonData.pricingLineItemResults)
    {
        pm.expect(parseFloat(plir.listPrice)).to.be.an('number').greaterThan(0);
        pm.expect(plir.pricebookEntryId).to.be.an('string').with.length.greaterThan(0);
        pm.expect(plir.productId).to.be.an('string').with.length.greaterThan(0);
        pm.expect(plir.success).to.be.an('boolean').that.equals(true);
        pm.expect(parseFloat(plir.unitPrice)).to.be.an('number').greaterThan(0);
    }
});
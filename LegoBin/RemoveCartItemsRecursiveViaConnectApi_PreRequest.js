const expectedStringsInEnvironmentVariables = ['orgHostMySalesforceFormat','apiVersion'];
const expectedStringsInCollectionVariables = ['_instanceUrl', '_webStoreId', '_productId', '_token', '_effectiveAccountId', '_cartStateOrId'];

console.log(`${pm.info.requestName} Pre-request Script...`);
console.log('Collection variables before:\r\n'.concat(pm.collectionVariables.values.map((v) =>  v.key + ': ' + v.value).sort().join('\r\n')));

// Expected strings in environment variables
for(const esiev of expectedStringsInEnvironmentVariables)
{
    if(!pm.environment.has(esiev))
    {
        const msg = `Expected Postman environment variable not found: '${esiev} in environment: '${pm.environment.name}'`;
        pm.expect.fail(msg);
    }

    pm.expect(pm.environment.get(esiev)).to.exist;
    pm.expect(pm.environment.get(esiev)).to.be.an('string');
}

// Expected strings in collection variables
for(esicv of expectedStringsInCollectionVariables)
{
    if(!pm.collectionVariables.has(esicv))
    {
        const msg = 'Expected Postman collection variable not found: ' + esicv;
        pm.expect.fail(msg);
    }

    pm.expect(pm.collectionVariables.get(esicv)).to.exist;
    pm.expect(pm.collectionVariables.get(esicv)).to.be.an('string');
}

// Expected arrays in collection variables
['_cartItems'].forEach(eaicv => {
    if(!pm.collectionVariables.has(eaicv)) {
        const msg = 'Expected Postman collection array variable not found: ' + eaicv;
        pm.expect.fail(msg);
    }
    pm.expect(pm.collectionVariables.get(eaicv)).to.exist;
    pm.expect(pm.collectionVariables.get(eaicv)).to.be.an('array');
});
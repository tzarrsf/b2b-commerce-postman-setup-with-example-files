const expectedStringsInEnvironmentVariables = ['orgHostMySalesforceFormat','apiVersion'];
const expectedStringsInCollectionVariables = ['_instanceUrl', '_webStoreId', '_productId', '_productIds', '_token', '_effectiveAccountId'];

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

const productIds = JSON.parse(pm.collectionVariables.get('_productIds'));
const productIdsJoined = productIds.join(',');
pm.collectionVariables.set('_productIdsJoined', productIdsJoined);
const expectedStringsInEnvironmentVariables = ['orgHostMySalesforceFormat','apiVersion','productNamesCommaDelimited', 'currencyIsoCode'];
const expectedStringsInCollectionVariables = ['_webStoreId', '_productId', '_token', '_instanceUrl', '_cartStateOrId', '_effectiveAccountId'];

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

console.log(`${pm.info.requestName} Pre-request Script...`);
console.log('Collection variables before:\r\n'.concat(pm.collectionVariables.values.map((v) =>  v.key + ': ' + v.value).sort().join('\r\n')));

// Create the JSON Body for multiple objects
const productIds = JSON.parse(pm.collectionVariables.get('_productIds'));
let o = new Object();
o.inputs = [];
let qty = 2;
let element;
let richInput;

for(const pid of productIds)
{
    element = new Object();
    richInput = new Object();
    richInput.productId = pid;
    richInput.quantity = qty * 3;
    richInput.type = "Product";
    element.richInput = richInput;
    o.inputs.push(element);
}

pm.collectionVariables.set('_productIdsForAddMultipleJson', JSON.stringify(o));
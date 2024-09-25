console.log(`${pm.info.requestName} Tests...`);
console.warn(`Code: ${pm.response.code} | Status: ${pm.response.status} | Response time: ${pm.response.responseTime} ms`);
const expectedResponseCodes = [204];

const instanceUrl = pm.collectionVariables.get('_instanceUrl');
const apiVersion = pm.environment.get('apiVersion');
const webStoreId = pm.collectionVariables.get('_webStoreId');
const cartStateOrId = pm.collectionVariables.get('_cartStateOrId');
const effectiveAccountId = pm.collectionVariables.get('_effectiveAccountId');
const token = pm.collectionVariables.get('_token');
const cartItems = pm.collectionVariables.get('_cartItems');

// Put together the Url which will be called in a loop
let renderedUrl = `${instanceUrl}`;
renderedUrl += `/services/data/v${apiVersion}`;
renderedUrl += `/commerce/webstores/${webStoreId}`;
renderedUrl += `/carts/${cartStateOrId}`;
renderedUrl += `/cart-items/{cartItemId}/?effectiveAccountId=${effectiveAccountId}`;

// Loop the cart items and build an array of requests
let deleteRequests = [];

for(const ci of cartItems)
{
    let cartItemId = ci.cartItem.cartItemId;
    let itemUrl = renderedUrl.replace('{cartItemId}', cartItemId);

    // Assemble request and headers for the item's URL

    const header = {
        'Cache-Control':'no-cache',
        'Accept-Encoding':'gzip, deflate, br',
        'Connection':'keep-alive',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }

    const deleteRequest = {
        "url": itemUrl,
        "header": header,
        "method": 'DELETE',
        "body": {},
    };

    deleteRequests.push(deleteRequest);
}

function sequenceRequestsViaRecursion(requests)
{
    if(requests.length > 0)
    {
        console.info(`Requesting: '${requests[0].url}'`);

        pm.sendRequest(requests[0], function (error, response)
        {
            requests.splice(0, 1);
            if(error != null) {
                console.error(error);
            }
            console.warn(`Code: ${response.code} | Status: ${response.status} | Response time: ${response.responseTime} ms`);
            pm.test('Check that Cart has first item and set collection variable for Update operation', () =>{
                pm.expect(response.code).to.be.oneOf(expectedResponseCodes);
            });
            sequenceRequestsViaRecursion(requests);
        });
    }
}

// In Postman we need to nest the calls to make them sequentially
console.warn(`Time for sequenceRequestsViaRecursion with ${deleteRequests.length} requests... Contact!`);
sequenceRequestsViaRecursion(deleteRequests);
// Sync up the collection variable with the work done
pm.collectionVariables.unset('_cartItems');

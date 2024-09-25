
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

pm.test('Validate enough items in cart to continue - need 3 or more', () => {
    pm.expect(jsonData.cartItems).to.exist;
    pm.expect(jsonData.cartItems).to.be.an('array').with.length.greaterThan(2);
});

const firstCartItem = jsonData.cartItems[0].cartItem;

pm.test('Check that Cart has first item and set collection variable for Update operation', () =>{
    pm.expect(firstCartItem).to.be.an('object').with.property('cartItemId').that.is.an('string');
});

const secondCartItem = jsonData.cartItems[1].cartItem;

pm.test('Check Cart has second item and set collection variable for Delete operation', () =>{
    pm.expect(secondCartItem).to.be.an('object').with.property('cartItemId').that.is.an('string');
});

pm.test('Validate the items are in the same Cart', () => {
    pm.expect(firstCartItem.cartId).equals(secondCartItem.cartId);
});

// Set the cart items so we can delete them
pm.collectionVariables.set('_cartItems', jsonData.cartItems);
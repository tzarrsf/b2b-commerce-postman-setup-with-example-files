console.log(`${pm.info.requestName} Pre-request Script...`);
console.log('Checking oAuth has been set up...');

const checkOpenAuthToken = (request) => {
    const isTokenMissing = request.auth === undefined
    || request.auth.oauth2 === undefined
    || !request.auth.oauth2.has('accessToken')
    || request.auth.oauth2.get('accessToken') === undefined
    || request.auth.oauth2.get('accessToken') === null
    || request.auth.oauth2.get('accessToken').length === 0;

    if(isTokenMissing) {
        const msg = 'Steps to fix issue "Expected oAuth 2.0 token not found":\r\n' + 
        '1. Check in Setup -> OAuth and OpenID Connect Settings -> Allow OAuth Username-Password Flows: Enabled \r\n' +
        '2. Click on the Request with a name like "Set your oAuth 2.0 Token in Authorization tab"\r\n' +
        '3. Click the "Authorization" tab\r\n' + 
        '4. Click the "Get New Access Token" button\r\n' +
        '5. Click the "Proceed" button\r\n' + 
        '6. Click the "Use Token" button\r\n' +
        '7. Retry your request';
        console.error(msg);
        pm.expect.fail('Expected oAuth 2.0 token not found. See steps above for a fix.');
    }
    else
    {
        const tokenAgeInMinutes = Math.floor(Math.floor((new Date().getTime() - pm.request.auth.oauth2.get('timestamp')) / 1000) / 60);
        console.warn(`Token age: ${tokenAgeInMinutes} minutes`);
        pm.collectionVariables.set('_token', pm.request.auth.oauth2.get('accessToken'));
    }
};

checkOpenAuthToken(pm.request);

pm.test('oAuth 2.0 Assertions', () => {
    pm.expect(pm.request.auth).to.exist;
    pm.expect(pm.request.auth).to.be.an('object');
    pm.expect(pm.request.auth.oauth2).to.exist;
    pm.expect(pm.request.auth.oauth2).to.be.an('object');
    pm.expect(pm.request.auth.oauth2.has('accessToken')).to.be.true;
    pm.expect(pm.request.auth.oauth2.get('accessToken')).to.exist;
    pm.expect(pm.request.auth.oauth2.get('accessToken')).to.be.an('string').with.length.greaterThan(0);
});
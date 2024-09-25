const baseplateBanner = () => {
    console.log(`${pm.info.requestName} Tests...`);
    console.warn(`Code: ${pm.response.code} | Status: ${pm.response.status} | Response time: ${pm.response.responseTime} ms`);
}

baseplateBanner();

pm.expect(pm.response.text().includes('INVALID_LOGIN'), 'INVALID_LOGIN found in response - Suggested fix: Check username, password and tokens in the Postman Environment').to.be.false;

pm.expect(pm.response.text().includes('API_CURRENTLY_DISABLED'), 'API_CURRENTLY_DISABLED found in response - Suggested fix: Create a Permission Set like \'Api Enabled\' with the API Enabled checkbox active in System Permissions and apply it to the user').to.be.false;

const expectedResponseCodes = [200];
pm.expect(pm.response.code).to.be.oneOf(expectedResponseCodes, "Response code not in expected range");

pm.test('Validate the access token is found in the body and save it to a collection variable', () => {
    const result = xml2Json(pm.response.text())['soapenv:Envelope']['soapenv:Body'].loginResponse.result;
    const url = result.serverUrl.split('/');

    pm.expect(result.sessionId).to.exist;
    pm.expect(result.sessionId).to.be.a.string;

    pm.collectionVariables.set('_token', result.sessionId);
    pm.collectionVariables.set('_instanceUrl', url[0] + '//' + url[2]);
    pm.collectionVariables.set('_userId', result.userId);
    pm.collectionVariables.set('_orgId', result.userInfo.organizationId);
});
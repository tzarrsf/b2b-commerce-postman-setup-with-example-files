console.log(`${pm.info.requestName} Tests...`);

pm.test('Make sure collection variables are clean', () => {
    pm.expect(pm.collectionVariables.values.map((v) =>  v.key + ': ' + v.value)).to.be.an('array').empty;
});
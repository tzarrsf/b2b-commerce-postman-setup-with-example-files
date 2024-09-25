

console.log(`${pm.info.requestName} Pre-request Script...`);

// Check for environment selection
if(pm.environment.name === undefined) {
    const msg = 'No Postman environment selected or set.';
    pm.expect.fail(msg);
}

// Clean up the variables from the collection set throughout the various calls
pm.collectionVariables.clear();
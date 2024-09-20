# Salesforce B2B Commerce Postman Setup for Partners

_Created by Tom Zarr with key contributions from Sandra Golden and Jordane Bachelet_

## Background and Use Case

This material is supplemental to the B2B Commerce Partner Learning Camp curricula. See the curricula and the contained courses for the complete setup procedure of a B2B Commerce standalone environment.

This postman collection contains API endpoints from various Salesforce Commerce domains, but the emphasis is on completing B2B Commerce checkouts and performing operational tasks related to that end through the Connect API and other flavors of API available on the Salesforce platform.

Unlike many other Postman collections, this one is meant to be user friendly and have meaningful error messages when something is not set up correctly or there are issues in the request chains.

## ⚠️ Disclaimers

- This collection is provided as-is. It's not officially supported by Salesforce or covered by SLAs.
- API documentation is not provided with the collection. Please refer to the official documentation.
- The documentation for the majority of the endpoints in this collection can be found in the [B2B and D2C Commerce Resources](https://developer.salesforce.com/docs/atlas.en-us.chatterapi.meta/chatterapi/connect_resources_commerce.htm) of the Connect REST API Developer Guide.

## What this collection is and isn't

This collection is intended to be used for a B2B standalone setup. That isn't to say you can't use it with a Salesforce Org containing other commerce products, just that B2B is what's targeted.

## Approach

1. I've tried to stay "close to the metal" by using the Postman Scripting API directly. There are a few cases where this just isn't possible or realistic because responses are not true JSON or HTTP status codes are reported in the HTML body text, but those should be true exceptions and definitely not the rule.
2. I wanted oAuth 2.0 to be easy so I could move things around. This is my approach and it's about the best I could come up with given the limitations of the tool: Have a dummy request where you set it once in that folder then everything following just uses Bearer Token. It works and better is the enemy of good enough.
3. The request chains are long; This is by design. At the risk of being didactic, this is ultimately a *teaching tool*. When it comes to working with APIs I find more detail is better.
4. Collection variables are calculated and presented before each request.
5. Tests are applied following each response. If something isn't right I want you to know about it early so I assume little to nothing about a response being successful.

### This collection will eventually provide the following (some are a work in progress)

1. Product Search (Log In Flow)
2. Product Search (oAuth Flow)
3. Cart / Authenticated
4. Cart / Guest
5. Deployment / Payment - WIP
6. Deployment / Register External Services - WIP
7. Checkout / Authenticated Happy Path
8. Checkout / Guest Happy Path
9. Cancel Checkout / Authenticated Happy Path
10. Cancel Checkout / Guest Happy Path
11. Pricing / Authenticated
12. Pricing / Guest
13. Get Inventory Availability (Log In Flow + Connect API)
14. Get Inventory Availability (oAuth Flow + Connect API)
15. Search Operations (indexing for now)

## Connected App Requirements

Because we're using APIs you'll need to set up a Connected App in your org since Connect APIs and other flavors of APIs like SOAP may be in play.

By way of example the Omnichannel Inventory Postman Collection used two Connected Apps (one for the Headless APIs and one for the Connect APIs)

- Postman_OCI
- Postman_OCI_ConnectApi

You can see the [Omnichannel Inventory Postman Setup repository here](https://github.com/tzarrsf/omnichannel-inventory-postman-setup-with-example-files/)

You will need to obtain some values from your Connected App in order to establish connectivity (see: [Variables](./#Variables))

## Authentication Approach

Authentication is generally handled in three ways:

1. Logging in as an Administrator (often used at request chain outset for lookup operations to preserve reusability across orgs). See [Logging in as an Administrator or Buyer](./logging-in-as-an-administrator-or-buyer).
2. Logging in as a 'known good' Buyer (aka Contact under Account with a User). Please note that all three must be set up and this is commonly _not_ going to be the case with a System Administrator account. See [Logging in as an Administrator or Buyer](./logging-in-as-an-administrator-or-buyer). 
3. Establishing oAuth 2.0 *once per folder* and then having subsequent requests set to Bearer Token in the **Authorization** tab. See [oAuth 2.0 is set once per folder where needed](./#oauth-20-is-set-once-per-folder-where-needed).

### Logging in as an Administrator or Buyer

This is handled inline. Just supply the environment with the needed variables like these and the collection and scripting should take care of the rest:

| Name | Description
| --- | --- |
| `orgLoginUrl` | Either `https://login.salesforce.com` (production / trial) or `https://test.salesforce.com` (sandbox)
| `orgHost` | Protocol and host portion of the Salesforce org's URL Example: `https://yourusername-august.lightning.force.com` |
| `orgAdminUsername` | The System Administrator username for the Salesforce org |
| `orgAdminPassword` | The System Administrator password for the Salesforce org |
| `orgAdminSecurityToken` | The security token for the Salesforce Org System Administrator User |

If you need to move this type of Administrator or Buyer authentication scheme around, just copy the request and paste it into another folder or location in the current folder. Copy and paste operations are supported in Postman.

### oAuth 2.0 is set once per folder where needed

Please don't take on a "do-it-yourself" approach with the oAuth 2.0 setup. Why?

1. Most importantly, you don't need to. This has all been completed using variables. There's no guesswork on which login needs the token appended to the password, etc.
2. There's scripting which checks if your token set up is correct to begin making requests.
3. Tokens are passed in subsequent requests using __Bearer Token__ authentication on the requests needing it. Just turn it on - done.
4. This was done "by design" so you can easily add your own requests or copy them and move them around with little to no impact whenever oAuth 2.0 is needed.
5. You can also find and copy the requests named something like **Set your oAuth 2.0 Token in Authorization tab** whenever you need to establish oAuth 2.0 before another request or add it to a folder.

#### Establishing oAuth 2.0 (First Time and Details)

- Look for the request with a name like **Set your oAuth 2.0 Token in Authorization tab**
- Please don't try to do a bunch of manual work on your token setup or get fancy here. Again, it's all filled in with variables already.

Follow these steps to establish and use your token. These or something very similar will be provided as an error in the **Console** if there's an oAuth error state:

1. Click on the Request with a name like "Set your oAuth 2.0 Token here in Authorization tab"
2. Click the "Authorization" tab
3. Click the "Get New Access Token" button
4. Click the "Proceed" button
5. Click the "Use Token" button
6. Optional - Use the delete button's dropdown option to remove expired tokens (it's best to remove all of them except the newest)
7. Retry your request(s)

## Error Handling

It's my intent to trap every reasonably predictable error state and save anyone using this collection time. I welcome your feedback on that front. That said, I can't cover every single org configuration or set of data and this is where you come in as a partner. Below are some of the common cases I have tried to account for so the request chains can inform you when something's wrong or at least provide hints to help troubleshoot what you're seeing.

### Clear Collection Variables

It's recommended you stick to the pattern of having this as the first step in your folder  as it does a few things to ensure your request chain data is kept consistent:

1. The **Pre-request** tab makes sure that your environment is selected and stops the chain if not (dead programs tell no lies):

```
// Check for environment selection
if(pm.environment.name === undefined) {
    const msg = 'No Postman environment selected or set.';
    pm.expect.fail(msg);
}
```

2. The **Pre-request** tab makes sure that it clears out the collection variables:

```
// Clean up the variables from the collection set throughout the various calls
pm.collectionVariables.clear();
```

3. The **Test** tab ensures the collection is indeed empty:

```
pm.test('Make sure collection variables are clean', () => {
    pm.expect(pm.collectionVariables.values.map((v) =>  v.key + ': ' + v.value)).to.be.an('array').empty;
});
```

### Request names are pulled in dynamically in both the Pre-request and Test code

Whatever the request is named in the Postman user interface is reflected dynamically by these code snippets:

`console.log(`${pm.info.requestName} Pre-request Script...`);`

`console.log(`${pm.info.requestName} Tests...`);`

If you call your request "Heinz 57" you will see `Heinz 57 Pre-request Script...` or `Heinz 57 Tests...` in the console accordingly. You can drill into your request and response bodies as needed knowing what was passed to the endpoint.

### Requests must meet Preconditions

If **environment** variables are expected for a request they are tested on the Pre-request script tab and if not found the test run should go to a hard fail state. Just look for the error (red text) in the Console.

```
// Expected strings in environment variables
['host', 'tenantId', 'bearerToken'].forEach(esiev => {
    if(!pm.environment.has(esiev)) {
        const msg = `Expected Postman environment variable not found: '${esiev}' in environment: '${pm.environment.name}'.`;
        pm.expect.fail(msg);
    }
    pm.expect(pm.environment.get(esiev)).to.exist;
    pm.expect(pm.environment.get(esiev)).to.be.an('string');
});
```

If **collection** variables are expected they are tested on the Pre-request script tab. Like the environment variables, the test run should go to a hard fail state and you should find a *meaningful* error in the Console. 

```
// Expected strings in collection variables
['_webStoreId', '_token', '_orgId'].forEach(esicv => {
    if(pm.collectionVariables.get(esicv) === undefined) {
        const msg = 'Expected Postman collection variable not found: ' + esicv;
        pm.expect.fail(msg);
    }
    pm.expect(pm.collectionVariables.get(esicv)).to.exist;
    pm.expect(pm.collectionVariables.get(esicv)).to.be.an('string');
});
```

### Collection variables are listed in each Pre-request

This code snippet allows you to see things _before_ each request is made in the **Pre-Request Script** tab:

```
console.log('Collection variables before:\r\n'.concat(pm.collectionVariables.values.map((v) =>  v.key + ': ' + v.value).sort().join('\r\n')));
```

Example of collection variables being printed to the console in a Pre-request script:

```
Collection variables before:↵
_instanceUrl: https://toms-org.my.salesforce.com↵
_locationGroupIdentifiers: ["LocationGroup01"]↵
_orgId: 00DHn0000YYYYYYYYY↵
_productStockKeepingUnits: ["PROSE","B-C-COFMAC-001","ESP-IOT-1","ID-PEM","PS-EL","PS-INF","TR-COFMAC-001"]↵
_token: 0xdeadbeef!0x8badfood!0xfeedfacecafebeefx.01123581321345589144233377610↵
_userId: 005HnXXXXXXXXXXXXX
```

## Variables

> ⚠️ **Note**: You must set up your environment variables correctly for all of this to work. Collection variables are typically calculated and assigned between requests (in the **Test** tab script) and used in subsequent requests. The naming convention used in the collection is to prefix collection variable keys with an underscore like `_tomsVariableKey` while  an environment variable should not contain an underscore. Example: `tomsVariableKey`. I would never recommend writing to environment variables at runtime. My approach is to keep these consistent across the collection and all folders across the collection and use them only when changing orgs, storefronts or users.

These are some *bad* examples. You shouldn't see calls like these in the collection and it's strongly recommended that you do not create them this way to avoid needless debugging:

1. `pm.collectionVariables.set('myVariable', 'My new value');`
2. `pm.collectionVariables.get('myVariable');`
3. `pm.environment.set('_myVariable', 'My new value');`
4. `pm.environment.get('_myVariable');`

These are good examples as they adhere to the established naming convention and it's clear which dictionary we're using when the name is seen in the Console:

1. `pm.collectionVariables.set('_myVariable', 'My new value');`
2. `pm.collectionVariables.get('_myVariable');`
3. `pm.environment.set('myVariable', 'My new value');`
4. `pm.environment.get('myVariable');`

Every coder has their preferences and principles. I don't like mixing sources like dictionaries for retrieving a value by key. A value with an underscore prefix in this naming convention should correspond to pm.collectionVariables and one without should come from pm.environment. I don't use a context stand-in object that allows pulling or pushing a value by key from either pm.collectionVariables or pm.environment at runtime. I believe strongly that a few coding principals such as singular definition and not coding by coincidence - even with tests, and especially with tests can save time. If those terms are not familiar I'd like to recommend the book "The Pragmatic Programmer" as it could replace many on your shelf or device.

### Input values

#### Some Environment variables are used for lookups to support reuse

These are some examples:

1. webstoreName (resolves to a WebStore Id)
2. buyerAccountName (resolves to an Account Id)

#### Some Environment variables can be used to provide comma delimited values

 1. productNamesCommaDelimited (resolves to a list of Product2 Ids)
 2. productStockKeepingUnitsCommaDelimited (used in OCI Postman collection)
 3. locationGroupIdentifiersCommaDelimited (used in OCI Postman collection)
 4. locationIdentifiersCommaDelimited (used in OCI Postman collection)

#### Some Environment variables can be used to provide a single string value

 1. productSearchTerm

## Standardized variables

⚠️ __Note__: The naming convention found here is used across other Salesforce Commerce product Postman collections in the Partner Readiness space when possible to support reuse and collaboration.

This Postman collection relies on the following variables:

| Name | Description | Location |
| --- | --- | --- |
| `orgLoginUrl` | Either `https://login.salesforce.com` (production/trial) or `https://test.salesforce.com` (sandbox) | User supplied |
| `orgHost` | Protocol and host portion of the Salesforce org's URL | User supplied. Example: `https://yourusername-august.lightning.force.com` |
| `orgAdminUsername` | The System Administrator username for the Salesforce org | User supplied |
| `orgAdminPassword` | The System Administrator password for the Salesforce org | User supplied |
| `orgAdminSecurityToken` | The security token for the Salesforce Org System Administrator User | Autogenerated |
| `orgHostMySalesforceFormat` | The protocol and host portion of the Salesforce org's URL in 'my.salesforce.com' format. Useful for avoiding redirection problems and 'Invalid Session Id' errors post authentication | User supplied. Example: `https://yourusername-august.my.salesforce.com` |
| `orgId` | The Salesforce.com Organization ID for the Salesforce org | Setup > Company Information |
| `apiVersion` | The Salesforce API version (e.g. 58.0). | User supplied. Most recent value recommended. |
| `connectedAppConsumerKey` | The Consumer Secret value for the Connected App in the Salesforce org. | Setup > App Manager > Connected App Record > View > Manage Consumer Details |
| `connectedAppConsumerSecret` | The Consumer Secret value in the Connected App. | Setup > App Manager > Connected App Record > View > Manage Consumer Details |
| `webstoreName` | Name of the webstore used to look up a corresponding Id | The value specified when the store / site was created such as 'B2B LWR Enhanced Store from TSO.' Can be found in the Commerce App under 'Stores.' |
| `buyerUsername` | Registered B2B Buyer User's username. | User supplied. |
| `buyerPassword` | Registered B2B Buyer User's password. | User supplied. |
| `buyerAccountName` | Name of the Account used to look up the Account Id which is tied to the Buyer User. | User supplied. Example: `United Coffee Bean Corp` |
| `productNamesCommaDelimited` | Comma-delimited list of product names which are resolved to Ids. | User supplied: Example `Testa Rossa Coffee Machine (Sample),Capricorn I Group Espresso Machine (Sample)` |
| `productSearchTerm` | The search term to use for a Happy Path | User supplied: Example `Coffee` |
| `currencyIsoCode` | The currency code for the cart. | User supplied: Example `USD` for United States Dollar |

Please consult the Partner Learning Camp B2B Commerce curriculum and course documentation for additional details.

Enjoy the collection!
Tom Zarr - October, 2023

# Salesforce B2B Commerce Postman Setup for Partners

_Created by Tom Zarr with key contributions from Sandra Golden and Jordane Bachelet_

## Background and Use Case

This material is supplemental to the B2B Commerce Partner Learning Camp Administrator and Developer curricula. Please consult the respective curriculum and its courses for obtaining an environment so you can set up, deploy and manage a Salesforce B2B Commerce standalone environment.

This postman collection contains API endpoints from various Salesforce Commerce domains, but the emphasis is on completing B2B Commerce checkouts and performing operational tasks related to that end through the Connect API and other flavors of API available on the Salesforce platform.

Unlike many other Postman collections, this one is meant to be user friendly and have meaningful error messages when something is not set up correctly or there are issues in the request chains.

## ⚠️ Disclaimers

- This collection is provided as-is. It's not officially supported by Salesforce or covered by SLAs.
- API documentation is not provided with the collection. Please refer to the official documentation.
- The documentation for the majority of the endpoints in this collection can be found in the [B2B and D2C Commerce Resources](https://developer.salesforce.com/docs/atlas.en-us.chatterapi.meta/chatterapi/connect_resources_commerce.htm) of the Connect REST API Developer Guide.

## What this collection is and isn't

This collection is intended for a B2B 'standalone' setup. That isn't to say you can't use it with an org containing other products, just that B2B is the targeted commerce product.

## Approach

1. I've tried to stay 'close to the metal' by using the Postman Scripting API directly. There are a few cases where this just isn't possible or realistic because some responses don't adhere to a strict JSON or HTTP structure, such as error codes reported in an HTML body, but those should be the uncommon exception, definitely not the rule.
2. I wanted oAuth 2.0 to be easy so I could move things around like Lego blocks. This is the best I could come up with given the limitations of the tool: Have a dummy request where you set it once in that folder and then everything following it just uses the Bearer Token. It works and "better" is the enemy of "good enough."
3. The request chains are long; This is by design. This is ultimately a *teaching tool*. When it comes to working with APIs I find more detail, especially about what needs to happen between them,  quite helpful. The intent is to cut out the process of interrogating interfaces and faffing about before you can effectively use them.
4. Collection variables are calculated and presented before each request. Please use this to your advantage.
5. Tests are applied following each response. If something isn't right, I'd rather it fail fast.

### This collection provides the following operations (some are a work in progress or being debugged for continuity)

<ol>
    <li>Product Search
        <ol>
            <li><a href="./LegoBin/UseCases/ProductSearch_BasicSearch_BuyerLogin.html">Basic Search (Buyer Login)</a></li>
            <li><a href="./LegoBin/UseCases/ProductSearch_BasicSearch_OAuth2.html">Basic Search (oAuth 2.0)</a></li>
        </ol>
    </li>
    <li>Product Categories
        <ol>
            <li><a href="./LegoBin/UseCases/ProductCategories_GetChildCategories_BuyerLogin.html">Get Child Categories (Buyer Login)</a></li>
            <li><a href="./LegoBin/UseCases/ProductCategories_GetChildCategories_OAuth2.html">Get Child Categories (oAuth 2.0)</a></li>
        </ol>
    </li>
    <li>Product Pricing
        <ol>
            <li>Get Child Categories (Buyer Login)</li>
            <li>Get Child Categories (oAuth 2.0)</li>
        </ol>
    </li>
    <li>Cart
        <ol>
            <li>Happy Path (Buyer Login)</li>
            <li>Happy Path (Guest) - WIP</li>
        </ol>
    </li>
    <li>Checkout
        <ol>
            <li>Happy Path (Buyer Login)</li>
            <li>Happy Path (Guest) - WIP</li>
            <li>Cancel Checkout (Buyer Login) - WIP</li>
        </ol>
    </li>
     <li>Order Summaries
        <ol>
            <li>Get Order Summaries by Date Range (Buyer Login)</li>
            <li>Get Order Summaries by Date Range (oAuth 2.0)</li>
        </ol>
    </li>
</ol>

### These integrations are planned for addition

<ol>
    <li>Deployment - Payment</li>
    <li>Deployment - Register External Services for Aura</li>
    <li>Deployment - Register External Services for LWR</li>
    <li>Pricing (Guest)</li>
    <li>Get Inventory Availability (Buyer Login)</li>
    <li>Get Inventory Availability (oAuth 2.0)</li>
    <li>Search Operations - Perform Reindex</li>
</ol>

## Connected App Requirements

Because we're using APIs you'll need to set up a Connected App in your org since REST APIs such as the Connect API, Query API and others, plus SOAP may be in play. You can follow the steps in the [Salesforce Commerce Postman Collection Guide for Solution Implementing Partners](https://sfdc.co/SCOMPostmanCollections) to set up the Connected App in your org and configure the Postman [Variables](./#Variables).

## Authentication Practices in this Collection

Authentication is generally handled with two main flavors which you can read about under [Partner Readiness Approach to Salesforce Commerce Postman Collections](https://salesforce.quip.com/u1vjAvotGXPp#temp:C:JHG88fb0462393542c1bbbe1d631) in the guide (Options 1 and 2).

### Logging in as an Administrator or Buyer Account aka "Option 1: Postman oAuth 2.0 Token and Flow Wizard"

This is handled inline. Just supply the environment with the needed variables like these and the collection and scripting should take care of the rest for you:

| Name | Description
| --- | --- |
| `orgLoginUrl` | Either `https://login.salesforce.com` (production / trial) or `https://test.salesforce.com` (sandbox)
| `orgHost` | Protocol and host portion of the Salesforce org's URL Example: `https://yourusername-august.lightning.force.com` |
| `orgAdminUsername` | The System Administrator username for the Salesforce org |
| `orgAdminPassword` | The System Administrator password for the Salesforce org |
| `orgAdminSecurityToken` | The security token for the Salesforce Org System Administrator User |

If you need to move this type of Administrator or Buyer authentication scheme around, just copy the request and paste it into another folder or location in the current folder. A major goal of this collection was to make these "Lego Blocks" fungible in Postman. As long as you have a request these before making other calls, you should generally be fine:

1. Log in as System Administrator (SOAP)
1. Log in as Buyer (SOAP)

### oAuth 2.0 is set once per folder where needed aka "Option 2: In-Flight Folder-Based Authentication"

I've tried to make this easy to establish and reusable. You can read more about the approach [here](https://salesforce.quip.com/u1vjAvotGXPp#temp:C:JHG87b557b5546e475ca725b5f35).

## Error Handling

It's my intent to trap reasonably predictable errors and save anyone using this collection valuable time. I welcome your feedback on that front. That said, I can't cover every single org configuration or set of data and this is where you come in as a partner. Below are some of the common cases I've tried to account for so the request chains can inform you when something's off base or at least provide hints to help troubleshoot what you're seeing and remedy it.

### Clear Collection Variables

It's recommended you stick to the pattern of having this as the first step in your folder. It does a few things to ensure your request chain data is kept consistent and clean:

1. The **Pre-request** tab makes sure that your environment is selected and stops the chain if not - dead programs tell no lies!

```
// Check for environment selection
if(pm.environment.name === undefined)
{
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
pm.test('Make sure collection variables are clean', () =>
{
    pm.expect(pm.collectionVariables.values.map((v) =>  v.key + ': ' + v.value)).to.be.an('array').empty;
});
```

### Request names are pulled in dynamically in both the Pre-request and Test code

Whatever the request is named in the Postman user interface is reflected dynamically by these code snippets:

`console.log(`${pm.info.requestName} Pre-request Script...`);`

`console.log(`${pm.info.requestName} Tests...`);`

If you call your request "Foo Bar 42" you will see `Foo Bar 42 Pre-request Script...` or `Foo Bar 42 Tests...` in the console accordingly. You can drill into your request and response bodies as needed knowing what was passed to the endpoint.

### Requests must meet preconditions (usually)

If **environment** variables are expected for a request they are tested on the Pre-request script tab according to what's in the variable `expectedStringsInEnvironmentVariables`. If not found, the test run should go to a 'hard fail' state. Just look for the error (red text) in the Console.

```
// This script expects you to have these ENVIRONMENT variables configured
const expectedStringsInEnvironmentVariables = ['orgLoginUrl','apiVersion', 'webStoreName'];

// Check expected strings in environment variables
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
```

If **collection** variables are expected they are tested on the Pre-request script tab. Like the environment variables, the test run should go to a hard fail state and you should find a *meaningful* error in the Console. 

```
// This script expects you to have these COLLECTION variables configured
const expectedStringsInCollectionVariables = ['_instanceUrl'];

// Check expected strings in collection variables
for(const esicv of expectedStringsInCollectionVariables)
{
    if(pm.collectionVariables.get(esicv) === undefined)
    {
        const msg = 'Expected Postman collection variable not found: ' + esicv;
        pm.expect.fail(msg);
    }

    pm.expect(pm.collectionVariables.get(esicv)).to.exist;
    pm.expect(pm.collectionVariables.get(esicv)).to.be.an('string');
}
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

Use output like the above to diagnose or debug your API calls.

## Variables

> ⚠️ **Note**: You must set up your environment variables correctly for all of this to work. Collection variables are typically calculated and assigned between requests (in the **Test** tab script) and used in subsequent requests. The naming convention used in the collection is to prefix collection variable keys with an underscore like `_tomsVariableKey` while  an environment variable should not contain an underscore. Example: `tomsVariableKey`. I would never recommend writing to environment variables at runtime. This is a slippery slope that can avalanche quickly. Instead, keep the environment variables consistent across the collection and all folders within it.

These are some *bad* examples. You shouldn't see calls like these in the collection and it's strongly recommended that you do not create them this way to avoid needless debugging:

1. `pm.collectionVariables.set('myVariable', 'My new value'); // Should be an underscore-prefixed variable`
2. `pm.collectionVariables.get('myVariable'); // Should be an underscore-prefixed variable`
3. `pm.environment.set('_myVariable', 'My new value'); // Should not be an underscore-prefixed variable`
4. `pm.environment.get('_myVariable'); // Should not be an underscore-prefixed variable`

These are good examples as they adhere to the established naming convention and it's clear which dictionary we're using when the name is seen in the Console:

1. `pm.collectionVariables.set('_myVariable', 'My new value');`
2. `pm.collectionVariables.get('_myVariable');`
3. `pm.environment.set('myVariable', 'My new value');`
4. `pm.environment.get('myVariable');`

Every coder has their preferences and practices. I don't like mixing my dictionaries for retrieving a value by key. I believe strongly that a few coding principles such as singular definition and not coding by coincidence - even with tests, and _especially with tests_ can save much time. If those terms aren't familiar I'd like to recommend a book called "The Pragmatic Programmer."

### Input values

#### Some Environment variables are used for lookups to support reuse

These are some examples:

1. webstoreName (resolves to a WebStore Id)
2. buyerAccountName (resolves to an Account Id)

#### Some Environment variables can be used to provide comma delimited values

 1. productNamesCommaDelimited (resolves to a list of Product2 Ids)
 1. b2bWebStoreExpectedChildCategoryNamesCommaDelimited (used in Product Category calls)
 1. productStockKeepingUnitsCommaDelimited (used in OCI Postman collection)
 1. locationGroupIdentifiersCommaDelimited (used in OCI Postman collection)
 1. locationIdentifiersCommaDelimited (used in OCI Postman collection)

#### Some Environment variables can be used to provide a single string value based on user input

 1. productSearchTerm

## Standardized variables

⚠️ __Note__: The naming convention found here is used across other Postman collections in Commerce Partner Readiness group when reasonably possible to encourage request reuse and collaboration.

This Postman collection relies on the following variables:

| Name | Description | Location |
| --- | --- | --- |
| `apiVersion` | The Salesforce API version (e.g. 61.0). | User supplied. Most recent value recommended. |
| `orgLoginUrl` | Either `https://login.salesforce.com` (production/trial) or `https://test.salesforce.com` (sandbox) | User supplied |
| `orgHost` | Protocol and host portion of the Salesforce org's URL | User supplied. Example: `https://yourusername-august.lightning.force.com` |
| `orgAdminUsername` | The System Administrator username for the Salesforce org | User supplied |
| `orgAdminPassword` | The System Administrator password for the Salesforce org | User supplied |
| `orgAdminSecurityToken` | The security token for the Salesforce Org System Administrator User | Autogenerated |
| `orgHostMySalesforceFormat` | The protocol and host portion of the Salesforce org's URL in 'my.salesforce.com' format. Useful for avoiding redirection problems and 'Invalid Session Id' errors post authentication | User supplied. Example: `https://yourusername-august.my.salesforce.com` |
| `connectedAppConsumerKey` | The Consumer Secret value for the Connected App in the Salesforce org. | Setup > App Manager > Connected App Record > View > Manage Consumer Details |
| `connectedAppConsumerSecret` | The Consumer Secret value in the Connected App. | Setup > App Manager > Connected App Record > View > Manage Consumer Details |
| `webstoreName` | Name of the webstore used to look up a corresponding Id | The value specified when the store / site was created such as 'B2B LWR Enhanced Store from TSO.' Can be found in the Commerce App under 'Stores.' |
| `buyerUsername` | Registered B2B Buyer User's username. | User supplied. |
| `buyerPassword` | Registered B2B Buyer User's password. | User supplied. |
| `buyerAccountName` | Name of the Account used to look up the Account Id which is tied to the Buyer User. | User supplied. Example: `United Coffee Bean Corp` |
| `productNamesCommaDelimited` | Comma-delimited list of product names which are resolved to Ids. | User supplied: Example `Testa Rossa Coffee Machine (Sample),Capricorn I Group Espresso Machine (Sample)` |
| `productSearchTerm` | The search term to use for a Happy Path | User supplied: Example `Coffee` |
| `b2bWebStoreParentCategoryName` | A category with child categories underneath it. If using the uploaded Capricorn Sample product CSV, "Machines" should work. | User supplied. Example: `Machines` |
| `b2bWebStoreExpectedChildCategoryNamesCommaDelimited` | The expected child categories underneath the b2bWebStoreParentCategoryName variable. If using the Capricorn sample products imported via CSV, "Coffee Machines,Espresso Machines" should work.  | User supplied. Example: `Coffee Machines,Espresso Machines` |
| `currencyIsoCode` | The currency code for the cart. | User supplied: Example `USD` for United States Dollar |

Please consult the Partner Learning Camp B2B Commerce curriculum and course documentation for additional details.

Enjoy the collection!
Tom Zarr - October, 2024

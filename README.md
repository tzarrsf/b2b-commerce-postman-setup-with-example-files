# Salesforce B2B Commerce Postman Setup with example files

This material is supplemental to the B2B Commerce Partner Learning Camp curricula. See the curricula and the contained courses for the complete setup procedure of a B2B Commerce standalone environment.

This postman collection contains API endpoints from various Salesforce Commerce domains, but the emphasis is on completing B2B Commerce checkouts and performing operational tasks related to that end through the Connect API and other flavors of API available on the Salesforce platform.

Unlike many other Postman collections, this one is meant to be user friendly and have meaningful error messages when something is not set up correctly or there are issues in the request chains.

## ⚠️ Disclaimers

- This collection is provided as-is. It's not officially supported by Salesforce or covered by SLAs.
- API documentation is not provided with the collection. Please refer to the official documentation.
- The documentation for the majority of the endpoints in this collection can be found in the [B2B and D2C Commerce Resources](https://developer.salesforce.com/docs/atlas.en-us.chatterapi.meta/chatterapi/connect_resources_commerce.htm) of the Connect REST API Developer Guide.

## What this collection is and isn't

This collection is intended to be used for a B2B standalone setup. That isn't to say you can't use it with a Salesforce Org containing other commerce products, just that B2B is what's targeted.

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

## You need to set up a Connected App

Because we're using APIs you'll need to set up a Connected App in your org since Connect APIs and other flavors of APIs like SOAP may be in play.

By way of example the Omnichannel Inventory Postman Collection used two Connected Apps (one for the Headless APIs and one for the Connect APIs)

- Postman_OCI
- Postman_OCI_ConnectApi

See [repository here](https://github.com/tzarrsf/omnichannel-inventory-postman-setup-with-example-files/)

You will need to obtain some values from your Connected App in order to establish connectivity (see: [Variables](./#Variables))

## oAuth 2.0 is set __once__ in each folder

Please don't take a "do-it-yourself" approach here. Why?

1. Most importantly, you don't need to.
2. There's some scripting which checks if your token set up is correct to begin making requests.
3. Tokens are passed in subsequent requests using __Bearer Token__ authentication on the requests needing it.
4. This was done "by design" so you can easily add your own requests or copy them and move them around with little to no impact when oAuth is needed.
5. You can also find and copy the requests named something like "Set your oAuth 2.0 Token in Authorization tab" whenever you need to establish oAuth 2.0 before another request.

### Key points

A. Look for the request with a name like "Set your oAuth 2.0 Token in Authorization tab"
B. Don't try to do a bunch of manual work on your token setup or get fancy as it's all filled in for you already using variables.

Just follow these steps which will also be provided during an oAuth error state in Postman's __Console__ as errors:

1. Click on the Request with a name like "Set your oAuth 2.0 Token here in Authorization tab"
2. Click the "Authorization" tab
3. Click the "Get New Access Token" button
4. Click the "Proceed" button
5. Click the "Use Token" button
6. Optional - Use the delete button's dropdown option to remove expired tokens (it's best to remove all of them except the newest)
7. Retry your request(s)

## Variables

⚠️ __Note__: You must set up your environment variables correctly for this all to work. Collection variables will be calculated between requests and used in subsequent  requests. The naming convention used in the collection is to prefix with an underscore for collection variables.

### Environment variables can be used to provide comma delimited values for these values

 1. productNamesCommaDelimited
 2. productStockKeepingUnitsCommaDelimited (used in OCI Postman collection)
 3. locationGroupIdentifiersCommaDelimited (used in OCI Postman collection)
 4. locationIdentifiersCommaDelimited (used in OCI Postman collection)

### Environment variables can be used to provide a string value for these values

 1. productSearchTerm

### Standardized variables (also documented in the Postman collection)

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

Consult the Partner Learning Camp B2B Commerce curriculum and course documentation for additional details.

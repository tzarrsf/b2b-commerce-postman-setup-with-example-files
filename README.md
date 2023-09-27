# B2B Commerce Postman Setup with example files

This material is supplemental to the B2B Commerce Partner Learning Camp curricula. See the curricula and the contained courses for the complete setup procedure of a B2B Commerce standalone environment.

## What this collection is and isn't

This collection is intended to be used for a B2B sstandalone setup. 

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

## You may need to set up a Connected App in your org if you want to be able to use Connect APIs and other flavors

The Omnichannel Inventory Postman Collection used these connected apps

- Postman_OCI (for headless)
- Postman_OCI_ConnectApi (for the connect API)

You will need to obtain values from your Connected App to esyablish connectivity.

## oAuth 2.0 is set __once__ in each folder and checked throughout by using Beared Token authentication on requests needing it.

### Key points

A. Look for the request with a name like "Set your oAuth 2.0 Token in Authorization tab"
B. Don't try to do a bunch of manual work here with athentication setup as the nedded variables are all filled in for you. Just follow these steps which will also be provided during an oAuth error state in the __Console__ as errors.

1. Click on the Request with a name like "Set your oAuth 2.0 Token here in Authorization tab"
2. Click the "Authorization" tab
3. Click the "Get New Access Token" button
4. Click the "Proceed" button
5. Click the "Use Token" button
6. Optional - Use the delete button's dropdown option to remove expired tokens
7. Retry your request

## Variables

__Note__: You must set up your environment variables correctly for this all to work. Collection variables will be calculated between requests and used in susbsequent requests.

### Environment variables can be used to provide comma delimited values for these values

 1. productNamesCommaDelimited
 2. productStockKeepingUnitsCommaDelimited (used in OCI Postman collection)
 3. locationGroupIdentifiersCommaDelimited (used in OCI Postman collection)
 4. locationIdentifiersCommaDelimited (used in OCI Postman collection)

### Environment variables can be used to provide a string value for these values

 1. productSearchTerm

### Standardized variables (also documented in the Postman collection)

⚠️ **_Note_**: The naming convention found here is used across other Salesforce Commerce product Postman collections in the Partner Readiness space when possible to support reuse and collaboration.

This Postman collection relies on the following variables:

| Name | Description | Location |
| --- | --- | --- |
| `orgHost` | Protocol and host portion of the Salesforce org's URL | User supplied. Example: `https://yourusername-august.lightning.force.com` |
| `orgAdminUsername` | The System Administrator username for the Salesforce org | User supplied |
| `orgAdminPassword` | The System Administrator password for the Salesforce org | User supplied |
| `orgAdminSecurityToken` | The security token for the Salesforce Org System Administrator User | Autogenerated |
| `orgHostMySalesforceFormat` | The protocol and host portion of the Salesforce org's URL in 'my.salesforce.com' format. Useful for avoiding redirection problems and 'Invalid Session Id' errors post authentication | User supplied. Example: `https://yourusername-august.my.salesforce.com` |
| `apiVersion` | The Salesforce API version (e.g. 58.0). | User supplied. Most recent value recommended. |
| `connectedAppConsumerKey` | The Consumer Secret value for the Connected App in the Salesforce org. | Setup > App Manager > Connected App Record > View > Manage Consumer Details |
| `connectedAppConsumerSecret` | The Consumer Secret value in the Connected App. | Setup > App Manager > Connected App Record > View > Manage Consumer Details |
| `orgLoginUrl` | Either `https://login.salesforce.com` (production/trial) or `https://test.salesforce.com` (sandbox) | User supplied |
| `orgId` | The Salesforce.com Organization ID for the Salesforce org | Setup > Company Information |
| `webstoreName` | Name of the webstore used to look up a corresponding Id | The value specified when the store / site was created such as 'B2B LWR Enhanced Store from TSO.' Can be found in the Commerce App under 'Stores.' |
| `buyerUsername` | Registered B2B Buyer User's username. | User supplied. |
| `buyerPassword` | Registered B2B Buyer User's password. | User supplied. |
| `buyerAccountName` | Name of the Account used to look up the Accoujnt Id which is tied to the Buyer User. | User supplied. Example: `United Coffee Bean Corp` |
| `productNamesCommaDelimited` | Commma-delimited list of product names which are resolved to Ids. | User supplied: Example `Testa Rossa Coffee Machine (Sample),Capricorn I Group Espresso Machine (Sample)` |
| `productSearchTerm` | The search term to use for a Happy Path | User supplied: Example `Coffee` |
| `currencyIsoCode` | The currency code for the cart. | User supplied: Example `USD` for United States Dollar |

Consult the Partner Learning Camp B2B Commerce curriculum and course documentation for additional details.

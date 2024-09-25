# Product Categories - Get Child Categories - Buyer Login

## Last tested: 09/24/2024 on TTID 0TT1Q000004Es40

### Changes made to environment collection variables:

- b2bWebStoreParentCategoryName: Machines
- b2bWebStoreExpectedChildCategoryNamesCommaDelimited: Coffee Machines,Espresso Machines

#### Reason:

Did not pass prior to change. Stock variables assume use of Capricorn sample products in [https://github.com/tzarrsf/b2b-commerce-gtk-admin/](https://github.com/tzarrsf/b2b-commerce-gtk-admin/) (see data folder) and "Machines" moved to top level with CSV import and was no longer a child of "Products."


1. ClearCollectionVariables [Pre-Reqeust](../LegoBin/ClearCollectionVariables_PreRequest.js) | [Post-Response](../LegoBin/ClearCollectionVariables_PostResponse.js)
1. LogInAsSystemAdministratorViaSoap [Pre-Request](../LegoBin/LogInAsSystemAdministratorViaSoap_PreRequest.js) | [Post-Response](../LegoBin/LogInAsSystemAdministratorViaSoap_PostResponse.js)
1. LookUpandSetWebStoreIdViaQueryApi [Pre-Request](../LegoBin/LookUpandSetWebStoreIdViaQueryApi_PreRequest.js) | [Post-Response](../LegoBin/LookUpandSetWebStoreIdViaQueryApi_PostResponse.js)
1. SetProductCatalogIdByWebstoreId [Pre-Request](../LegoBin/XYZ_PreRequest.js) | [Post-Response](../LegoBin/XYZ_PostResponse.js)
1. SetParentCategoryIdByProductCatalogId [Pre-Request](../LegoBin/XYZ_PreRequest.js) | [Post-Response](../LegoBin/XYZ_PostResponse.js)
1. LogInAsBuyerViaSoap [Pre-Request](../LegoBin/LogInAsBuyerViaSoap _PreRequest.js) | [Post-Response](../LegoBin/LogInAsBuyerViaSoap _PostResponse.js)
1. GetChildCategories [Pre-Request](../LegoBin/XYZ_PreRequest.js) | [Post-Response](../LegoBin/XYZ_PostResponse.js)

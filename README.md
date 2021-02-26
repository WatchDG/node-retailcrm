# node-retailcrm

## example:

```ts
import RetailCRM from 'node-retailcrm';

(async () => {

    const baseUrl = 'https://xxx.retailcrm.ru';
    const apiKey = 'yyy';

    const retailCRM = new RetailCRM({
        baseUrl,
        apiKey
    });

    const {versions} = (await retailCRM.apiVersions()).unwrap();
    console.log('> versions: ', versions);

    const {credentials, siteAccess, sitesAvailable} = (await retailCRM.credentials()).unwrap();
    console.log('> credentials: ', credentials);
    console.log('> site access: ', siteAccess);
    console.log('> sites available: ', sitesAvailable);

})();
```
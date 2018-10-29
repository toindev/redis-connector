# redis-connector

```javascript
redis.getClient(clientName, { promisify: true, onError });
```

* **[clientName]** client name used to get the same instance. *Default "base"*
* **[options]** 
    * **[promisify]** decorate redis client with util.promisify. *Default false*
    * **[onError]** function called on error
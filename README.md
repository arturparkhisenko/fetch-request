# fetch-request

> Cancellable Fetch Request using AbortController and AbortSignal. ESM. No dependencies.

Example:

```javascript
import { fetchRequest } from 'fetch-request';

let request = fetchRequest('http://httpstat.us/200?sleep=1000');

request
  .then(result => {
    console.log('✅ Resolved');
  })
  .catch(error => {
    console.log('❌ Rejected');
  });

setTimeout(() => request.cancel(), 10);
// ❌ Rejected
```

[Support: Can I use AbortController and AbortSignal?](https://caniuse.com/#feat=abortcontroller)

![abortcontroller](https://caniuse.bitsofco.de/image/abortcontroller.png)

# Common Problems

## Missing modules

This problem is due to exporting modules and JavaScript, not necessarily Next.js. However, when debugging and working with how the various posts are loaded, if any of these functions are erroring out it can be useful to simply remove the call to one of these functions. (_Ex: say we were working on the `getAllCategories()` function_)

This...

```javascript
import { getSortedPostsData, getAllCategories } from '../../../lib/posts';
```

...versus this...

```javascript
import { getSortedPostsData } from '../../../lib/posts';
```

Or, if you don't modify the imports, and simply just aren't calling it (_supposedly_) after importing it.

```js
export async function getStaticProps({ params }) {
    const posts = getSortedPostsData();
    // const categoriesList = getAllCategories();
    /* more code here... */
}
```

The error this produces in the Next.js build output, in the terminal, can cause things to blow up like `.next/build-manifest.json` or random "missing modules" error descriptions. _It **is** a missing module, but unfortunately nothing states that something this simple could be the cause.

_**So, be wary of all of that, because this is incredibly simple, but doesn't have ANY kind of helpful error output.**_
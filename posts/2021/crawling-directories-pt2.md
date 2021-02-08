---
date: "2021-02-04"
title: "Crawling Directories in Node.js, Pt. 2"
section: 'software'
---



### tl;dr

_A word to the wise...remember your fundamentals._

<hr>

The [last post I wrote on refactoring this blog for subdirectories](https://rushinglabs.com/blog/2021/crawling-directories-nodejs) made an assumption I didn't realize was such a weak point, for generating article routes, based on crawling directories. 



## Build Issues

When deploying after (_I thought_) finishing the code for supporting subdirectories, the deployment builds started failing, and the main error reported was confusing.

I host this site from Heroku, mainly for the ease of use I've found when deploying simple projects. However, this blog is built with Next.js so, I thought why not give Vercel a try. Vercel seems to have specialized support for Next.js, and perhaps I have something configured wrong with Heroku.

Notice that both build error outputs are reporting on the same missing file (`.md`), however following the stack trace the error is thrown from a different code location (`.js`) in the build. Redeploying multiple times produced the same error but from different locations--suggesting the same code was broken, but the build scripts were simply building parts of the site in slightly different order. Either way, this helped narrow the issue for me.

_Heroku build error output_

```bash
> Build error occurred
Error: ENOENT: no such file or directory, stat '/tmp/build_7d6345fd/posts\2016'
    at Object.statSync (fs.js:1016:3)
    at /tmp/build_7d6345fd/.next/server/pages/categories/cpat/pages/[page].js:2243:51
    at Array.forEach (<anonymous>)
    at getAllFiles (/tmp/build_7d6345fd/.next/server/pages/categories/cpat/pages/[page].js:2242:9)
    at getAllFilesWithYearInfo (/tmp/build_7d6345fd/.next/server/pages/categories/cpat/pages/[page].js:2258:21)
    at getCategoryPosts (/tmp/build_7d6345fd/.next/server/pages/categories/cpat/pages/[page].js:2301:21)
    at calculateSectionPagingInfo (/tmp/build_7d6345fd/.next/server/pages/categories/cpat/pages/[page].js:439:97)
    at getStaticPaths (/tmp/build_7d6345fd/.next/server/pages/categories/cpat/pages/[page].js:846:108)
    at buildStaticPaths (/tmp/build_7d6345fd/node_modules/next/dist/build/utils.js:17:86)
    at Object.isPageStatic (/tmp/build_7d6345fd/node_modules/next/dist/build/utils.js:24:555) {
  type: 'Error',
  errno: -2,
  syscall: 'stat',
  code: 'ENOENT',
  path: '/tmp/build_7d6345fd/posts\\2016'
}
```

_Vercel build error output_

```bash
00:04:08.969  	> Build error occurred
00:04:08.971  	Error: ENOENT: no such file or directory, open '/vercel/workpath0/posts/undefined/vercel/workpath0/posts/2016/css-pokemans.md'
00:04:08.971  	    at Object.openSync (fs.js:462:3)
00:04:08.972  	    at Object.readFileSync (fs.js:364:35)
00:04:08.972  	    at getCategoryPosts (/vercel/workpath0/.next/serverless/pages/categories/security/pages/[page].js:3239:68)
00:04:08.972  	    at getStaticPaths (/vercel/workpath0/.next/serverless/pages/categories/security/pages/[page].js:1754:161)
00:04:08.972  	    at buildStaticPaths (/vercel/workpath0/node_modules/next/dist/build/utils.js:17:86)
00:04:08.972  	    at Object.isPageStatic (/vercel/workpath0/node_modules/next/dist/build/utils.js:24:555)
00:04:08.972  	    at execFunction (/vercel/workpath0/node_modules/jest-worker/build/workers/processChild.js:155:17)
00:04:08.972  	    at execHelper (/vercel/workpath0/node_modules/jest-worker/build/workers/processChild.js:139:5)
00:04:08.972  	    at execMethod (/vercel/workpath0/node_modules/jest-worker/build/workers/processChild.js:143:5)
00:04:08.972  	    at process.<anonymous> (/vercel/workpath0/node_modules/jest-worker/build/workers/processChild.js:64:7) {
```



## It RuNs On My MaChInE

Keep in mind, every type of build worked completely fine on the PC I was developing on. Runing `"next dev"`, `"next build"`, and even `"next export"`...they all worked, _and_ produced a working version of the site that never stumbled over a missing file, like what was reported in the build errors.

After three evenings of coming back to this error something finally jumped out to me:

_From the Vercel build_

```bash
00:04:08.971  	Error: ENOENT: no such file or directory, open '/vercel/workpath0/posts/undefined/vercel/workpath0/posts/2016/css-pokemans.md'
```
This path doesn't make sense. Vercel's build servers are likely Unix-based...in some generalized way. And a smart build server would definitely build in a temporary directory of some type, for easier server maintenance. That's likely what the `workpath0` is in the reported file location. 

However, take a closer look:

```bash
vercel/workpath0/posts/undefined/vercel/workpath0/posts...
```

To anyone working with a Unix-based system, it can seem there are many directories with cryptic names, but **_I've never come across a directory called `undefined`_**. Further...why does the path **_appear to repeat_**... `/vercel/workpath0/posts...` and then `...undefined/vercel/workpath0/posts...`.

That's when it dawned on me: _I'm developing on Windows and deploying to some Unix/Linux OS._



## Forward-slash or Backward slash?

This operating system difference (_and thus file system difference_) was the most promising explanation I had so far. So, I dove into how I was _building URLs from file paths_ after crawling directories _to produce a list of files_.

See this is where I realized that refactoring the site to support subdirectories--_for the file-based routing system which Next.js has_--is only **half the battle**. I needed to be aware of two critical requirements for this feature:

> 1. Crawl directories beneath `/posts` to discover the individual posts written
> 2. Use file info to create URL "slugs"

The URL pattern I'm going for is: `http:rushinglabs.com/blog/[year]/[amazing-post-here]`

```js
const getAllFilesWithYearInfo = function(dirPath) {
    const filePaths = getAllFiles(dirPath);
    let fileInfo = [];

    // Full file paths were returned in `filePaths`
    // Iterate over each one to pull the last 2 pieces of info off of the path
    filePaths.map(file => {
        fileInfo.push({
            file: file.split('\\')[file.split('\\').length - 1],
            year: file.split('\\')[file.split('\\').length - 2],
        })
    });

    return fileInfo;
}
```

This function is fairly simplistic. It grabs an array of all of the posts' file paths (`getAllFiles()`), then iterates over the array to pull the file name and year into an object. Then finally, push the new object (`{ file: '', year: 20xx }`) into a new array, `fileInfo`.

I'm building these objects because of the URL slug scheme I am following. With easy access to `file` and `year` properties, it's easier to build the slug out later on. So, I'm using this `.split('\\')` technique in a couple more spots outside of this function. 

It works only because I'm following a specific naming scheme for each post. Thus, the year and file name are always the last two parts of the file path.

```bash
C:\Users\...\dirs\...\posts\2019\post-here.md
C:\Users\...\dirs\...\posts\2020\another-post.md
C:\Users\...\dirs\...\posts\2021\some-post.md
```

These two parts of the Heroku error output started to look suspicious.

```bash
'/tmp/build_7d6345fd/posts\2016'

path: '/tmp/build_7d6345fd/posts\\2016'
```

Thinking I had it backwards, I switched `'\\'` for `/` (the double `\\` for an escaping character), but everything just broke in other parts of the whole process. That's when I realized I missed something fundamental, and a little Googling led me to Node's `path.sep`.



## Path Separators

Since most of the time I'm writing code in C# for Windows-based systems, I (naively) never thought about this. However! The solution was a pretty quick fix, and all was well going forward.

So, this post isn't so much about some elaborate solution as much as it's about how such simple overlooked details can lead to subtle errors, with little explanation, in hard to reach places.

`path.sep`

[https://nodejs.org/api/path.html#path_path_sep](https://nodejs.org/api/path.html#path_path_sep)

Replacing my half-baked file path separation with Node's `path.sep` creates a _much more stable_ mechanism, and we're left with the following.

```js
const getAllFilesWithYearInfo = function(dirPath) {
    const filePaths = getAllFiles(dirPath);
    let fileInfo = [];

    // Full file paths were returned in `filePaths`
    // Iterate over each one to pull the last 2 pieces of info off of the path
    filePaths.map(file => {
        // ***
        // NOTE: Does splitting on the file path delimiter work across multiple operating systems? (i.e. file systems)
        // ***
        let splits = file.split(path.sep);

        fileInfo.push({
            file: splits[splits.length - 1],
            year: splits[splits.length - 2],
        })
    });

    return fileInfo;
}
```


Remember your fundamentals.
---
date: "2021-01-31"
title: "Crawling Directories in Node.js"
section: 'software'
---

A few months ago I converted this blog over to Next.js (file-based routing, big win!) but this also meant that to get the `/[year]/blog-post-title` URL structure I needed to support subdirectories in the build process. So, considering it originally only supported files in a single flat directory, a refactor was in order.

## File systems are easy, right?

A quick Google search for "crawl subdirectories in Node.js" produced a StackOverflow this with this code snippet. A little verbose, but...if it works "oh well", right?

[https://stackoverflow.com/questions/5827612/node-js-fs-readdir-recursive-directory-search](https://stackoverflow.com/questions/5827612/node-js-fs-readdir-recursive-directory-search)

```javascript
/**
 * Produces a list of files (i.e. posts) with the following structure
 * "2018/first-post.md"
 * "2019/another-post.md"
 */
export function getRecursivePosts() {
    const walk = function(dir, done) {
        var results = [];

        // read root of directory passed in
        fs.readdir(dir, function(err, list) {
            if (err) return done(err);
    
            var i = 0;
            (function next() {
                var file = list[i++];
    
                if (!file) return done(null, results);
    
                file = path.resolve(dir, file);
                // pull info on file
                fs.stat(file, function(err, stat) {

                    // if it's a directory...
                    if (stat && stat.isDirectory()) {
                        // ...then walk it
                        walk(file, function(err, res) {
                            results = results.concat(res);
                            next();
                        });
                    } else {
                        // ...or if we found a file, push to results
                        results.push(file);
                        next();
                    }
                })
            })();
        })
    }

    return walk(postsDirectory, function(err, results) {
        if (err) throw err;
        console.log(results);
        console.table(results);
    });
}
```

Seems pretty straight-forward, and does the job, right? Nope. _The problem is it's asynchronous._ For the experienced Node.js dev, this is probably extremely obvious, but for me an async I/O API was the furthest from my mind.

Check the docs :) [https://www.geeksforgeeks.org/node-js-fs-readdir-method/](https://www.geeksforgeeks.org/node-js-fs-readdir-method/)

So, I spent _at least_ a couple hours trying to figure out why my Next.js build kept failing to pull the posts where I expected them. Looking back at this code now though, the callback around `fs.readdir` should've tipped me off.

```js
fs.readdir(dir, function() {
    // callback I should've seen goes here
})
```


## The Fix!

If asynchronous code is kicking my butt, then..._synchronous code fixes it_, right? In this case, yes! And with less code! :D Let this stand as a simple reminder that in Node.js, a little extra attention needs to be paid to whether your code is _sync_ or _async_.

Back to Google, and I found this much smaller function for recursively, _synchronously_ crawling directories in Node.js.

Credit here: [https://coderrocketfuel.com/article/recursively-list-all-the-files-in-a-directory-using-node-js](https://coderrocketfuel.com/article/recursively-list-all-the-files-in-a-directory-using-node-js)

Node.js, `fs.readdirSync`: [https://nodejs.org/api/fs.html#fs_fs_readdirsync_path_options](https://nodejs.org/api/fs.html#fs_fs_readdirsync_path_options)

```javascript
const getAllFiles = function(dirPath, arrayOfFiles) {
    // Use synchronous version of Node.js fs.readdir
    const files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];

    // Iterate over the files, check if it's a directory
    files.forEach(function(file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            // If it is, then we call getAllFiles() again with our new, deeper path
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
            // otherwise, we push our new file (not directory) to our array of files
            arrayOfFiles.push(path.join(dirPath, "/", file));
        }
    });

    return arrayOfFiles;
};
```

Hope this helps! :)
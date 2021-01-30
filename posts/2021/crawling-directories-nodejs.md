---
date: "2021-01-30"
title: "Crawling Directories in Node.js"
section: 'software'
---

Recently, I needed to refactor how this blog organized and routed to individual posts. Cutting to the chase, I needed to support subdirectories


## First Attempt

[https://stackoverflow.com/questions/5827612/node-js-fs-readdir-recursive-directory-search](https://stackoverflow.com/questions/5827612/node-js-fs-readdir-recursive-directory-search)

Problem: asynchronous

```javascript
/**
 * Produces a list of files (i.e. posts) with the following structure
 * "2018/first-post.md"
 * "2019/another-post.md"
 * "2020/some-post.md"
 * "2020/another-post.md"
 * 
 * Ref: https://stackoverflow.com/questions/5827612/node-js-fs-readdir-recursive-directory-search
 */
export function getRecursivePosts() {
    const walk = function(dir, done) {
        var results = [];

        fs.readdir(dir, function(err, list) { // read root of directory passed in
            if (err) return done(err);
    
            var i = 0;
            (function next() {
                var file = list[i++];
    
                if (!file) return done(null, results);
    
                file = path.resolve(dir, file);
                fs.stat(file, function(err, stat) { // pull info on file

                    if (stat && stat.isDirectory()) { // if it's a directory...
                        walk(file, function(err, res) { // ...then walk it
                            results = results.concat(res);
                            next();
                        });
                    } else {
                        results.push(file); // ...or if we found a file, push to results
                        next();
                    }
                })
            })();
        })
    }

    return walk(postsDirectory, function(err, results) { // return walk(postsDirectory, function(err, results) {
        if (err) throw err;
        console.log(results);
        console.table(results);
    });
}
```


## What Worked

_Synchronous code fixed it_, and while that's a simplistic explanation (sync/async is written about _often_)...this is a reminder that in Node.js a little extra attention needs to be paid to whether your code is _sync_ or _async_.

[https://coderrocketfuel.com/article/recursively-list-all-the-files-in-a-directory-using-node-js](https://coderrocketfuel.com/article/recursively-list-all-the-files-in-a-directory-using-node-js)

```javascript
const getAllFiles = function(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function(file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
            arrayOfFiles.push(path.join(dirPath, "/", file));
        }
    });

    return arrayOfFiles;
};
```
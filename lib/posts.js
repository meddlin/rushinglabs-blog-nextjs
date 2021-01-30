import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import remark from 'remark';
import html from 'remark-html';
import prism from 'remark-prism';

const postsDirectory = path.join(process.cwd(), 'posts');

/**
 * Recursively walks the /posts directory to find all posts. Returns an array files; full file path, not just file name.
 * @param {*} dirPath 
 * @param {*} arrayOfFiles 
 */
const getAllFiles = function(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function(file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory())
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        else
            arrayOfFiles.push(path.join(dirPath, "/", file));
    });

    return arrayOfFiles;
};

/**
 * Returns a list of file path objects (all blog posts)
 * -- { file: 'path', year: 'year-subdirectory' }
 * 
 * Recursively walks the /posts directory to find all posts--like `getAllFiles()`, but returns full file & year info.
 * @param {*} dirPath 
 * @param {*} arrayOfFiles 
 */
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


/**
 * Produce a unique array of all categories mentioned across all posts.
 * 
 * Locations used
 * - pages/index.js: used to list all categories on the landing page
 */
export function getAllCategories() {
    const postInfo = getAllFilesWithYearInfo(postsDirectory);

    const allCategories = postInfo.map(post => {
        // Rejoin the `postsDirectory`, `post year`, and `post filename` to build the file path
        const fullPath = path.join(postsDirectory, `/${post.year}/${post.file}`);
        // Use file path to read the file
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        // Use `matter()` to pull the "matter info" from the top of the markdown file
        const matterResult = matter(fileContents);

        // Pull the `section` descriptor out of the markdown info at the top of the blog post
        return (matterResult && matterResult.data && matterResult.data.section) ? matterResult.data.section : '';
    });

    const uniqueCategories = [...new Set(allCategories)];
    return uniqueCategories;
};

/**
 * Return a list of posts containing a specific category tag
 * @param {*} category 
 */
export function getCategoryPosts(category) {
    const postsInfo = getAllFilesWithYearInfo(postsDirectory);
    let allCategoryPosts = [];

    for(let i = 0; i < postsInfo.length; i++) {
        const id = postsInfo[i].file.replace(/\.md$/, '');
        const year = postsInfo[i].year;
        const fullPath = path.join(postsDirectory, `/${postsInfo[i].year}/${postsInfo[i].file}`);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const matterResult = matter(fileContents);

        if ((matterResult && matterResult.data) && matterResult.data.section === category) {
            allCategoryPosts.push({ id, year, ...matterResult.data });
        }
    }

    // Sort posts by date
    return allCategoryPosts.sort((a, b) => {
        if (a.date < b.date) return 1;
        else return -1;
        
    });
}

///
// Fetch a specific post's data
///
export async function getPostData(year, id) {
    const fullPath = path.join(postsDirectory, `${year}/${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // use remark to convert markdown into HTML string
    const processedContent = await remark()
        .use(html)
        .use(prism)
        .process(matterResult.content);
    const contentHtml = processedContent.toString();

    // Combine the data with the id
    return {
        id,
        contentHtml,
        ...matterResult.data
    };
}

///
// Retrieve a list of file names in the `/posts` directory (excluding '.md' extension from name) 
///
export function getAllPostIds() {
    let fileNames = getAllFiles(postsDirectory);
    var postInfo = [];

    for(var i = 0; i < fileNames.length; i++) {
        let noExt = fileNames[i].replace(/\.md$/, '');

        let splitPath = noExt.split('\\');

        let fileName = splitPath[splitPath.length - 1];
        let year = splitPath[splitPath.length - 2];

        postInfo.push({
            params: {
                id: fileName,
                year: year
            }
        });
    }

    return postInfo;    
};


/**
 * Returns a sorted list of all posts
 * This is the main logic used 
 * 
 * Locations used
 * - pages/index.js: Grabs all of the posts
 */
export function getSortedPostsData() {
    const fileNames = getAllFiles(postsDirectory); // Filenames contain the full path

    const allPostsData = fileNames.map(fileName => {
        // Remove the '.md' file extension, and grab the last section of the file path to...
        // Create an id from the filename
        var id = fileName.replace(/\.md$/, '');
        id = id.split('\\')[id.split('\\').length - 1];

        const year = fileName.split('\\')[fileName.split('\\').length - 2];
        id = `${year}/${id}`;

        // Read whole markdown file as string
        const fileContents = fs.readFileSync(fileName, 'utf8');

        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents);

        // Combine the data with the id
        return {
            id,
            ...matterResult.data
        }
    });

    // Sort posts by date
    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    });
};
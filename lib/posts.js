import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import remark from 'remark';
import html from 'remark-html';
import prism from 'remark-prism';

const postsDirectory = path.join(process.cwd(), 'posts');

/**
 * Produce a unique array of all categories mentioned across all posts.
 */
export function getAllCategories() {
    const fileNames = fs.readdirSync(postsDirectory);

    const allCategories = fileNames.map(fileName => {
        // do we need an id?
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const matterResult = matter(fileContents);

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
    const fileNames = fs.readdirSync(postsDirectory);

    let allCategoryPosts = [];
    for(let i = 0; i < fileNames.length; i++) {
        const id = fileNames[i].replace(/\.mdx$/, '');
        const fullPath = path.join(postsDirectory, fileNames[i]);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const matterResult = matter(fileContents);

        if ((matterResult && matterResult.data) && matterResult.data.section === category) {
            allCategoryPosts.push({ id, ...matterResult.data });
        }
    }

    // Sort posts by date
    return allCategoryPosts.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    });
}

///
// Fetch a specific post's data
///
export async function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${id}.mdx`);
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
    const fileNames = fs.readdirSync(postsDirectory);

    return fileNames.map(fileName => {
        return {
            params: {
                id: fileName.replace(/\.mdx$/, '')
            }
        }
    });
};

///
// This returns a list of posts for the main page `/pages/index.js` to display.
///
export function getSortedPostsData() {
    // get file names under /posts
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map(fileName => {
        // Remove the '.md' file extension to...
        // Create an id from the filename
        const id = fileName.replace(/\.mdx$/, '');

        // Read whole markdown file as string
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

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
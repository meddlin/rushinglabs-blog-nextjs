import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import remark from 'remark';
import html from 'remark-html';
import prism from 'remark-prism';
import { getSortedPostsData, getCategoryPosts } from './posts';
import config from '../blogConfig';

export function calculateBlogPagingInfo() {
    let numPages = 0;
    const postsPerPage = config.postsPerPage;
    const postsAvailable = getSortedPostsData().length;

    if (postsPerPage >= postsAvailable) {
        numPages = 1;
    } else if (postsPerPage < postsAvailable) {
    
        if (postsAvailable % postsPerPage != 0) {
            numPages = (Math.trunc(postsAvailable / postsPerPage)) + 1;
        } else {
            numPages = Math.trunc(postsAvailable / postsPerPage);
        }
    
    }

    return numPages;
}

export function calculateSectionPagingInfo(blogSection) {
    let numPages = 0;
    const postsPerPage = config.postsPerPage;
    const postsAvailable = getCategoryPosts(blogSection).length;

    if (postsPerPage >= postsAvailable) {
        numPages = 1;
    } else if (postsPerPage < postsAvailable) {
    
        if (postsAvailable % postsPerPage != 0) {
            numPages = (Math.trunc(postsAvailable / postsPerPage)) + 1;
        } else {
            numPages = Math.trunc(postsAvailable / postsPerPage);
        }
    
    }

    return numPages;
}
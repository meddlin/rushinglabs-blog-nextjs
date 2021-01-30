import Layout from '../../../components/layout';
import Head from 'next/head';
import Date from '../../../components/date';
import { getAllPostIds, getPostData } from '../../../lib/posts'; //  '../../../../lib/posts';
import utilStyles from '../../../styles/utils.module.css';

/**
 * getStaticPaths is required by Next.js
 * 
 * See: https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation
 */
export async function getStaticPaths() {
    const paths = getAllPostIds();

    // The params building happens in /lib/posts.getAllPostIds()
    return {
        paths: paths,
        fallback: false
    }
}

/**
 * getStaticProps is required by Next.js
 * 
 * See: https://nextjs.org/docs/basic-features/data-fetching
 */
export async function getStaticProps({ params }) {
    // `params` contains the router parameters for pages using dynamic routes
    // For this route we have the directory structure /blog/[year]/[id].js
    // --> So, `year` and `id` are part of the params object <--
    
    const postData = await getPostData(params.year, params.id);
    return {
        props: {
            postData
        }
    }
}

export default function Post({ postData }) {

    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
                
            </Head>
            <article>
                <h1 className={utilStyles.headingX1}>{postData.title}</h1>
                <Date dateString={postData.date} />
                <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            </article>
        </Layout>
    );
}
import Layout from '../../../components/layout';
import Link from 'next/link';
import utilStyles from '../../../styles/utils.module.css';
import { getSortedPostsData } from '../../../lib/posts';
import config from '../../../blogConfig';

/**
 * Create the props data needed to display a list of posts for any particular page.
 * @param {*} param
 */
export async function getStaticProps({ params }) {
    const posts = getSortedPostsData();

    const pageIndex = parseInt(params.page) - 1;
    const startIndex = pageIndex * config.postsPerPage;
    const endIndex = (pageIndex + 1) * config.postsPerPage;

    const prevPosts = (pageIndex > 0) ? pageIndex : null;
    const nextPosts = (endIndex >= posts.length) ? null : (pageIndex + 2);
    const numPages  = (config.postsPerPage % getSortedPostsData().length) + 1;

    return {
        props: {
            posts: posts.slice(startIndex, endIndex),
            prevPosts,
            nextPosts,
            pageIndex,
            numPages
        }
    }
};

/**
 * Generate the static paths for pages based on how many posts we have
 */
export async function getStaticPaths() {
    const numPages = (config.postsPerPage % getSortedPostsData().length) + 1;

    return {
        paths: [...Array(numPages)].map( (v, i) => {
            return {
                params: { page: (i + 1).toString() }
            }
        }),
        fallback: false
    }
};

const PostsPage = ({ posts, prevPosts, nextPosts }) => {
    return (
        <Layout home>
            <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
                <h2 className={utilStyles.headingLg}>Blog</h2>
                <ul className={utilStyles.list}>
                    {posts.map( ({ id, date, title }) => (
                        <li className={utilStyles.listItem} key={id}>
                            <Link href={`/blog/${id}`}>
                                <a>{title}</a>
                            </Link>
                            <br />
                            <small className={utilStyles.lightText}>
                                <Date dateString={date} />
                            </small>
                        </li>
                    ))}
                </ul>

                {prevPosts !== null && (
                    <Link href={"/blog/pages/" + prevPosts} passHref>
                        <a>« see newer posts</a>
                    </Link>
                )}
                {nextPosts !== null && (
                    <Link href={"/blog/pages/" + nextPosts} passHref>
                    <a>see older posts »</a>
                    </Link>
                )}
            </section>
        </Layout>
    );
};

export default PostsPage;
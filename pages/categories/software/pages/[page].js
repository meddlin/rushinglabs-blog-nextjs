import Layout from '../../../../components/layout';
import Link from 'next/link';
import utilStyles from '../../../../styles/utils.module.css';
import { getCategoryPosts } from '../../../../lib/posts';
import { calculateSectionPagingInfo } from '../../../../lib/paging';
import config from '../../../../blogConfig';

const _section_ = 'software';

/**
 * 
 * @param {*} param0 
 */
export async function getStaticProps({ params }) {
    const posts = getCategoryPosts(_section_);

    const pageIndex = parseInt(params.page) - 1;
    const startIndex = pageIndex * config.postsPerPage;
    const endIndex = (pageIndex + 1) * config.postsPerPage;

    const prevPosts = (pageIndex > 0) ? pageIndex : null;
    const nextPosts = (endIndex >= posts.length) ? null : (pageIndex + 2);
    const numPages  = (config.postsPerPage % getCategoryPosts(_section_).length) + 1;

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
 * 
 */
export async function getStaticPaths() {
    const pagingInfo = calculateSectionPagingInfo(_section_);

    return {
        paths: [...Array(pagingInfo)].map( (v, i) => {
            return {
                params: { page: (i + 1).toString() }
            }
        }),
        fallback: false
    }
};


const CpatCategory = ({ posts, prevPosts, nextPosts }) => {
    return (
        <Layout>
            <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
                <h2 className={utilStyles.headingLg}>Blog</h2>
                <ul className={utilStyles.list}>
                    {posts.map( ({ id, year, date, title }) => (
                        <li className={utilStyles.listItem} key={id}>
                            <Link href={`/blog/${year}/${id}`}>
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
                    <Link href={`/categories/${_section_}/pages/${prevPosts}`} passHref>
                        <a>« see newer posts</a>
                    </Link>
                )}
                {nextPosts !== null && (
                    <Link href={`/categories/${_section_}/pages/${nextPosts}`} passHref>
                    <a>see older posts »</a>
                    </Link>
                )}
            </section>
        </Layout>
    );
};

export default CpatCategory;
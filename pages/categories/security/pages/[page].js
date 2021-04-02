import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle } from '../../../../components/layout';
import CategoryListing from '../../../../components/category-listing';
import Date from '../../../../components/date';
import utilStyles from '../../../../styles/utils.module.css';
import { getCategoryPosts, getAllCategories } from '../../../../lib/posts';
import { calculateSectionPagingInfo } from '../../../../lib/paging';
import config from '../../../../blogConfig';

const _section_ = 'security';

/**
 * 
 * @param {*} param0 
 */
export async function getStaticProps({ params }) {
    const posts = getCategoryPosts(_section_);
    const categoriesList = getAllCategories();

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
            numPages,
            categoriesList
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


const SecuritySectionPage = ({ posts, prevPosts, nextPosts, categoriesList }) => {
    return (
        <Layout>
            <Head>
				<title>{siteTitle} - {_section_}</title>
			</Head>

            <div className={`${utilStyles.horizontal}`}>
                <section className={`${utilStyles.headingMd} ${utilStyles.padding1px} ${utilStyles.categoriesSection}`}>
                    <CategoryListing categories={categoriesList} active={_section_} />
                </section>

                <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
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

                    <section>
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
                </section>
            </div>
        </Layout>
    );
};

export default SecuritySectionPage;
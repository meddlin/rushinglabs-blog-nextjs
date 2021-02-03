import Link from 'next/link';
import Layout from '../../../components/layout';
import Date from '../../../components/date';
import { getCategoryPosts } from '../../../lib/posts';
import { allCaps } from '../../../lib/text-utils';
import utilStyles from '../../../styles/utils.module.css';
import config from '../../../blogConfig';

const _section_ = 'cpat';

export async function getStaticProps() {
    const posts = getCategoryPosts('cpat');
    const startIdx = 0;
    const endIdx = config.postsPerPage;
    const prevPosts = null;
    const nextPosts = (endIdx >= posts.length) ? null : 2;

    return {
        props: {
            posts: posts.slice(startIdx, endIdx),
            prevPosts,
            nextPosts
        }
    }
};

export default function Cpat({ posts, prevPosts, nextPosts }) {
    return (
        <Layout>
            <h2>Category: {allCaps(_section_)}</h2>
            <ul className={utilStyles.list}>
                {(posts && posts.length > 0) ? (
                    posts.map( ({ id, year, date, title }) => (
                        <li className={utilStyles.listItem} key={id}>
                            <Link href={`/blog/${year}/${id}`}>
                                <a>{title}</a>
                            </Link>
                            <br />
                            <small className={utilStyles.lightText}>
                                <Date dateString={date} />
                            </small>
                        </li>
                    ))
                ) : ''}
            </ul>
            {prevPosts !== null && (
                <Link href={`/categories/${_section_}/pages/` + prevPosts} passHref>
                    <a>« see newer posts</a>
                </Link>
            )}
            {nextPosts !== null && (
                <Link href={`/categories/${_section_}/pages/` + nextPosts} passHref>
                <a>see older posts »</a>
                </Link>
            )}
        </Layout>
    );
};

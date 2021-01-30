import Link from 'next/link';
import Layout from '../../../components/layout';
import Date from '../../../components/date';
import { getCategoryPosts } from '../../../lib/posts';
import utilStyles from '../../../styles/utils.module.css';
import config from '../../../blogConfig';

const _section_ = 'security';

export async function getStaticProps() {
    const posts = getCategoryPosts(_section_);
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

export default function SecuritySection({ posts, prevPosts, nextPosts }) {
    return (
        <Layout>
            <h2>Section: {_section_.charAt(0).toUpperCase() + _section_.slice(1)}</h2>
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
                <Link href={`/categories/${_section_}/pages/${prevPosts}`} passHref>
                    <a>« see newer posts</a>
                </Link>
            )}
            {nextPosts !== null && (
                <Link href={`/categories/${_section_}/pages/${nextPosts}`} passHref>
                <a>see older posts »</a>
                </Link>
            )}
        </Layout>
    );
};

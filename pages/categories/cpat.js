import Link from 'next/link';
import Date from '../../components/date';
import { getCategoryPosts } from '../../lib/posts';
import utilStyles from '../../styles/utils.module.css';

export async function getStaticProps() {
    const posts = getCategoryPosts('cpat');
    console.log(posts);

    return {
        props: {
            posts
        }
    }
};

export default function Cpat({ posts }) {
    return (
        <div>
            <h1>Category: CPAT</h1>
            <ul className={utilStyles.list}>
                {(posts && posts.length > 0) ? (
                    posts.map( ({ id, date, title }) => (
                        <li className={utilStyles.listItem} key={id}>
                            <Link href={`/posts/${id}`}>
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
        </div>
    );
};

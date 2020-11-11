import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import Link from 'next/link';
import Date from '../components/date';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData, getSectionsData } from '../lib/posts';

export async function getStaticProps() {
	const allPostsData = getSortedPostsData();
	const allSectionsData = getSectionsData();
	
	return {
		props: {
			allPostsData,
			allSectionsData
		}
	}

};

export default function Home({ allPostsData, allSectionsData }) {
	return (
		<Layout home>
			<Head>
				<title>{siteTitle}</title>
			</Head>

			<section className={utilStyles.headingMd}>
				<p>
					(This is a sample website - you’ll be building a site like this on{' '}
					<a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
				</p>
			</section>

			<div className={`${utilStyles.horizontal}`}>
				<section>
					<h2>Categories</h2>
					<ul>
						{allSectionsData.map((section) => {
							return (
								<li key={section}>
									<Link href={`/categories/${section}`}>
										{section}
									</Link>
								</li>
							);
						})}
					</ul>
				</section>

				<section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
					<h2 className={utilStyles.headingLg}>Blog</h2>
					<ul className={utilStyles.list}>
						{allPostsData.map( ({ id, date, title }) => (
							<li className={utilStyles.listItem} key={id}>
								<Link href={`/posts/${id}`}>
									<a>{title}</a>
								</Link>
								<br />
								<small className={utilStyles.lightText}>
									<Date dateString={date} />
								</small>
							</li>
						))}
					</ul>
				</section>
			</div>
			
		</Layout>
	);
}
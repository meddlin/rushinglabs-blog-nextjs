import PropTypes from 'prop-types';
import Link from 'next/link';
import styles from './category-listing.module.css';

function CategoryListing({ categories, active }) {
    return (
        <ul>
            {categories.map((section) => {
                if (section === active) {
                    return (
                        <li key={section} className={styles.categoryItem} style={{ fontWeight: 'bold' }}>
                            <b>-&gt; &nbsp;</b>
                            <Link href={`/categories/${section}`}>
                                {section}
                            </Link>
                        </li>
                    );
                }

                return (
                    <li key={section} className={styles.categoryItem}>
                        <Link href={`/categories/${section}`}>
                            {section}
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
}

CategoryListing.propTypes = {
    categories: PropTypes.array.isRequired
};

export default CategoryListing;
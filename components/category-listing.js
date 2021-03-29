import PropTypes from 'prop-types';
import Link from 'next/link';

function CategoryListing({ categories }) {
    return (
        <ul>
            {categories.map((section) => {
                return (
                    <li key={section}>
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
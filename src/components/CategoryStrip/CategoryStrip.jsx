import { Link } from 'react-router-dom'
import categories from '../../data/categories'
import './CategoryStrip.css'

function CategoryStrip() {
  return (
    <div className="category-strip">
      <div className="page-container-wide category-strip__inner">
        <Link to="/shop" className="category-strip__item category-strip__item--all">
          All Categories
        </Link>
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/shop?category=${encodeURIComponent(category.name)}`}
            className="category-strip__item"
          >
            {category.name}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default CategoryStrip

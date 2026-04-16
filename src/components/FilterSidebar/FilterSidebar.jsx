import categories from '../../data/categories'
import Button from '../Button/Button'
import './FilterSidebar.css'

function FilterSidebar({
  selectedCategory,
  maxPrice,
  maxPriceLimit,
  minRating,
  onCategoryChange,
  onPriceChange,
  onRatingChange,
  onReset,
}) {
  return (
    <aside className="filter-sidebar card">
      <h3>Filters</h3>

      <div className="filter-sidebar__group">
        <p>Category</p>
        <select
          value={selectedCategory}
          onChange={(event) => onCategoryChange(event.target.value)}
        >
          <option value="All">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-sidebar__group">
        <p>Price Range</p>
        <label htmlFor="max-price">Up to ${maxPrice}</label>
        <input
          id="max-price"
          type="range"
          min="5"
          max={maxPriceLimit}
          value={maxPrice}
          onChange={(event) => onPriceChange(Number(event.target.value))}
        />
      </div>

      <div className="filter-sidebar__group">
        <p>Minimum Rating</p>
        <select
          value={minRating}
          onChange={(event) => onRatingChange(Number(event.target.value))}
        >
          <option value={0}>All Ratings</option>
          <option value={3}>3★ & above</option>
          <option value={4}>4★ & above</option>
          <option value={4.5}>4.5★ & above</option>
        </select>
      </div>

      <Button variant="ghost" size="sm" onClick={onReset}>
        Clear Filters
      </Button>
    </aside>
  )
}

export default FilterSidebar


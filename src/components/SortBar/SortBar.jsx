import './SortBar.css'

function SortBar({
  count,
  total,
  sortBy,
  onSortChange,
  selectedCategory,
  searchTerm,
}) {
  const activeCategory =
    selectedCategory && selectedCategory !== 'All'
      ? selectedCategory
      : 'All Categories'
  const activeSearch = searchTerm ? ` • Search: "${searchTerm}"` : ''

  return (
    <div className="sort-bar card">
      <div className="sort-bar__left">
        <h3>Shop Results</h3>
        <p>
          Showing <strong>{count}</strong> of <strong>{total}</strong> books • Category:{' '}
          <strong>{activeCategory}</strong>
          {activeSearch}
        </p>
      </div>
      <div className="sort-bar__right">
        <label htmlFor="sort-books">Sort By:</label>
        <select
          id="sort-books"
          value={sortBy}
          onChange={(event) => onSortChange(event.target.value)}
        >
          <option value="popularity">Popularity</option>
          <option value="newest">Newest</option>
          <option value="rating">Top Rated</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>
    </div>
  )
}

export default SortBar

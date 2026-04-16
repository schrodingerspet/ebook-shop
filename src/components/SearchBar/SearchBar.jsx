import './SearchBar.css'

function SearchBar({
  value,
  onChange,
  onSubmit,
  placeholder = 'Search books by title, author, or category...',
  buttonText = 'Search',
}) {
  const handleSubmit = (event) => {
    event.preventDefault()
    if (onSubmit) onSubmit()
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <span className="search-bar__icon" aria-hidden="true">
        🔎
      </span>
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label="Search books"
      />
      <button type="submit">{buttonText}</button>
    </form>
  )
}

export default SearchBar

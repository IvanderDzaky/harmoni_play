const SearchBar = ({handleSearch,query,setQuery}) => {
    return (
         <form onSubmit={handleSearch}>
        <div className="search-bar-container">
          <input
            type="text"
            placeholder="What do you want to listen to?"
            className="search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        </form>
    )
}

export default SearchBar;


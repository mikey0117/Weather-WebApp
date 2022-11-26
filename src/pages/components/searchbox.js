export default function SearchBox ({searchValue, setSearchValue, handleSubmit}) {
  return (
    <div className="search-area">
        <form className="input-group mb-3" onSubmit={handleSubmit}>
            <input
                className="form-control form-control-sm" 
                autoFocus
                type="text" 
                placeholder="Search" 
                aria-label="Location Search" 
                aria-describedby="button-addon2"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
            />
            <button className="btn btn-outline-light" type="submit" id="button-addon2">
                <span className="fa-solid fa-magnifying-glass"></span>
            </button>
        </form>
    </div>
  )
}

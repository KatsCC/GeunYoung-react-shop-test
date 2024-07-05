const Search = ({ searchQuery, setSearchQuery }) => {
  return (
    <>
      <input
        type="text"
        placeholder="검색"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="sm:static sm:flex w-full input input-ghost focus:outline-0 rounded-none sm:rounded bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white sm:transform-none transition-all js-searchInput"
      ></input>
    </>
  );
};

export default Search;

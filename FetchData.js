import React, { useState } from "react";
// import "./FetchData.css";
function FetchData() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(
      `https://api.github.com/search/users?q=${searchQuery}`
    );
    const data = await response.json();
    setSearchResults((prevSearchResults) => [
      ...prevSearchResults,
      ...data.items,
    ]);
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          
          value={searchQuery}
          onChange={handleInputChange}
          placeholder="Enter GitHub username"
        />
        <button type="submit" className="input-btn">
          Search
        </button>
      </form>
      <ul className="ul">
        {searchResults.map((user) => (
          <li key={user.id} className="li">
            <a href={user.html_url} className="a">
              <img
                src={user.avatar_url}
                alt={`${user.login}'s avatar`}
                className="img"
              />
              {user.login}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default FetchData;
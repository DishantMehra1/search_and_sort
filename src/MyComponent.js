import React, { useState, useEffect } from "react";

function MyComponent() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const [filterParam, setFilterParam] = useState(["All"])

  const [searchParams] = useState(["capital", "name"]);
  useEffect(() => {
    fetch("https://restcountries.eu/rest/v2/all")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result)
        },
        (error) => {
          setIsLoaded(false);
          setError(error)
        }
      )
  }, [])
  function search(items) {
    return items.filter((item) => {
      if (item.region === filterParam) {
        return searchParams.some((newItem) => {
          return (
            item[newItem]
              .toString()
              .toLowerCase()
              .indexOf(query.toLowerCase()) > -1
          );
        });
      } else if (filterParam === "All") {
        return searchParams.some((newItem) => {
          return (
            item[newItem]
              .toString()
              .toLowerCase()
              .indexOf(query.toLowerCase()) > -1
          );
        });
      }
      return false;
    });
  }


  if (error) {
    return <>{error.message}</>
  } else if (!isLoaded) {
    return <> Loading..... </>
  } else {
    return (
      <div className="wrapper" >
        <div className="search-wrapper" >
          <label htmlFor="search-form" >
            <input
              type="search"
              name="search-form"
              id="search-form"
              className="search-input"
              placeholder="search for...."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <span className="sr-only" >Search Countries here</span>
          </label>
          <div className="select" >
            <select
              onChange={(e) => setFilterParam(e.target.value)}
              className="custom-select"
              aria-label="Filter Countries By Region"
            >
              <option value="All">Filter By Region</option>
              <option value="Africa">Africa</option>
              <option value="Americas">America</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="Oceania">Oceania</option>
            </select>
            <span className="focus"></span>
          </div>
        </div >
        <ul className="card-grid" >
          {search(items).map(item => (
            <li>
              <article className="card" key={item.id}  >
                <div className="card-image" >
                  <img src={item.flag} alt={item.name} />
                </div>
                <div className="card-content" >
                  <h2 className="card-name" > {item.name} </h2>
                  <ol className="card-list" >
                    <li>
                      population: {" "} <span> {item.population} </span>
                    </li>
                    <li>
                      region: {" "} <span> {item.region} </span>
                    </li>
                    <li>
                      capital: {" "} <span> {item.capital} </span>
                    </li>
                  </ol>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div >
    )
  }

}

export default MyComponent;
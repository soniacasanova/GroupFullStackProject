import React, { useEffect, useState, useContext } from "react";
import { SearchContext } from "./ProceedingContent";
import { v4 as uuidv4 } from "uuid";
import * as api from "../api";
import "./ProceedingSearch.css";

function ProceedingSearch({ initSelectedPostcodes }) {
  const [postcodes, setPostcodes] = useState([]);
  const [requestDate, setRequestDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [expanded, setExpanded] = useState(false);
  const { setSearch } = useContext(SearchContext);

  const loadAllPostcodes = async () => {
    try {
      const allPostcodes = await api.getAllPostcodes();
      if (allPostcodes) {
        setPostcodes(allPostcodes);
      }
    } catch (err) {
      console.log(err.toString());
    }
  };

  useEffect(() => {
    loadAllPostcodes();
  }, []);

  const handleCheckbox = (e) => {
    let newPostcode = {};
    setPostcodes(
      postcodes.map((item) => {
        newPostcode = {
          postcode: item.postcode,
          selected:
            e.target.id === item.postcode ? e.target.checked : item.selected,
        };
        return newPostcode;
      })
    );
  };

  const handleSearch = (e) => {
    e.preventDefault();
    let newSearch = new URLSearchParams(
      postcodes
        .filter((item) => item.selected === true)
        .map((item) => ["postcode", item.postcode])
    );
    newSearch.append("date", requestDate);
    if (newSearch) {
      setSearch(newSearch.toString());
    }
    setExpanded(false);
  };

  return (
    <div className="search-box">
      <form onSubmit={handleSearch}>
        <label>
          Sol.licituds anteriors a:
          <input
            type="date"
            value={requestDate}
            onChange={(e) => setRequestDate(e.target.value)}
          />
        </label>
        <div className="multiselect">
          <div className="select-box" onClick={(e) => setExpanded(!expanded)}>
            <span style={{padding: "0.4rem 0 0 0" }}>Zones:</span>       
            <select name="postcodes" defaultValue="">
              <option value="" disabled hidden>
                {postcodes
                  .filter((item) => item.selected === true)
                  .map((item) => item.postcode)
                  .join(", ")}
              </option>
            </select>            
            <div className="over-select"></div>
          </div>
          <div className={`checkboxes ${expanded ? "expanded" : ""}`}>
            {postcodes.map((item) => (
              <label htmlFor={item.postcode} key={uuidv4()}>
                <input
                  type="checkbox"
                  key={uuidv4()}
                  id={item.postcode}
                  defaultChecked={item.selected}                   
                  onChange={handleCheckbox}
                />
                {item.postcode}
              </label>
            ))}
          </div>
        </div>
        <input className="btn-search" type="submit" value="Buscar" />
      </form>
    </div>
  );
}

export default ProceedingSearch;

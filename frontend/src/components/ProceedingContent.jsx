import React, { useState, useEffect, createContext, useContext } from "react";
import { ScheduleContext } from "../pages/SchedulePage";
import ProceedingList from "./ProceedingList";
import ProceedingMap from "./ProceedingMap";
import ProceedingSearch from "./ProceedingSearch";
import * as api from "../api";
import "./ProceedingContent.css";

export const SearchContext = createContext();

function ProceedingContent() {
  const [proceedingData, setProceedingData] = useState(null);
  const [search, setSearch] = useState("");
  const [toggle, setToggle] = useState(true);

  const { setProceedingIdSelected, visitAdded, visitRemoved } = useContext(ScheduleContext);

  const loadProceedingData = async () => {
    try {
      const proceedings = await api.getProceedings(
        search !== "" ? `?${search}` : ""
      );
      if (proceedings) {
        setProceedingData(proceedings);
        setProceedingIdSelected(proceedings[0]._id);
      }
    } catch (err) {
      console.log(err.toString());
    }
  };

  useEffect(() => {
    loadProceedingData();
  }, [search, visitAdded, visitRemoved]);

  let content;
  if (proceedingData === null) {
    content = <div>loading...</div>;
  } else {
    if (toggle) {
      content = <ProceedingList proceedingData={proceedingData}/>;
    } else {
      content = <ProceedingMap proceedingData={proceedingData}/>;
    }
  }

  return (    
    <SearchContext.Provider value={{ search, setSearch }}>
      <div className="wrapper-box">
        <div className="actions-box">      
          <ProceedingSearch />
          <div className="button-box">
            <input
              type="button"
              value=""
              className={`btn-list ${toggle ? "clicked" : "no-clicked"}`}
              onClick={(e) => setToggle(!toggle)}
            />
            <input
              type="button"
              value=""
              className={`btn-map ${toggle ? "no-clicked" : "clicked"}`}
              onClick={(e) => setToggle(!toggle)}
            />
          </div>
        </div>
        <div className="content-box">{content}</div>
      </div>
    </SearchContext.Provider>
  );
}

export default ProceedingContent;

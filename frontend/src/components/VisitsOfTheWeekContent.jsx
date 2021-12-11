import React, { useState, createContext } from "react";
import VisitsOfTheDayList from "./VisitsOfTheDayList";
import "./VisitsOfTheWeekContent.css";

const TIME_ONE_DAY = 60 * 60 * 24 * 1000;  

export const WeekContext = createContext();

function getRelativeDayInWeek(dt, dy) {
  dt = new Date(dt);
  let day = dt.getDay();
  let diff = dt.getDate() - day + (day === 0 ? -6 : dy);
  return new Date(dt.setDate(diff));
}

function VisitsOfTheWeekContent() {
  const [weekStart, setWeekStart] = useState(getRelativeDayInWeek(new Date(), 1));

  return (
    <WeekContext.Provider value={{weekStart}}>
      <div className="button-date">
        <button className="previous" onClick={(e) => setWeekStart(new Date(weekStart.getTime() - TIME_ONE_DAY * 7))}><img src="/src/img/previous.svg"/></button>
        <input type="date" value={weekStart.toISOString().slice(0, 10)} onChange={(e) => setWeekStart(getRelativeDayInWeek(e.target.value, 1))}/>
        <button className="next" onClick={(e) => setWeekStart(new Date(weekStart.getTime() + TIME_ONE_DAY * 7))}><img src="/src/img/next.svg"/></button>
      </div>
      <div className="week-container">
        <VisitsOfTheDayList visitDate={weekStart.toISOString().slice(0, 10)} />
        <VisitsOfTheDayList visitDate={new Date(weekStart.getTime() + TIME_ONE_DAY).toISOString().slice(0, 10)} />      
        <VisitsOfTheDayList visitDate={new Date(weekStart.getTime() + TIME_ONE_DAY * 2).toISOString().slice(0, 10)} />      
        <VisitsOfTheDayList visitDate={new Date(weekStart.getTime() + TIME_ONE_DAY * 3).toISOString().slice(0, 10)} />
        <VisitsOfTheDayList visitDate={new Date(weekStart.getTime() + TIME_ONE_DAY * 4).toISOString().slice(0, 10)} />
      </div>
    </WeekContext.Provider>
  )
}

export default VisitsOfTheWeekContent;
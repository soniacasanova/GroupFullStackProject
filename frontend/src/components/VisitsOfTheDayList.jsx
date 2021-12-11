import React, { useEffect, useState, useContext } from "react";
import { WeekContext } from "./VisitsOfTheWeekContent";
import { ScheduleContext } from "../pages/SchedulePage";
import * as api from "../api";
import "./VisitsOfTheDayList.css";

const daysInCatalan = [
  "Diumenge",
  "Dilluns",
  "Dimarts",
  "Dimecres",
  "Dijous",
  "Divendres",
  "Dissabte",
];

function VisitsOfTheDayList({ visitDate }) {
  const [visitsOfTheDay, setVisitsOfTheDay] = useState(null);
  const [newVisitTime, setNewVisitTime] = useState("");
  const weekStart = useContext(WeekContext);
  const {
    proceedingIdSelected,
    visitAdded,
    setVisitAdded,
    visitRemoved,
    setVisitRemoved,
  } = useContext(ScheduleContext);

  const loadVisitsOfTheDay = async () => {
    try {
      const visits = await api.getVisitsOfTheDay(visitDate);
      if (visits) {
        setVisitsOfTheDay(visits);
      }
    } catch (err) {
      console.log(err.toString());
    }
  };

  useEffect(() => {
    loadVisitsOfTheDay();
  }, [weekStart]);

  const handleAddVisit = async (e) => {
    if (newVisitTime) {
      let visitDateTime = new Date(visitDate);
      visitDateTime.setUTCHours(newVisitTime.slice(0, 2));
      visitDateTime.setUTCMinutes(newVisitTime.slice(3, 5));
      const newVisit = await api.addVisit(
        visitDateTime.toISOString(),
        proceedingIdSelected
      );
      if (newVisit) {
        setNewVisitTime("");
        loadVisitsOfTheDay();
        setVisitAdded(!visitAdded);
      }
    }
  };

  const handleRemoveVisit = async (visitId) => {
    const oldVisit = await api.removeVisit(visitId);
    if (oldVisit) {
      loadVisitsOfTheDay();
      setVisitRemoved(!visitRemoved);
    }
  };

  let table;
  let newVisitDate, day, dd, mm;
  let proceeding, proceedingName;
  if (visitsOfTheDay === null) {
    table = <div>loading...</div>;
  } else {
    newVisitDate = new Date(visitDate);
    day = newVisitDate.getDay();
    dd = newVisitDate.getDate();
    dd = dd < 10 ? "0" + dd : dd;
    mm = newVisitDate.getMonth() + 1;
    mm = mm < 10 ? "0" + mm : mm;
    table = (
      <table className="days-of-week">
        <thead>
          <tr>
            <th className="day" colSpan="3">
              {`${daysInCatalan[day]} ${dd}/${mm}`}
              <input
                type="time"
                value={newVisitTime}
                onChange={(e) => setNewVisitTime(e.target.value)}
              />
              <input type="button" value="+" onClick={handleAddVisit} />
            </th>
          </tr>
        </thead>
        <tbody className="text-box-day">
          {visitsOfTheDay.map((visit) => {
            proceeding = { ...{ ...visit.proceeding_ObjectId } };
            proceedingName = { ...proceeding.name };
            return (
              <tr key={visit._id}>
                <td>{visit.visit_date.slice(11, 16)}</td>
                <td>
                  {proceedingName.first} {proceedingName.last}
                </td>
                <td>
                  <button className="trash" onClick={(e) => handleRemoveVisit(visit._id)}>
                    <img src="/src/img/trash.svg" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  return (
    <div>
      <div className="appointments">{table}</div>
    </div>
  );
}

export default VisitsOfTheDayList;

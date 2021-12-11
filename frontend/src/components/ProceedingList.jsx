import React, { useContext } from "react";
import { ScheduleContext } from "../pages/SchedulePage";
import { v4 as uuidv4 } from "uuid";
import "./ProceedingList.css";

function ProceedingList({ proceedingData }) {
  const { proceedingIdSelected, setProceedingIdSelected } =
    useContext(ScheduleContext);

  let table;
  let tableHeader;
  let requetDate, dd, mm;
  tableHeader = [
    "Sel.",
    "D.Sol.licitud",
    "Id. Procés",
    "Nom i Cognoms",
    "Adreça",
    "CP",
    "Tipus de Procés",
    "Telèfons",
  ];    
  table = (
    <div id="table">
    <table className="table-list">
      <thead>
        <tr>
          {tableHeader.map((header) => (
            <th key={uuidv4()}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {proceedingData.map((proceeding) => {
          requetDate = new Date(proceeding.request_date);
          dd = requetDate.getDate();
          dd = dd < 10 ? "0" + dd : dd;
          mm = requetDate.getMonth() + 1;
          mm = mm < 10 ? "0" + mm : mm;
          return (
            <tr key={proceeding._id}>
              <td>
                <input
                  type="radio"
                  name="proceedings"
                  value={proceeding._id}
                  checked={proceeding._id === proceedingIdSelected}
                  onChange={(e) => setProceedingIdSelected(e.target.value)}
                />
              </td>
              <td>{`${dd}/${mm}/${requetDate.getFullYear()}`}</td>
              <td>{proceeding.proceeding_id}</td>
              <td>{proceeding.name.first} {proceeding.name.last}</td>
              <td>{proceeding.address.street}</td>
              <td>{proceeding.address.postcode}</td>
              <td>{proceeding.type}</td>
              <td>{proceeding.phone_numbers.join(", ")}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
    </div>
  );

  return (
    <div>
      <div>{table}</div>
    </div>
  );
}

export default ProceedingList;

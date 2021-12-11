const HOST = `http://localhost:8080`;

export const login = async ({ valuer_id, password }) => {
  const response = await fetch(`${HOST}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ valuer_id, password }),
  });
  const json = await response.json();
  return json;
};

export const getProceedings = async (queryString) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${HOST}/proceedings${queryString}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });
  const proceedings = await response.json();
  return proceedings;
};

export const getAllPostcodes = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${HOST}/postcodes`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });
  const postcodes = await response.json();
  return postcodes;
};

export const getValuer = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${HOST}/valuer`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });
  const valuer = await response.json();
  return valuer;
};

export const getPhoto = async (valuer_id) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${HOST}/valuer/photo/${valuer_id}`, {
    method: "GET",
    cache: "no-cache",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "image/jpeg",
    },
  });
  const photo = await response.blob();
  return [URL.createObjectURL(photo), null];
};

export const getVisitsOfTheDay = async (visitDate) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${HOST}/visits/${visitDate}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });
  const visits = await response.json();
  return visits;
};

export const addVisit = async (visiDate, proceedingId) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${HOST}/visits`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({ visit_date: visiDate, proceeding_ObjectId: proceedingId }),
  });
  const newVisit = await response.json();
  return newVisit;
};

export const removeVisit = async (visitId) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${HOST}/visits/${visitId}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });
  const oldVisit = await response.json();
  return oldVisit;
};
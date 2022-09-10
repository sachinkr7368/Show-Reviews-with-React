import React, { useEffect, useState } from "react";
import './shows.css';

export default function Actor() {
  const [actors, setActors] = useState("");

  const [data, setData] = useState([]);

  const [data2, setData2] = useState([]);

  useEffect(() => {
    async function fetchdata() {
      const response = await fetch(
        `https://api.tvmaze.com/search/people?q=${actors}`
      );

      const res_data = await response.json();

      // console.log(res_data);

      setData(res_data);
    }

    fetchdata();
  }, [actors]);

  const getFilms = () => {
    let res = data.filter(
      (item) => item.person.name.toLowerCase() === actors.toLowerCase()
    );

    return res && res.length > 0 && res[0].person.id !== undefined
      ? res[0].person.id
      : 1;
  };

  useEffect(() => {
    async function fetchdata() {
      let result = getFilms() >= 1 ? getFilms() : "No result found!";
      // console.log(result);
      // console.log(getFilms());

      const response = await fetch(
        `https://api.tvmaze.com/people/${result}/castcredits?embed=show`
      );

      const res_data2 = await response.json();
      console.log(res_data2);

      if (actors.length > 0) setData2(res_data2);
    }

    fetchdata();
  }, [actors]);

  const actorsName = (event) => {
    setActors(event.target.value);
  };

  return (
    <div className="main">
      <p style={{ color: "white" }}> {actors === '' ? 'Enter Show Name by Actor Below' : ''}</p>
      <input className="input" onChange={actorsName} placeholder="eg: Akon.." />

      {data2.length > 0 ? (
        data2.map((item) => {
          return (
            <div className="show">
              <img className="image" onHover={item._embedded.show.summary}
                src={
                  item._embedded.show.image.medium !== null
                    ? item._embedded.show.image.medium
                    : ""
                }
                alt="No image available"
              />
              <div className="details">
                <h3 className="name">{item._embedded.show.name}</h3>
                <h3 className="rating">
                  {item._embedded.show.rating.average !== null
                    ? item._embedded.show.rating.average
                    : "0.0"}
                </h3>
                <p className="summary">{item._embedded.show.summary}</p>

              </div>
            </div>
          );
        })
      ) : (
        <p className="result" style={{ color: "red" }}>No result found!</p>
      )}
    </div>
  );
}

// `https://api.tvmaze.com/people/${item.person.id}/castcredits?embed=show

// https://pad.riseup.net/p/wuHeV6Wl40rWOc4ZvSIC

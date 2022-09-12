import "./shows.css";
import React, { useEffect, useState } from "react";

export default function Shows() {
  const [shows, setShows] = useState("");
  const [data, setData] = useState([]);
  // const searchvalue = true;

  useEffect(() => {
    async function fetchdata() {
      const response = await fetch(
        `https://api.tvmaze.com/search/shows?q=${shows}`
      );
      const res_data = await response.json();
      console.log(res_data);
      setData(res_data);
    }
    fetchdata();
  }, [shows]);

  const showsName = (event) => {
    setShows(event.target.value);
  };
  return (
    <div className="main">
      <p style={{ color: "White" }}>{shows === '' ? 'Enter Show Name Below' : ''}</p>
      <input className="input" onChange={showsName} placeholder="eg: friends" />

      {data.length > 0 ? (
        data.map((item) => {
          return (
            <div className="show">
              <h3 key={item.show.id}>
                <img className="image"
                  src={item.show.image !== null ? item.show.image.medium : ""}
                  alt="Image not Available"
                />
                <div className="details">
                  <h3 className="show-name">{item.show.name}</h3>
                  <h3 className="rating">
                    {item.show.rating.average !== null ? item.show.rating.average : "0.0"}</h3>

                </div>
                <p className="summary">{item.show.summary}</p>
              </h3>
            </div>
          );
        })
      ) : (shows === '' ?
        <p className="result" style={{ color: "red" }}>No result found!</p> : ''
      )}
    </div>
  );
}

import React, { useState } from "react";

function Actor(props) {
  const { data } = props;
  return data.map((item) => {
    return (
      // getting Actor Details from API and set it in proper manners in div
      <a href={item?._embedded?.show?.url}>
        {
          <div className="card">
            {item._embedded.show.image ? (
              <img
                className="card_img"
                src={item?._embedded?.show?.image?.medium}
                alt="no img found"
              />
            ) : (
              <img
                className="card_img"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png"
                alt="no img found"
              />
            )}
            <div className="card_info">
              <p className="card_title">Name: {item?._embedded?.show?.name}</p>
              {item._embedded.show.language ? (
                <p className="card_category">
                  Language: {item?._embedded?.show?.language}
                </p>
              ) : (
                <p className="card_category">Language: NA</p>
              )}
              {item._embedded.show.rating.average ? (
                <p className="card_category">
                  {" "}
                  Rating: {item?._embedded?.show?.rating?.average} ⭐
                </p>
              ) : (
                <p className="card_category">Rating: NA ⭐</p>
              )}
            </div>
          </div>
        }{" "}
      </a>
    );
  });
}
export default Actor;

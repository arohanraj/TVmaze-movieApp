import { useEffect, useState } from "react";
import Actor from "./Actor";
import "./App.css";
import Shows from "./Shows";

function App() {
  const [input, setInput] = useState("");
  const [select, setSelect] = useState("");
  const [actorData, setActorData] = useState([]);
  const [showData, setShowData] = useState([]);
  const [actorsShowData, setActorsShowData] = useState([]);
  const [view, setView] = useState(false);
  const [loading, setLoading] = useState(false);

  function fetchApiData() {
    console.log("API fetched");
    if (select === "actor") {
      fetch(`https://api.tvmaze.com/search/people?q=${input}`)
        .then((response) => response.json())
        .then((result) => {
          setActorData(result);
          // console.log(result, "result");
          setLoading(false);
        });
    } else {
      fetch(`https://api.tvmaze.com/search/shows?q=${input}`)
        .then((response) => response.json())
        .then((result) => {
          setShowData(result);
          // console.log(result, "result");
          setLoading(false);
        });
    }
  }

  //fetch the actor's Shows from api

  function fetchActorsShow() {
    if (actorData.length !== 0) {
      console.log(actorData[0]?.person?.id, actorData[0]?.person?.name);
      if (input === "") {
        setActorsShowData([]);
      } else {
        fetch(
          `https://api.tvmaze.com/people/${actorData[0]?.person?.id}/castcredits?embed=show`
        )
          .then((res) => res.json())
          .then((result) => {
            setActorsShowData(result);
            setLoading(false);
          });
      }
    }
  }

  ////fetch the API with debouncing //ref :-https://www.youtube.com/watch?v=qHKHASOuuFA&t=393s
  useEffect(() => {
    let timerOut = setTimeout(() => {
      fetchApiData();
    }, 500);

    return () => {
      clearTimeout(timerOut);
      setActorData([]);
      setShowData([]);
    };
  }, [input]);

  //fetch actor shows details------------------------------------------
  useEffect(() => {
    fetchActorsShow();
  }, [actorData, input]);

  //Radio button Selection Function
  function updateRadio(e) {
    setInput("");
    console.log(input, "Input log");
    setSelect(e.target.id);
    console.log(select, "select");
  }

  //function for receiving the input
  function onInputChange(e) {
    const val = e.target.value;
    setInput(val);
    console.log(val);
    setLoading(true);
  }

  return (
    <>
      {/* Input Container */}
      <div className="input_container">
        <h1> TVmaze MovieBox </h1>
        <div>
          <h2>Search Your Favourite Show</h2>
          <div>
            <input
              id="actor"
              onChange={updateRadio}
              type="radio"
              value="actor"
              name="select"
            />
            Actor
            <input
              id="shows"
              onChange={updateRadio}
              type="radio"
              value="shows"
              name="select"
            />
            Shows
          </div>
          {/* <br /> */}

          {/* onfocus functionality */}
          <div className="spanDiaplay">
            {!select ? (
              view ? (
                <p style={{ color: "red" }}>Please Select Your Option</p>
              ) : null
            ) : select === "shows" ? (
              <p>Enter Show's Name Below</p>
            ) : (
              <p>Enter Actor's Name Below</p>
            )}
          </div>

          {select === "shows" ? (
            <div>
              <input
                type={"text"}
                placeholder="eg: Friends"
                onChange={onInputChange}
                value={input}
                onFocus={() => setView(true)}
              />
            </div>
          ) : (
            <div>
              <input
                type={"text"}
                placeholder="eg: Akon"
                onChange={onInputChange}
                value={input}
                onFocus={() => setView(true)}
              />
            </div>
          )}
        </div>
      </div>

      {/* Result Container */}
      {/* import Shows and Actors component  */}
      <div className="result_container">
        <h4>YOUR RESULTS</h4>

        {/* Loader and errortext part */}
        <div className="errorText">
          {!select ? (
            ""
          ) : loading && input ? (
            <p className="loading">Loading...</p>
          ) : select === "shows" ? (
            showData.length === 0 && input && <p>Opps...! No data found</p>
          ) : (
            actorsShowData.length === 0 &&
            input && <p>Opps...! No data found</p>
          )}
        </div>

        {/* after loading Result Container */}
        <div className="result_container_components">
          {select === "shows" ? (
            <Shows data_show={showData} />
          ) : (
            <Actor data={actorsShowData} />
          )}
        </div>
      </div>
      {/* {console.log(showData, "show datta")} */}
    </>
  );
}

export default App;

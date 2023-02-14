import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import About from "./components/pages/About";
import Home from "./components/pages/Home";
import Profile from "./components/pages/Profile";
import InteractionsCheckMate from "./components/pages/InteractionsCheckMate";
import "./App.css";

function App() {
  const [user, setUser] = useState("");
  const [currentData, setCurrentData] = useState({
    rxCUIs: [""],
    interactions: [""],
    doses: [""],
    drugs: [""],
    frequencies: [""],
  });
  const [display, setDisplay] = useState(true);
  const [profileData, setProfileData] = useState({
    rxCUIs: [""],
    interactions: [""],
    doses: [""],
    drugs: [""],
    frequencies: [""],
  });

  const getUserId = (userObject) => {
    axios
      .get(
        `https://checkmate-backend.herokuapp.com/checkmateusers/${userObject.sub}`
      )
      .then((response) => {
        console.log(response);
        if (response.data.id) {
          console.log(response.data);
          setUser(response.data);
          window.localStorage.setItem(
            "checkMateUser",
            JSON.stringify(response.data)
          );
          // return response.data;
        } else {
          axios
            .post(`https://checkmate-backend.herokuapp.com/checkmateusers`, {
              name: userObject.given_name,
              email: userObject.email,
              jtw: userObject.sub,
              picture: userObject.picture,
            })
            .then((response) => {
              console.log(response);
              setUser(response.data);
              window.localStorage.setItem(
                "checkMateUser",
                JSON.stringify(response.data)
              );
              // return response.data;
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const handleCallback = (response) => {
      // console.log("Encoded JWT ID token: " + response.credential);
      let userObject = jwt_decode(response.credential);
      getUserId(userObject);
    };

    /* global google */
    google.accounts.id.initialize({
      client_id:
        "595741328882-52aau51goa0gdurn1vbv9l5t0863r4rk.apps.googleusercontent.com",
      callback: handleCallback,
    });
    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "medium",
      shape: "pill",
    });
    google.accounts.id.renderButton(document.getElementById("signUpDiv"), {
      theme: "outline",
      size: "large",
      shape: "pill",
      width: "250px",
    });
  }, [user]);

  useEffect(() => {
    const data = window.localStorage.getItem("checkMateUser");
    console.log(data);
    if (data) setUser(JSON.parse(data));
  }, []);

  const handleSignOut = (e) => {
    setUser("");
    setProfileData({
      rxCUIs: [""],
      interactions: [""],
      doses: [""],
      drugs: [""],
      frequencies: [""],
    });
    window.localStorage.setItem("checkMateUser", false);
    document.getElementById("signInDiv").hidden = false;
  };

  const getInteractions = async (formData, type) => {
    if (formData[0].drug || profileData.rxCUIs[0]) {
      console.log("getInteractions called");
      // console.log(formData);
      const rxCUICodes = [];
      const drugs = [];
      const doses = [];
      const frequencies = [];
      for (let idx in formData) {
        rxCUICodes.push(formData[idx].rxCUI);
        let drugName =
          formData[idx].drug.charAt(0).toUpperCase() +
          formData[idx].drug.slice(1);
        drugs.push(drugName);
        doses.push(formData[idx].dose);
        frequencies.push(formData[idx].frequency);
      }
      const newInteractions = [];
      const rxCUIsCode = rxCUICodes.join("+");
      let interactionURL = `https://rxnav.nlm.nih.gov/REST/interaction/list.json?rxcuis=${rxCUIsCode}`;
      const response = await axios.get(interactionURL);
      try {
        if ("fullInteractionTypeGroup" in response.data) {
          const interactions = response.data.fullInteractionTypeGroup;
          // console.log(interactions);
          // console.log(response.data);
          newInteractions.push(interactions);
        } else {
          const disclaimer = response.data.nlmDisclaimer;
          // console.log(disclaimer);
          newInteractions.push([disclaimer]);
        }
      } catch (error) {
        console.log(error);
      }
      const newCurrentData = {
        rxCUIs: rxCUICodes,
        interactions: newInteractions,
        drugs: drugs,
        doses: doses,
        frequencies: frequencies,
      };
      console.log(newCurrentData);
      if (type === "interactioncheck") {
        setCurrentData(newCurrentData);
      } else if (type === "profileinteractions") {
        setProfileData(newCurrentData);
      }
    }
  };

  return (
    <Routes>
      <Route
        path='/'
        element={<Home user={user} handleSignOut={handleSignOut} />}
      />
      <Route
        path='/about'
        element={<About user={user} handleSignOut={handleSignOut} />}
      />
      <Route
        path='/profile'
        element={
          <Profile
            user={user}
            getInteractions={getInteractions}
            handleSignOut={handleSignOut}
            profileData={profileData}
          />
        }
      />
      <Route
        path='/interactions'
        element={
          <InteractionsCheckMate
            user={user}
            handleSignOut={handleSignOut}
            display={display}
            setDisplay={setDisplay}
            getInteractions={getInteractions}
            currentData={currentData}
          />
        }
      />
    </Routes>
  );
}

export default App;

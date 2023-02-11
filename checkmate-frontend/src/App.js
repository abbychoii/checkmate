import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import About from "./components/pages/About";
import Home from "./components/pages/Home";
import Profile from "./components/pages/Profile";
import InteractionsCheckMate from "./components/pages/InteractionsCheckMate";

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
  const handleCallbackResponse = (response) => {
    // console.log("Encoded JWT ID token: " + response.credential);
    let userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);
    window.localStorage.setItem("checkMateUser", JSON.stringify(userObject));
  };

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "595741328882-52aau51goa0gdurn1vbv9l5t0863r4rk.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });
    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
  }, [user]);

  useEffect(() => {
    const data = window.localStorage.getItem("checkMateUser");
    console.log(data);
    if (data) setUser(JSON.parse(data));
  }, []);

  const handleSignOut = (e) => {
    setUser("");
    window.localStorage.setItem("checkMateUser", false);
    document.getElementById("signInDiv").hidden = false;
  };

  const getInteractions = async (formData) => {
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
    setCurrentData(newCurrentData);
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
        element={<Profile user={user} handleSignOut={handleSignOut} />}
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

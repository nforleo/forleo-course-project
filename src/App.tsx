import React, { useEffect, useState } from 'react';
import './App.css';
import { HomeScreen } from './components/Home';


const CLIENT_ID = '201cf375de154206b36313c9ac81b524';
const CLIENT_SECRET = 'a3ab60e16865423cbdcdc14a5f513295';


function App() {

  const [accessToken, setAccessToken] = useState<string>("");

  useEffect(() => {
    const auth = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: "grant_type=client_credentials&client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET
    };

    fetch('https://accounts.spotify.com/api/token', auth).then((res) => {
      return res.json();
    }).then((data) => {
      setAccessToken(data.access_token);
    });
  }, []);

  return (
    <HomeScreen accessToken={accessToken}/>
  );
}

export default App;

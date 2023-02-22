/**
 * Gets valid Spotify access token to use in the rest of the application.
 */
import React, { useEffect, useState } from 'react';
import { getAccessToken } from './apiQueries';
import './App.css';
import { HomeScreen } from './components/Home';

/**
 * Render HomeScreen and pass in accessToken
 * @returns 
 */
function App() {

  const [accessToken, setAccessToken] = useState<string>("");

  useEffect(() => {
    // On load of this component, make call to get Spotify access token
    getAccessToken()
    .then((data) => {
      setAccessToken(data.access_token);
      // setAccessToken("error")
    })
    .catch(() => {
      setAccessToken("error")
    });
  }, []);

  return (
    <HomeScreen accessToken={accessToken}/>
  );
}

export default App;

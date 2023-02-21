import { useState } from "react";
import styled from "styled-components";
import { searchByTextQuery } from "../apiQueries";
import { AppLogo } from "./Logo";
import { SearchBar } from "./SearchBar";

const HomeScreenStyle = styled.div`
    width: 100%;
    height: 100%;
    background-image: linear-gradient(black, gray);
    padding: 1rem;

    display: flex;
    flex-direction: column;
    align-items: center;
  
  
`;

const TableContainer = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 1em;

  #artist-table, #track-table {
    display: flex;
    flex-direction: column;
    width: 18em;

    label {
      align-self: center;
    }
  }
`;

export function HomeScreen (props: {accessToken: string}) {
  const { accessToken } = props;

  const [text, setText] = useState<string>("");
  const [loadedData, setLoadedData] = useState<boolean>(false);
  const [showArtistDetails, setShowArtistDetails] = useState<boolean>(false);
  const [showTrackDetails, setShowTrackDetails] = useState<boolean>(false);
  
  const [artists, setArtists] = useState<any[]>([]);
  const [tracks, setTracks] = useState<any[]>([]);
  

  const searchByText = async () => {
    console.log("Text:", text);
    setShowArtistDetails(false);
    setShowTrackDetails(false);

    const [artistsRes, tracksRes] = await Promise.all([
      searchByTextQuery(accessToken, text, "artist"),
      searchByTextQuery(accessToken, text, "track")
    ]);    
    console.log({artistsRes, tracksRes});

    setArtists(artistsRes.artists.items);
    setTracks(tracksRes.tracks.items);
    setLoadedData(true);
  };

  const showOptions = () => {
    return showArtistDetails || showTrackDetails;
  }



  return  (<HomeScreenStyle>

        {!loadedData && <div>
          <AppLogo />
          <p>Begin searching for a song or arist</p>
        </div>}
        
        
        <SearchBar setText={setText} text={text} searchByText={searchByText}/>

        {loadedData && !showOptions() &&
          <TableContainer>
            <div id="artist-table">
              <label>Artists</label>
              {artists.map((e) => {
                  return (<button key={e.id} onClick={() => setShowArtistDetails((prev) => !prev)}>
                    {e.name}
                  </button>)
              })}
            </div>
            <div id="track-table">
              <label>Tracks</label>
              {tracks.map((e) => {
                  return (<button key={e.id} onClick={() => setShowTrackDetails((prev) => !prev)}>
                    {e.name}
                  </button>)
              })}
            </div>
          </TableContainer>}
    </HomeScreenStyle>)
}
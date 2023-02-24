/**
 * This is the Parent page for the application. Contains most of the logic that 
 *  is required for use in child pages since this is a Single Page Application (SPA)
 */
import { ReasonPhrases } from "http-status-codes";
import { useState } from "react";
import styled from "styled-components";
import { searchByTextQuery } from "../apiQueries";
import { ArtistDetails } from "./ArtistDetails";
import { AppLogo } from "./Logo";
import { SearchBar } from "./SearchBar";
import { TrackDetails } from "./TrackDetails";

/**
 * Base Page formating
 */
const HomeScreenStyle = styled.div`
    width: 100%;
    height: 100%;
    background-image: linear-gradient(black, gray);
    padding: 1rem;

    display: flex;
    flex-direction: column;
    align-items: center;
  
    .init-screen {
      display: contents;
    }
`;

/**
 * Format data returned from searching
 */
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


/**
 * Render the application - contains most of the logic so it can be passed to it's children
 * @param props: {accessToken: Authenitcation token used by Spotify API}
 * @returns 
 */
export function HomeScreen (props: {accessToken: string}) {
  const { accessToken } = props;

  const [text, setText] = useState<string>("");
  const [loadedData, setLoadedData] = useState<boolean>(false);
  const [status, setStatus] = useState<string>(ReasonPhrases.OK);


  // Hold various data points
  const [artists, setArtists] = useState<any[]>([]);
  const [tracks, setTracks] = useState<any[]>([]);
  const [selectedTrackOrArtist, setSelectedTrackOrArtist] = useState<any | undefined>(undefined);
  

  /**
   * Call API endpoint function here. Sends token, search string, and type (artist or track) to the request.
   */
  const searchByText = async () => {
    setSelectedTrackOrArtist(undefined);
    setStatus(ReasonPhrases.OK);


    // Wait for a response from both queties before continuing.
    Promise.all([
      searchByTextQuery(accessToken, text, "artist"),
      searchByTextQuery(accessToken, text, "track")
    ])
    .then(([artistsRes, tracksRes]) => {
      setArtists(artistsRes.artists.items);
      setTracks(tracksRes.tracks.items);
      setLoadedData(true);
    }).catch((err) => {
      setStatus(err.message);
    });
  };

  /**
   * Show list of Tracks or Artists to pick from 
   * @returns boolean
   */
  const showOptions = () => {
    return selectedTrackOrArtist;
  }

  /**
   * Save track or artist so that the details can be rendered
   * @param selection artist or track
   */
  const onSelectTrackOrArtist = (selection) => {
    setSelectedTrackOrArtist(selection);
  }

  return  (
    <HomeScreenStyle>
      {!loadedData && 
        <div className="init-screen">
          <AppLogo />
          <p>Begin searching for a track or artist (Enter 3 or more characters)</p>
        </div>
      }
      
      
      { accessToken === "error" ? (
        <div>
          Unable to generate Spotify Token. Please try again later
        </div>
        ) : ( 
          <SearchBar 
            setText={setText} 
            text={text} 
            searchByText={searchByText} 
            status={status}
          />
        )
      }

      { status === ReasonPhrases.UNAUTHORIZED  ? (
        <div>
          Invalid Spotify token. Please refresh page.
        </div>
      ) : status === "failed" ? (
        <div>
          Unable to fetch track or artist. Please search again.
        </div>
      ) : 
        selectedTrackOrArtist ? (
          selectedTrackOrArtist.type === "track" ? (
            <TrackDetails track={selectedTrackOrArtist} accessToken={accessToken}/>
          ) : selectedTrackOrArtist.type === "artist" ? (
            <ArtistDetails artist={selectedTrackOrArtist} accessToken={accessToken}/>
          ) : (
            <div>
              Something went wrong when selecting a track or artist. Please search again.
            </div>
          )
      ) :
      loadedData && !showOptions() &&
        <TableContainer>
          <div id="artist-table">
            <label>Artists</label>
            { artists.length > 0 ?
              (artists.map((artist) => {
                return (<button key={artist.id} onClick={() => onSelectTrackOrArtist(artist)}>
                  {artist.name}
                </button>)
            })
              ) : (
                <div>
                  No albums matching text
                </div>
              )
            }
          </div>
          <div id="track-table">
            <label>Tracks</label>
            { tracks.length > 0 ? 
              ( tracks.map((track) => {
                return (<button key={track.id} onClick={() => onSelectTrackOrArtist(track)}>
                  {track.name}
                </button>)
              })
              ) : (
                <div>
                  No tracks matching text
                </div>
              )
            }
          </div>
        </TableContainer>
      }
    </HomeScreenStyle>
  )
}
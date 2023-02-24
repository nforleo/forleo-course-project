/**
 * Render the artist information on page
 *  Include artist informmation, recent albums, and Top 5 songs
 */
import { useEffect, useState } from "react";
import { getArtistTopAlbums, getArtistTopTracks } from "../apiQueries";
import { DetailsStyle, ImageContainer } from "../common";
import { ReasonPhrases } from "http-status-codes";


/**
 * 
 * @param props {artist: object of artist information, accessToken: Spotify API access string}
 * @returns 
 */
export function ArtistDetails (props: {artist: any, accessToken: string}) {
    const { artist, accessToken } = props;

    const [tracks, setTracks] = useState<any>();
    const [albums, setAlbums] = useState<any>();
    const [status, setStatus] = useState<string | undefined>();

    useEffect(() => {
        // Wait for reponse from both queries
        Promise.all([
            getArtistTopTracks(accessToken, artist.id),
            getArtistTopAlbums(accessToken, artist.id)
        ]).then(([tracks, albums]) => {
            const fiveAlbums = getFiveAlbums(albums.items);

            // Save responses
            setTracks(tracks.tracks);
            setAlbums(fiveAlbums);
            setStatus(ReasonPhrases.OK);
        }).catch((err) => {
            setStatus(err.message);
        });

    }, [accessToken, artist]);

    /**
     * Get 5 of the most recent albums (normalize the name since albums are released multiple times for different regions/reason)
     * @param albums array of albums
     * @returns 
     */
    function getFiveAlbums (albums: any[]) {
        const albumsSet = new Set();
        
        // Get 5 unique albums (if there are 5 albums)
        let i = 0;
        while (albumsSet.size < 5 && albums[i]) {
            albumsSet.add(albums[i].name);
            i++;
        }

        // Convert to Array
        const albumArr = [];
        albumsSet.forEach((album) => {
            albumArr.push(album);
        });
        
        return albumArr;
    }

    return (
        <DetailsStyle>
            {status === ReasonPhrases.OK ? (
                <>
                    <ImageContainer>
                        <img src={artist.images[1]?.url} alt={`${artist.name} album cover`} width="300px" height="300px"/>
                    </ImageContainer>
                    <div>
                        <h2>
                            Artist Information
                        </h2>
                        <ul>
                            <li>
                                Artist: <b>{artist.name}</b>
                            </li>
                            <li>
                                Genres: <b>
                                    {artist.genres.map((g, i) => {
                                        // Return just genre name on last element
                                        if (i === artist.genres.length - 1) {
                                            return g;
                                        }
                                        // Add comma after each genre for formatting
                                        return `${g}, `
                                    })}
                                </b>
                            </li>
                            <li>
                                <b>{artist.followers.total}</b> followers
                            </li>
                            <li>
                                Popularity: <b>{artist.popularity} / 100</b>
                            </li>
                        </ul>
                        <h5>Recent albums</h5>
                        <ul>
                            {albums.map(album => {
                                return (
                                    <li key={album}>
                                        {album}
                                    </li>
                                )    
                            })
                            }
                        </ul>
                        <h5>Top 5 Songs</h5>
                        <ul>
                            {[0, 1, 2, 3, 4].map(i => {
                                if (tracks[i]) {
                                    return (
                                        <li key={tracks[i].id}>
                                            {tracks[i].name}
                                        </li>
                                    ) 
                                } 

                                return "";
                            })
                            }
                        </ul>
                    </div>
                </>
            ) : (
                <div>
                    Artist information not available, please choose another or refresh the page.
                </div>
            )}
        </DetailsStyle>
    );
}
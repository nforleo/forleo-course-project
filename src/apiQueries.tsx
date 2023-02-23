/**
 * This file holds all of the API requests.
 */

// In an ideal world, these would not be visible
const CLIENT_ID = '201cf375de154206b36313c9ac81b524';
const CLIENT_SECRET = 'a3ab60e16865423cbdcdc14a5f513295';

const baseUrl = "https://api.spotify.com/v1";
type RequestType =
    | "artist"
    | "track";

/**
 * Throw an error if we receive any reponse other than on OK
 * @param r reponse from any api
 */
const checkForErrors = (r) => {
    if (!r.ok) {
        throw new Error(r.statusText);
    }
}

/**
 * Get the authentication token from spotify for the application
 * @returns 
 */
export const getAccessToken = async () => {
    const r = await fetch('https://accounts.spotify.com/api/token', {
        method: "POST",
        headers: {
        "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "grant_type=client_credentials&client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET
    });

    checkForErrors(r);
    return r.json();
}

/**
 * Returns the Top 5 results matching the search string for either artists or tracks
 * @param accessToken 
 * @param searchStr 
 * @param type 
 * @returns 
 */
export const searchByTextQuery = async (accessToken: string, searchStr: string, type: RequestType) => {
    const r = await fetch(`${baseUrl}/search?q=${type}:${searchStr}&type=${type}&limit=5`, {
        method: "GET",
        headers: new Headers({
            "Content-Type": "application/json",
            "Authorization": "Bearer " + accessToken
        })
    });

    checkForErrors(r);
    return r.json();
}

export const getTrackAudioFeature = async (accessToken: string, id: string) => {
    const r = await fetch (`${baseUrl}/audio-features/${id}`, {
        method: "GET",
        headers: new Headers({
            "Content-Type": "application/json",
            "Authorization": "Bearer " + accessToken
        })
    });

    checkForErrors(r);
    return r.json();
}

export const getArtistTopTracks = async (accessToken: string, id: string) => {
    const r = await fetch (`${baseUrl}/artists/${id}/top-tracks?market=US`, {
        method: "GET",
        headers: new Headers({
            "Content-Type": "application/json",
            "Authorization": "Bearer " + accessToken
        })
    });

    checkForErrors(r);
    return r.json();
}

export const getArtistTopAlbums = async (accessToken: string, id: string) => {
    const r = await fetch(`${baseUrl}/artists/${id}/albums?market=US`, {
        method: "GET",
        headers: new Headers({
            "Content-Type": "application/json",
            "Authorization": "Bearer " + accessToken
        })
    });

    checkForErrors(r);
    return r.json();
}
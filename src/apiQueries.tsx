const baseUrl = "https://api.spotify.com/v1";

export const searchByTextQuery = async (accessToken: string, searchStr: string, type: "artist" | "track") => {
    const r = await fetch(`${baseUrl}/search?q=${type}:${searchStr}&type=${type}&limit=5`, {
        method: "GET",
        headers: new Headers({
            "Content-Type": "application/json",
            "Authorization": "Bearer " + accessToken
        })
    });

    return r.json();
}
import { useEffect, useState } from "react";
import { getTrackAudioFeature } from "../apiQueries";
import { DetailsStyle, ImageContainer } from "../common";
import { ReasonPhrases } from "http-status-codes";



export function TrackDetails (props: {track: any, accessToken: string}) {
    const { track, accessToken } = props;

    const [features, setFeatures] = useState<any>({});
    const [status, setStatus] = useState<string | undefined>();

    useEffect(()=> {
        getTrackAudioFeature(accessToken, track.id).then((features) => {
            console.log(features);
            setFeatures(features);
            setStatus(ReasonPhrases.OK);
        }).catch((err) => {
            setStatus(err.message);
        })
    }, [accessToken, track.id]);

    /**
     * Convert ms to minute and seconds
     * @param ms length of song in milliseconds
     * @returns 
     */
    function convertMStoS(ms: number) {
        const minutes = Math.trunc(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);

        return `${minutes}m ${seconds}s`;
    }
    
    return (
        <DetailsStyle>
            {status === ReasonPhrases.OK ? (<>
                <ImageContainer>
                    <img src={track.album.images[1].url} alt={`${track.name} album cover`} />
                    { track.explicit &&
                        <div className="explicit">
                            Contains explicit content.
                            <img src={process.env.PUBLIC_URL + '/img/Parental_Advisory_label.png'} alt="explicit" width="96px" height="64px"/>
                        </div>
                    }
                </ImageContainer>
                <div>
                    <h2>
                        Track Information
                    </h2>
                    <ul>
                        <li>
                            Track name: <b>{track.name}</b>
                        </li>
                        <li>
                            Performed by: <b>{
                                // Format artist names
                                track.artists.map((a, i) => {
                                    // More than 1 artist? 
                                    if (track.artists.length > 1) {
                                        // Add feat. after first artist
                                        if (i === 0) {
                                            return a.name + " feat. "
                                        }

                                        // If not the last artist, put a comma and space after the name
                                        if (i !== track.artists.length - 1) {
                                            return a.name + ", "
                                        }
                                    }

                                    // Return just the name if single or last artist
                                    return a.name;
                                })
                            }</b>
                        </li>
                        <li>
                            Appears on: <b>{track.album.name}</b>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            Duration: <b>{convertMStoS(track.duration_ms)}</b>
                        </li>
                        <li>
                            Track popularity: <b>{track.popularity} / 100</b>
                        </li>
                        <li>
                            This is track <b>#{track.track_number}</b> on the album
                        </li>
                        <li>
                            Tempo: <b>{features.tempo} BPM</b>
                        </li>
                        <li>
                            {/* Convert danceability to a percentage with a max percision of 4 sig figs */}
                            Danceability: <b>{parseFloat((features.danceability * 100).toPrecision(4))}%</b>
                        </li>
                        <li>
                            Average loudness: <b>{features.loudness} dB</b>
                        </li>
                    </ul>
                    <span>
                        Listen to the song on <b><a target="_blank" rel="noreferrer" href={track.external_urls.spotify}>Spotify</a></b>
                    </span>
                </div>
            </>
            ) : (
            <div>
                Error getting tracks feature, refresh page or restart application
            </div>
            )}
        </DetailsStyle>
    )
}
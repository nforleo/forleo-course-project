import { useEffect } from "react"
import { DetailsStyle, ImageContainer } from "../common";



export function TrackDetails (props: {track: any}) {
    const { track } = props;
    
    useEffect(() => {
        console.log("Selected Track:", track);

        console.log("Iamge link", track.album.images);
    }, []);
    
    return (
        <DetailsStyle>
            <ImageContainer>
                <img src={track.album.images[1].url} alt={`${track.name} album cover`} />
            </ImageContainer>
            <div>
                div 2
            </div>
        </DetailsStyle>
    );
}
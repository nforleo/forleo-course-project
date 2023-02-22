import { useEffect } from "react";
import styled from "styled-components";

export function ArtistDetails (props: {artist}) {
    const { artist } = props;

    useEffect(() => {
        console.log("Selected Artist:", artist);
    }, []);

    return <></>
}
import styled from "styled-components";

export const DetailsStyle = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding-left: 2rem;
    gap: 1em;
`;

export const ImageContainer = styled.div`
    width: min-content;

    .explicit {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`;
import styled from "styled-components";
import { Button, Form, InputGroup } from "react-bootstrap";
import { ChangeEventHandler, useCallback } from "react";
import { ReasonPhrases } from "http-status-codes/build/cjs/reason-phrases";

/**
 * Format the Search bar
 */
const SearchBarStyle = styled.div`
  width: 24em;
  padding: 1em;
`;

/**
 * Render Serach bar and handle logic that only affects search bar
 * @param props {
 *  text: value to search with
 *  setText: function to set text
 *  searchByText: function to handle actual search functionality
 *  status: make
 * }
 * @returns 
 */
export function SearchBar (props: {text: string, setText: (a: string) => void, searchByText: () => void, status: string}) {
  const { text, setText, searchByText, status } = props;

  /**
   * Disable the search button if there aren't less than 3 characters (to increase probability of relevant results from API)
   * or if the response from the API is UNAUTHORIZED (need a new access token)
   * @returns boolean
   */
  const disableSearchButton = () => {
    return text.length < 3 || status === ReasonPhrases.UNAUTHORIZED;
  }

  /**
   * Update display value of search box
   */
  const onChange = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    const str = e.target.value; 
    setText(str);
  }, [setText]);

  return (
      <SearchBarStyle>
        <InputGroup>
          <Form.Control onChange={onChange} value={text}/>
          <Button variant="success" onClick={() => searchByText()} disabled={disableSearchButton()}>Search</Button>
        </InputGroup>
      </SearchBarStyle>
  )
}
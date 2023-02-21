import styled from "styled-components";
import { Button, Form, InputGroup } from "react-bootstrap";
import { ChangeEventHandler, useCallback } from "react";

const SearchBarStyle = styled.div`
  width: 24em;
  padding: 1em;
`;

export function SearchBar (props: {text: string, setText: (a: string) => void, searchByText: () => void}) {
  const { text, setText, searchByText } = props;

  const onChange = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    setText(e.target.value);
  }, [setText]);

  return (
      <SearchBarStyle>
        <InputGroup>
          <Form.Control onChange={onChange} value={text}/>
          <Button variant="success" onClick={() => searchByText()} disabled={text.length < 3}>Search</Button>
        </InputGroup>
      </SearchBarStyle>
  )
}
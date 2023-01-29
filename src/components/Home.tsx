import { ChangeEventHandler, useCallback, useState } from "react";
import { Dropdown, Form } from "react-bootstrap";
import styled from "styled-components";
import { AppLogo } from "./Logo";

const HomeScreenStyle = styled.div`
    width: 100%;
    height: 100%;
    background-image: linear-gradient(black, gray);


      display: flex;
      flex-direction: column;
      align-items: center;
    
  
`;

export function HomeScreen () {
  const [text, setText] = useState<string>("");

  const onChange = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    setText(e.target.value);
  }, []);

  return  (<HomeScreenStyle>
        <AppLogo />
        <p>Begin searching for a song or arist</p>
        <Dropdown>
          <Dropdown.Toggle 
            as={Form.Control}
            onChange={onChange}
            value={text}
          />
          {text.length < 3 ? null : (<Dropdown.Menu>
            <Dropdown.Header>Songs</Dropdown.Header>
            <Dropdown.Item>
              Song 1
            </Dropdown.Item>
            <Dropdown.Item>
              Song 2
            </Dropdown.Item>
            <Dropdown.Item>
              Song 3
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Header>Artists</Dropdown.Header>
            <Dropdown.Item>
              Artist 1
            </Dropdown.Item>
            <Dropdown.Item>
              Artist 2
            </Dropdown.Item>
            <Dropdown.Item>
              Artist 3
            </Dropdown.Item>
          </Dropdown.Menu>) }
        </Dropdown>
    </HomeScreenStyle>)
}
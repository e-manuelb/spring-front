import React from "react";
import { Container, Navbar, Stack } from "react-bootstrap";
import logoMV from "../../../assets/logoMV.png";
import { useHistory } from "react-router";

export function Dashboard(props) {
  const history = useHistory();
  const navigation = (url) => {
    history.push(url);
  };

  return (
    <Container sx={{ display: "flex" }}>
      <Stack gap={2}>
        <div>
          <Navbar
            collapseOnSelect
            fixed="top"
            expand="lg"
            bg="dark"
            variant="dark"
          >
            <Container>
              <Navbar.Brand className="text-center" href="/home">
                <img src={logoMV} className="mb-2" width="80"></img>
              </Navbar.Brand>
            </Container>
          </Navbar>
        </div>
        <div style={{ marginTop: "100px" }}> {props.children}</div>
      </Stack>
    </Container>
  );
}

import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { Navbar, InputGroup, FormControl, Button } from 'react-bootstrap';
import { Search, Upload } from 'react-bootstrap-icons';
import Filter from './Filter';
import Uploadbtn from './Upload';
import './Home.css';

export default function Header(props) {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container fluid>
          <Col lg={3}>
            <Navbar.Brand
              className="navbar-brand"
              style={{
                fontSize: '24px',
                fontWeight: 'bold',
                marginLeft: '50px',
              }}
            >
              <span style={{ color: 'red' }}>X</span> Flix
            </Navbar.Brand>
          </Col>
          <Col lg={6}>
            <InputGroup bg="dark">
              <FormControl
                placeholder="Search"
                aria-label="Search"
                aria-describedby="basic-addon2"
                className="SearchBar"
              />
              <Button variant="outline-secondary" id="button-addon2" bg="light">
                <Search color="lightgray" />
              </Button>
            </InputGroup>
          </Col>
          <Col lg={3}>{/* Upload Video Button */ <Uploadbtn />}</Col>
        </Container>
      </Navbar>
      <Filter filters={filter => props.Filters(filter)} />
    </>
  );
}

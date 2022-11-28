import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { Search, Upload } from 'react-bootstrap-icons';
import './Home.css';

var filter = ['ReleaseDate'];

export default function Filter(props) {
  const [sorts, setSort] = React.useState('ReleaseDate');

  const handleChange = event => {
    setSort(event.target.value);
    let sort = event.target.value;
    if (sort == 'ReleaseDate' && !filter.includes('ReleaseDate')) {
      if (filter.includes('ViewCount')) {
        filter.splice(filter.indexOf('ViewCount'), 1);
      }
      filter.push('ReleaseDate');
    } else if (sort == 'ViewCount' && !filter.includes('ViewCount')) {
      if (filter.includes('ReleaseDate')) {
        filter.splice(filter.indexOf('ReleaseDate'), 1);
      }
      filter.push('ViewCount');
    }

    props.filters(filter);
  };

  const clickHandler = event => {
    let newFilter = event.currentTarget.value;
    if (!filter.includes(newFilter)) {
      filter.push(newFilter);
    } else {
      filter.splice(filter.indexOf(newFilter), 1);
    }

    props.filters(filter);
  };

  return (
    <>
      <Container fluid className="filter-container" variant="dark">
        <Row>
          <Col lg={3}></Col>
          <Col lg={5} className="filter-btn">
            <Button onClick={clickHandler} value="All Genre">
              All Gener
            </Button>
            <Button onClick={clickHandler} value="Education">
              Education
            </Button>
            <Button onClick={clickHandler} value="Sports">
              Sport
            </Button>
            <Button onClick={clickHandler} value="Comedy">
              Comedy
            </Button>
            <Button onClick={clickHandler} value="Lifestyle">
              Lifestyle
            </Button>
            <Button onClick={clickHandler} value="Any Age">
              Any age group
            </Button>
            <Button onClick={clickHandler} value="7+">
              7+
            </Button>
            <Button onClick={clickHandler} value="12+">
              12+
            </Button>
            <Button onClick={clickHandler} value="16+">
              16+
            </Button>
            <Button onClick={clickHandler} value="18+">
              18+
            </Button>
          </Col>
          <Col lg={2}>
            <Form.Select
              aria-label="Default select example"
              className="release-btn"
              value={sorts}
              onChange={handleChange}
            >
              <option value="ReleaseDate">Release Date</option>
              <option value="ViewCount">View Count</option>
            </Form.Select>
          </Col>
          <Col lg={2}></Col>
        </Row>
      </Container>
    </>
  );
}

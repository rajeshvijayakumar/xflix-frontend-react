import React from 'react';
import { Card } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';

export default function VideoContainer(props) {
  //   const videoLink = `/video/${props.video._id}`;
  const videoLink = `/video/${props.video._id}`;
  return (
    <>
      <Link to={videoLink}>
        <Card className="CardHead" style={{ width: '17rem' }}>
          <Card.Img variant="top" src={props.video.previewImage} />
          <Card.Body className="card-body">
            <Card.Title className="cardtitle" style={{ float: 'left' }}>
              {props.video.title}
            </Card.Title>
            <Card.Text style={{ float: 'left' }}>
              {props.video.releaseDate}
            </Card.Text>
          </Card.Body>
        </Card>
      </Link>
    </>
  );
}

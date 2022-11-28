import React from 'react';
import { Fragment } from 'react';
import { Button, Modal, FloatingLabel } from 'react-bootstrap';
import { Upload } from 'react-bootstrap-icons';
import Form from 'react-bootstrap/Form';
import { useForm, Controller } from 'react-hook-form';
import { config } from '../App';
import './Home.css';

async function performAPICall(data, releaseDate) {
  let errored = false;
  let datas = {};
  console.log('This is Data' + data);
  try {
    let response = await fetch(`${config.endpoint}/videos`, {
      method: 'POST',
      body: JSON.stringify({
        videoLink: data.videoLink,
        title: data.title,
        genre: data.genre,
        contentRating: data.contentRating,
        releaseDate: releaseDate,
        previewImage: data.previewImage,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    datas = await response.json();
    // console.log(datas);
  } catch (e) {
    errored = true;
  }
}

const FormUpload = () => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const onSubmit = data => {
    handleClose();
  };

  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        variant="Outline-primary"
        id="button-addon2"
        className="upload-btn"
        onClick={handleShow}
      >
        <Upload className="upload-icon" />
        Upload
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={onSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Upload Video</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Input Field Here */}
            <FloatingLabel
              controlId="floatingInput"
              label="Video Link"
              className="mb-3"
              required={' Video link required'}
            >
              <Form.Control
                name="videoLink"
                type="text"
                placeholder="Video Link"
              />
              <Form.Text id="passwordHelpBlock" muted>
                This Link will used to derive the video
              </Form.Text>
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingInput"
              label="Thumbline Image Link"
              required={' Thumbline image Link required'}
            >
              <Form.Control
                name="previewImage"
                type="text"
                placeholder="Thumbline Image Link"
              />
              <Form.Text id="passwordHelpBlock" muted>
                This link will be used to preview the thumbnails image
              </Form.Text>
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingInput"
              label="Title"
              name="title"
              required={' Titlerequired'}
            >
              <Form.Control type="text" placeholder="Title" />
              <Form.Text id="passwordHelpBlock" muted>
                The title will be the representative text for the video
              </Form.Text>
            </FloatingLabel>
            <Form.Select
              className="me-sm-2"
              name="genre"
              id="inlineFormCustomSelect"
            >
              <option value="Education">EducationEducation</option>
              <option value="Sports">SportsSports</option>
              <option value="Comedy">ComedyComedy</option>
              <option value="Lifestyle">LifestyleLifestyle</option>
            </Form.Select>
            <Form.Text id="passwordHelpBlock" muted>
              Genre will help in categorizing your videos
            </Form.Text>

            <Form.Select
              className="me-sm-2"
              id="inlineFormCustomSelect"
              required={'required'}
              name="contentRating"
            >
              <option value="0" disabled>
                Suitable Age group for this clip
              </option>
              <option value="7+">7+</option>
              <option value="12+">12+</option>
              <option value="16+">16+</option>
              <option value="18+">18+</option>
            </Form.Select>
            <Form.Text id="passwordHelpBlock" muted>
              This will be used to filter videos on age group suitability
            </Form.Text>
            <FloatingLabel
              controlId="floatingInput"
              label="Upload and Publish Date"
              required={'Date field is required'}
            >
              <Form.Control
                type="date"
                name="releaseDate"
                placeholder="Release Date"
              />
              <Form.Text id="passwordHelpBlock" muted>
                This will be used to sort videos
              </Form.Text>
            </FloatingLabel>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" type="submit">
              UPLOAD VIDEO
            </Button>
            <Button variant="primary" onClick={handleClose}>
              CANCEL
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default FormUpload;

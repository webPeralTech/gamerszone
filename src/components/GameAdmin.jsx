import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import { BackendUrl } from '../utils/ApiEnd';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const GameAdmin = () => {
  const [games, setGames] = useState([]);
  const [newGame, setNewGame] = useState({
    title: '',
    image: '',
    descriptions: '', // Initialize with one empty description
    link: '',
  });
  const [errors, setErrors] = useState({});

  // useEffect(() => {
  //   axios.get('/api/games')
  //     .then(response => setGames(response.data))
  //     .catch(error => console.error(error));
  // }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!newGame.title) newErrors.title = 'Title is required';
    if (!newGame.image) newErrors.image = 'Image URL is required';
    if (!newGame.link) newErrors.link = 'Game Link is required';
    // newGame.descriptions.forEach((desc, index) => {
    //   if (!desc) newErrors[`description${index}`] = 'Description cannot be empty';
    // });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const formData = new FormData();

      // Append each field to the FormData object
      formData.append('title', newGame?.title);
      formData.append('image', newGame?.image); // Assuming `newGame.image` is a file
      formData.append('descriptions', newGame?.descriptions);
      formData.append('link', newGame?.link);
      axios.post(`${BackendUrl}/api/games`, formData)
        .then(response => {
          setGames([...games, response.data]);
          toast.success('Game added successfully');
          setNewGame({ title: '', image: '', descriptions: '', link: '' }); // Reset form
          setErrors({});
        })
        .catch(error => {
          toast.error('Failed to add game');
          console.error(error);
        });
    } else {
      toast.error('Please fill out all required fields');
    }
  };

  return (
    <div className="bgContent">
      <div className="main-container">
        <div className="row m-0 g-1">
          <h2 className='text-center text-white mt-3'>Game Admin</h2>
          <div className="row">
            <div className='d-flex justify-content-center'>
              <div className="col-md-6">
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="title" className="text-white">Title</Form.Label>
                    <Form.Control
                      type="text"
                      id="title"
                      placeholder="Title"
                      onChange={(e) => setNewGame({ ...newGame, title: e.target.value })}
                      value={newGame.title}
                      isInvalid={!!errors.title}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.title}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="image" className="text-white">Image URL</Form.Label>
                    <Form.Control
                      type="file"
                      id="image"
                      placeholder="Image URL"
                      onChange={(e) => setNewGame({ ...newGame, image: e.target.files[0] })}
                      // value={newGame.image}
                      isInvalid={!!errors.image}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.image}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* Dynamic description fields */}
                  {/* {newGame.descriptions.map((description, index) => (
                    <Form.Group key={index} className="mb-3 d-flex">
                      <Form.Control
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => handleDescriptionChange(index, e.target.value)}
                        isInvalid={!!errors[`description${index}`]}
                        className="me-2"
                      />
                      {newGame.descriptions.length > 1 && (
                        <Button
                          type="button"
                          variant="danger"
                          onClick={() => removeDescriptionField(index)}
                        >
                          Remove
                        </Button>
                      )}
                      <Form.Control.Feedback type="invalid">
                        {errors[`description${index}`]}
                      </Form.Control.Feedback>
                    </Form.Group>
                  ))}
                  
                  <Button
                    type="button"
                    variant="secondary"
                    className="mb-3"
                    onClick={addDescriptionField}
                  >
                    Add Description
                  </Button> */}

                  <Form.Group className="mb-3">
                    <label className="text-white">Description of game</label>
                    <CKEditor
                      editor={ClassicEditor}
                      data={newGame?.descriptions}
                      // config={{
                      //   ckfinder: {
                      //     uploadUrl: "", //Enter your upload url
                      //   },
                      // }}

                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setNewGame({ ...newGame, descriptions: data })
                      }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="link" className="text-white">Game Link</Form.Label>
                    <Form.Control
                      type="text"
                      id="link"
                      placeholder="Game Link"
                      onChange={(e) => setNewGame({ ...newGame, link: e.target.value })}
                      value={newGame.link}
                      isInvalid={!!errors.link}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.link}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Button type="submit" variant="primary">Add Game</Button>
                </Form>
                <Toaster
                  position="top-center"
                  containerStyle={{
                    top: 20,
                    left: 20,
                    bottom: 80,
                    right: 20,
                  }} // Change this position to suit your needs
                  reverseOrder={false} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameAdmin;

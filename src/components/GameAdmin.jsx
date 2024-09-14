import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Toast, Spinner } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import { BackendUrl } from '../utils/ApiEnd';
import GameModel from './GameModal';

const GameAdmin = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [currentGameId, setCurrentGameId] = useState(null);
  const [games, setGames] = useState([]);
  const [newGame, setNewGame] = useState({
    title: '',
    image: '',
    descriptions: '',
    link: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // Loading state

  // Fetch all games
  useEffect(() => {
    setLoading(true); // Show loader when fetching data
    axios.get(`${BackendUrl}/api/games`)
      .then(response => {
        setGames(response.data);
        setLoading(false); // Hide loader once data is fetched
      })
      .catch(error => {
        console.error(error);
        setLoading(false); // Hide loader if error occurs
      });
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!newGame.title) newErrors.title = 'Title is required';
    if (!newGame.image) newErrors.image = 'Image URL is required';
    if (!newGame.link) newErrors.link = 'Game Link is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      const formData = new FormData();

      // Append each field to the FormData object
      formData.append('title', newGame?.title);
      formData.append('image', newGame?.image); // Assuming `newGame.image` is a file
      formData.append('descriptions', newGame?.descriptions);
      formData.append('link', newGame?.link);
      // axios.post(`${BackendUrl}/api/games`, formData)
      //   .then(response => {
      //     setGames([...games, response.data]);
      //     toast.success('Game added successfully');
      //     setNewGame({ title: '', image: '', descriptions: '', link: '' }); // Reset form
      //     setErrors({});
      //   })
      //   .catch(error => {
      //     toast.error('Failed to add game');
      //     console.error(error);
      //   });
      const apiCall = isEdit
        ? axios.put(`${BackendUrl}/api/games/${currentGameId}`, formData)
        : axios.post(`${BackendUrl}/api/games`, formData);

      apiCall
        .then(response => {
          if (isEdit) {
            setGames(games?.map(game => game._id === currentGameId ? response.data : game));
            toast.success('Game updated successfully');
            var gameModel = document.getElementById('model_close');
            gameModel.click()
            setLoading(false);
          } else {
            setGames([...games, response.data]);
            toast.success('Game added successfully');
            var gameModel = document.getElementById('model_close');
            gameModel.click()
            setLoading(false);
          }
          // resetForm();
        })
        .catch(error => {
          toast.error('Failed to submit the form');
          setLoading(false);
          console.error(error);
        });
    } else {
      toast.error('Please fill out all required fields');
    }
  };

  const handleEdit = (game) => {
    setNewGame({
      title: game?.title,
      image: game?.image,
      descriptions: game?.descriptions,
      link: game?.link
    });
    setCurrentGameId(game._id);
    setIsEdit(true);
    var gameModel = document.getElementById('model_close');
    gameModel.click()
  }

  return (
    <>
      <div className="bgContent">
        <div className="main-container">
          <div className="row m-0 g-1">
            <h2 className='text-center text-white mt-3'>Game Admin</h2>
            <div className="row">
              <div className='d-flex justify-content-end'>
                <button className='btn btn-sm btn-success mb-3' onClick={() => {
                  var gameModel = document.getElementById('model_close');
                  gameModel.click()
                }}>Add Game</button>
              </div>
              {/* <div className='d-flex justify-content-center'>
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

                  <Form.Group className="mb-3">
                    <label className="text-white">Description of game</label>
                    <CKEditor
                      editor={ClassicEditor}
                      data={newGame?.descriptions}
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
                  }}
                  reverseOrder={false} />
              </div>
            </div> */}
              {loading ? (
                <div className="d-flex justify-content-center">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
              ) : (
                <table class="table">
                  <thead class="thead-dark">
                    <tr>
                      <th>#</th>
                      <th>Image</th>
                      <th>Title</th>
                      <th className='w-25'>Link</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {games?.map((game, index) => (
                      <tr key={game._id}>
                        <td>{index + 1}</td>
                        <td><img src={`${game.image}`} width={50} height={50} alt="" className='rounded' /></td>
                        <td>{game.title}</td>
                        <td className="text-truncate" style={{ maxWidth: '150px' }}><a href={game.link} target="_blank" rel="noopener noreferrer">{game.link}</a></td>
                        <td>
                          <div className='d-flex justify-content-evenly'>
                            <button variant="warning" onClick={() => handleEdit(game)}>Edit</button>
                            {/* <Button variant="danger" onClick={() => handleDelete(game._id)}>Delete</Button> */}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>)}
            </div>
          </div>
        </div>
      </div>
      <button className='d-none' id="model_close" data-bs-toggle="modal" data-bs-target="#exampleModal"></button>
      <GameModel isEdit={isEdit}
        newGame={newGame}
        setNewGame={setNewGame}
        handleSubmit={handleSubmit}
        loading={loading}
        errors={errors} />
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#333',
            color: '#fff',
          },
        }}
      />
    </>
  );
};

export default GameAdmin;

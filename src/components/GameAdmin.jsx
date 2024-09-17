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
    slug: '',
    image: '',
    descriptions: '',
    link: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // Loading state

  const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentication state
  const [loginCredentials, setLoginCredentials] = useState({
    email: '',
    password: ''
  });

  // Fetch all games
  useEffect(() => {
    if (isAuthenticated) {
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
    }
  }, [isAuthenticated]);

  const validateForm = () => {
    const newErrors = {};
    if (!newGame.title) newErrors.title = 'Title is required';
    if (!newGame.slug) newErrors.slug = 'Slug is required';
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
      formData.append('slug', newGame?.slug);
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
      slug: game?.slug,
      image: game?.image,
      descriptions: game?.descriptions,
      link: game?.link
    });
    setCurrentGameId(game._id);
    setIsEdit(true);
    var gameModel = document.getElementById('model_close');
    gameModel.click()
  }

  const handleLogin = (e) => {
    e.preventDefault();
    axios.post(`${BackendUrl}/api/login`, loginCredentials).then((res) => {
      if (res.status === 200) {
        setIsAuthenticated(true);
        toast.success('Login successful');
      } else {
        toast.error('Invalid email or password');
      }
    })
  };

  if (!isAuthenticated) {
    // Show login form if not authenticated
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="login-form" style={{ width: "50%", margin: "auto" }}>
          <h3>Admin Login</h3>
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(e) => setLoginCredentials({ ...loginCredentials, email: e.target.value })}
                value={loginCredentials.email}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setLoginCredentials({ ...loginCredentials, password: e.target.value })}
                value={loginCredentials.password}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="bgContent">
        <div className="main-container">
          <div className="row m-0 g-1 mt-5">
            <h2 className='text-center text-white mt-3'>Game Admin</h2>
            <div className="row">
              <div className='d-flex justify-content-end'>
                <button className='btn btn-sm btn-success mb-3' onClick={() => {
                  var gameModel = document.getElementById('model_close');
                  gameModel.click()
                }}>Add Game</button>
              </div>
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
                      <th>Slug</th>
                      <th className='w-25'>Link</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {games?.map((game, index) => (
                      <tr key={game?._id}>
                        <td>{index + 1}</td>
                        <td><img src={`${game?.image}`} width={50} height={50} alt="" className='rounded' /></td>
                        <td>{game?.title}</td>
                        <td>{game?.slug}</td>
                        <td className="text-truncate" style={{ maxWidth: '150px' }}><a href={game?.link} target="_blank" rel="noopener noreferrer">{game?.link}</a></td>
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

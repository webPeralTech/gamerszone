import { Button, Form, Spinner } from "react-bootstrap";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { debounce } from 'lodash';
import { useEffect, useState } from "react";

const GameModel = ({ isEdit, newGame, setNewGame, handleSubmit, errors, loading }) => {
    console.log("newGame", newGame)
    const [imagePreview, setImagePreview] = useState('');
    useEffect(() => {
        if (newGame.image) {
            if (typeof newGame.image === 'string') {
                setImagePreview(newGame.image); // Assuming it's a URL
            } else {
                setImagePreview(URL.createObjectURL(newGame.image));
            }
        }
    }, [newGame.image]);

    const modelClose = () => {
        setNewGame({
            title: '',
            image: '',
            descriptions: '',
            link: '',
        })
        var gameModel = document.getElementById('model_close');
        gameModel.click();
    }

    const debouncedSetNewGame = debounce((data) => {
        setNewGame(prev => ({ ...prev, descriptions: data }));
    }, 300);
    return (
        <>
            <div class="modal fade"
                data-bs-backdrop="static"
                aria-hidden='true'
                data-bs-keyboard="false" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
                <div className="modal-dialog modal-dialog-centered mw-1000px" role="document" style={{ maxWidth: '850px' }}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                {isEdit ? 'Edit Game' : 'Add Game'}
                            </h5>
                            <button type="button" className="d-none close" data-dismiss="modal" aria-label="Close" id="model_close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {loading ? (
                                <div className="d-flex justify-content-center">
                                    <Spinner animation="border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </Spinner>
                                </div>
                            ) : (
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3">
                                        <Form.Label htmlFor="title" className="text-dark">Title</Form.Label>
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
                                        <Form.Label htmlFor="image" className="text-dark">Image URL</Form.Label>
                                        <Form.Control
                                            type="file"
                                            id="image"
                                            onChange={(e) => setNewGame({ ...newGame, image: e.target.files[0] })}
                                            isInvalid={!!errors.image}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.image}
                                        </Form.Control.Feedback>
                                        {imagePreview && (
                                            <div className="mt-3">
                                                <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                                            </div>
                                        )}
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <label className="text-dark">Description</label>
                                        <CKEditor
                                            editor={ClassicEditor}
                                            data={newGame?.descriptions || ''}
                                            // onChange={(event, editor) => {
                                            //     const data = editor.getData();
                                            //     if (data !== newGame.descriptions) {
                                            //         setNewGame({ ...newGame, descriptions: data });
                                            //     }
                                            // }}
                                            onChange={(event, editor) => {
                                                const data = editor.getData();
                                                debouncedSetNewGame(data);
                                            }}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label htmlFor="link" className="text-dark">Game Link</Form.Label>
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

                                    <div className="modal-footer">
                                        <Button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={modelClose}>Close</Button>
                                        <Button disabled={loading} type="submit" className="btn btn-primary">
                                            {isEdit ? 'Save Changes' : 'Add Game'}
                                        </Button>
                                    </div>
                                </Form>)}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GameModel
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import PostSocket from '../sockets/PostSocket';

function NewPost({ activo, setActivo }) {

    const { socket, data } = PostSocket();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    useEffect(() => {
        if (data) {
            console.log('Mensaje recibido: ' + data);
        }
    }, [data]);

    const onSubmit = data => {
        if (socket) {
            socket.send(JSON.stringify({
                'data_type': 'post',
                'likes': 0,
                'post': data.post
            }));
            reset();
        }
    };

    return (
        <>
            {activo &&
                <div className="form-container">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h2>Nueva publicación</h2>
                        <div>
                            {errors.username && <span className="error-message">Este campo es requerido.</span>}
                            <textarea
                                placeholder='¿En qué estás pensando?' type="text" name="post" {...register('post', { required: true })}
                            />
                        </div>
                        <br />
                        <button type="submit" className="submit-button">Compartir</button>
                        <button onClick={() => setActivo(false)} type="button" className="submit-button">Cancelar</button>
                    </form>
                </div>
            }
        </>
    );
}

export default NewPost;

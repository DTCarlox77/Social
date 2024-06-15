import { useForm } from 'react-hook-form';
import Navbar from '../components/Navbar';
import { networkRegister } from '../api/network';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [created, setCreated] = useState(false);

    const [error, setError] = useState(false);
    const [errorDetail, setErrorDetail] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Registro de usuarios';
        const auth_token = localStorage.getItem('auth_token');
        if (auth_token) {
            navigate('/posts');
        }
    }, [navigate]);

    const onSubmit = async data => {
        try {
            const response = await networkRegister(data);
            if (response.status === 201) {
                setError(false);
                setCreated(true);
                setErrorDetail('');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            setError(true);
            setCreated(false);
            if (error.response && error.response.data) {
                console.log('Datos del error:', error.response.data);
                const errorData = error.response.data;

                // Verificar si hay un mensaje de error general.
                if (errorData.error) {
                    setErrorDetail(errorData.error);
                } else {
                    // Recopilar todos los mensajes de error de los campos individuales.
                    const fieldErrors = [];
                    for (const field in errorData) {
                        if (Array.isArray(errorData[field])) {
                            fieldErrors.push(...errorData[field]);
                        } else if (typeof errorData[field] === 'string') {
                            fieldErrors.push(errorData[field]);
                        }
                    }
                    // Asignar los mensajes de error detallados si existen, de lo contrario un error desconocido.
                    if (fieldErrors.length > 0) {
                        setErrorDetail(fieldErrors.join(' '));
                    } else {
                        setErrorDetail('Error desconocido');
                    }
                }
            } else {
                console.log('Datos del error:', Object.values(error.response.data));
                setErrorDetail('Error en la comunicación con el servidor');
            }
        }
    };

    return (
        <div>
            <Navbar />
            <div className='login-container'>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <h2>Crear cuenta</h2>
                    {created &&
                        <div>
                            <h2 style={{ color: 'green' }}>Cuenta creada exitosamente :D</h2>
                        </div>
                    }
                    {error &&
                        <div>
                            <h2 style={{ color: 'red' }}>{errorDetail}</h2>
                        </div>
                    }

                    <div>
                        <h3>Nombre de usuario</h3>
                        {errors.username && <span>Este campo es requerido.</span>}
                        <input placeholder='Ingresa tu nombre de usuario' type="text" name="username" {...register('username', { required: true })} />
                    </div>

                    <div>
                        <h3>Correo</h3>
                        {errors.username && <span>Este campo es requerido.</span>}
                        <input placeholder='Ingresa tu correo' type="email" name="email" {...register('email', { required: true })} />
                    </div>

                    <div>
                        <h3>Contraseña</h3>
                        {errors.password && <span>Este campo es requerido.</span>}
                        <input placeholder='Ingresa tu contraseña' type="password" name="password" {...register('password', { required: true })} />
                    </div>
                    <br />
                    <button type="submit">Registrarme</button>
                </form>
            </div>
        </div>
    );
}

export default Register;

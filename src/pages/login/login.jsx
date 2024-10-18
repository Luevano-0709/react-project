import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();

    // Estados para los campos del formulario
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    // Función para manejar la validación
    const validateForm = () => {
        const newErrors = {};

        if (!email) {
            newErrors.email = 'El correo es requerido';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'El correo no es válido';
        }

        if (!password) {
            newErrors.password = 'La contraseña es requerida';
        } else if (password.length < 6) {
            newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Función para manejar el login
    const handleLogin = (e) => {
        e.preventDefault();

        if (validateForm()) {
            // Aquí puedes manejar el login (llamada a la API, etc.)
            console.log('Formulario de login enviado:', { email, password });
            navigate('/dashboard'); // Redirigir después del login exitoso
        }
    };

    return (
        <div className="login-page">
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Correo:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <p className="error">{errors.email}</p>}
                </div>

                <div>
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && <p className="error">{errors.password}</p>}
                </div>

                <button type="submit" disabled={!email || !password}>
                    Iniciar Sesión
                </button>
            </form>
        </div>
    );
};

// Exportación por defecto
export default LoginPage;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './register.css'; // Archivo CSS que contiene los estilos

const RegisterPage = () => {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        if (!name) newErrors.name = 'El nombre es requerido';
        if (!email) {
            newErrors.email = 'El correo es requerido';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'El correo no es válido';
        }

        if (!role) newErrors.role = 'El rol es requerido';
        if (!password) {
            newErrors.password = 'La contraseña es requerida';
        } else if (password.length < 6) {
            newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRegister = (e) => {
        e.preventDefault();

        if (validateForm()) {
            console.log('Formulario enviado:', { name, email, role, password });
            navigate('/dashboard');
        }
    };

    return (
        <div className="register-page">
            <div className="register-container">
                <h2>Registro</h2>
                <form onSubmit={handleRegister}>
                    <div className="form-group">
                        <label>Nombre:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={errors.name ? 'input-error' : ''}
                        />
                        {errors.name && <p className="error-message">{errors.name}</p>}
                    </div>

                    <div className="form-group">
                        <label>Correo:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={errors.email ? 'input-error' : ''}
                        />
                        {errors.email && <p className="error-message">{errors.email}</p>}
                    </div>

                    <div className="form-group">
                        <label>Rol:</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className={errors.role ? 'input-error' : ''}
                        >
                            <option value="">Selecciona un rol</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                        {errors.role && <p className="error-message">{errors.role}</p>}
                    </div>

                    <div className="form-group">
                        <label>Contraseña:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={errors.password ? 'input-error' : ''}
                        />
                        {errors.password && <p className="error-message">{errors.password}</p>}
                    </div>

                    <button type="submit" disabled={!name || !email || !role || !password}>
                        Registrar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;

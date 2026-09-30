import { useState, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const recaptchaRef = useRef(null);

    const registrarUsuarioPrueba = async () => {
        try {
            await axios.post('https://api-mascotas-0yvf.onrender.com/api/auth/registrar', {
                email: 'admin@mascotas.com',
                password: 'secreta123',
                fuerzaPassword: 'fuerte'
            });
            alert('✅ Usuario "admin@mascotas.com" creado con clave "secreta123".');
        } catch (err) {
            alert('⚠️ El usuario ya existe o hubo un problema de conexión.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Por favor, completa todos los campos.');
            return;
        }

        const captchaValue = recaptchaRef.current.getValue();
        if (!captchaValue) {
            setError('Por favor, marca la casilla de "No soy un robot".');
            return;
        }

        try {
            const respuesta = await axios.post('https://api-mascotas-0yvf.onrender.com/api/auth/login', {
                email,
                password
            });
            
            // Si es exitoso, guardamos el token y vamos directo a Mascotas
            localStorage.setItem('token', respuesta.data.token);
            navigate('/mascotas');

        } catch (err) {
            setError(err.response?.data?.mensaje || 'Error al conectar con el servidor');
            if (recaptchaRef.current) recaptchaRef.current.reset();
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #444', borderRadius: '8px', backgroundColor: '#222', color: 'white' }}>
            <h2 style={{ textAlign: 'center' }}>Iniciar Sesión</h2>
            
            {error && <p style={{ color: '#ff6b6b', textAlign: 'center', fontWeight: 'bold' }}>{error}</p>}
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                    <label>Email:</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '4px', border: 'none' }}
                        placeholder="admin@mascotas.com"
                    />
                </div>
                
                <div>
                    <label>Contraseña:</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '4px', border: 'none' }}
                        placeholder="********"
                    />
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                    <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" 
                    />
                </div>

                <button type="submit" style={{ padding: '12px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', marginTop: '10px' }}>
                    Ingresar
                </button>
            </form>

            <hr style={{ borderColor: '#444', margin: '20px 0' }} />
            
            <button onClick={registrarUsuarioPrueba} type="button" style={{ width: '100%', padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                🔧 Crear Usuario de Prueba
            </button>
        </div>
    );
};

export default Login;
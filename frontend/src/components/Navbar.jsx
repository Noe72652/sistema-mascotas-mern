import { Link, useNavigate } from 'react-router-dom';
import { FaPaw, FaChartBar, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
    const navigate = useNavigate();

    const cerrarSesion = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 30px', backgroundColor: '#1f1f1f', borderBottom: '2px solid #007bff', marginBottom: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <h3 style={{ margin: 0, color: '#007bff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FaPaw /> ControlMascotas
                </h3>
                <Link to="/mascotas" style={{ color: '#e0e0e0', textDecoration: 'none', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <FaPaw style={{ fontSize: '12px' }}/> Mascotas
                </Link>
                <Link to="/dashboard" style={{ color: '#e0e0e0', textDecoration: 'none', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <FaChartBar /> Dashboard
                </Link>
            </div>
            
            <button 
                onClick={cerrarSesion} 
                style={{ padding: '8px 15px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
                <FaSignOutAlt /> Salir
            </button>
        </nav>
    );
};

export default Navbar;
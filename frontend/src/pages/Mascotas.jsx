import { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import axios from 'axios';

const Mascotas = () => {
    const [mascotas, setMascotas] = useState([]);
    
    // Estados para el formulario de nueva mascota
    const [nombre, setNombre] = useState('');
    const [especie, setEspecie] = useState('');
    const [edad, setEdad] = useState('');

    // Función para obtener las mascotas desde la Base de Datos
    const cargarMascotas = async () => {
        try {
            const respuesta = await axios.get('https://api-mascotas-0yvf.onrender.com/api/mascotas');
            setMascotas(respuesta.data);
        } catch (error) {
            console.error('Error al cargar mascotas', error);
        }
    };

    // useEffect hace que 'cargarMascotas' se ejecute automáticamente al abrir la página
    useEffect(() => {
        cargarMascotas();
    }, []);

    // Función para guardar una nueva mascota
    const agregarMascota = async (e) => {
        e.preventDefault();
        if (!nombre || !especie || !edad) {
            alert('Por favor completa todos los campos de la mascota');
            return;
        }

        try {
            await axios.post('https://api-mascotas-0yvf.onrender.com/api/mascotas', {
                nombre,
                especie,
                edad: Number(edad)
            });
            alert('✅ Mascota agregada a la base de datos');
            // Limpiar formulario
            setNombre('');
            setEspecie('');
            setEdad('');
            // Recargar la tabla
            cargarMascotas();
        } catch (error) {
            alert('Error al guardar la mascota');
        }
    };

    // Función para la Eliminación Lógica
    const eliminarMascota = async (id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar (lógicamente) esta mascota?')) {
            try {
                await axios.put(`https://api-mascotas-0yvf.onrender.com/api/mascotas/eliminar/${id}`);
                alert('Mascota eliminada lógicamente');
                cargarMascotas(); // Recargar la tabla para que desaparezca de las "Activas"
            } catch (error) {
                alert('Error al eliminar');
            }
        }
    };

    // Función que genera y descarga el PDF
    const generarPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text('Reporte de Mascotas Registradas', 20, 20);
        
        doc.setFontSize(12);
        let posicionY = 40;
        
        mascotas.forEach((mascota, index) => {
            const texto = `${index + 1}. ${mascota.nombre} | ${mascota.especie} | ${mascota.edad} años`;
            doc.text(texto, 20, posicionY);
            posicionY += 10;
        });

        doc.save('Reporte_Mascotas.pdf');
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', color: 'white', padding: '20px' }}>
            <h2>Gestión de Mascotas</h2>
            
            {/* Formulario para agregar nueva mascota */}
            <form onSubmit={agregarMascota} style={{ display: 'flex', gap: '10px', marginBottom: '20px', backgroundColor: '#333', padding: '15px', borderRadius: '8px' }}>
                <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} style={{ padding: '8px', borderRadius: '4px', border: 'none', flex: 1 }} />
                <input type="text" placeholder="Especie (ej. Perro)" value={especie} onChange={(e) => setEspecie(e.target.value)} style={{ padding: '8px', borderRadius: '4px', border: 'none', flex: 1 }} />
                <input type="number" placeholder="Edad" value={edad} onChange={(e) => setEdad(e.target.value)} style={{ padding: '8px', borderRadius: '4px', border: 'none', width: '70px' }} />
                <button type="submit" style={{ padding: '8px 15px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                    + Guardar Mascota
                </button>
            </form>

            <button onClick={generarPDF} style={{ padding: '10px 15px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', marginBottom: '20px' }}>
                📄 Descargar Reporte PDF
            </button>

            {/* Tabla del CRUD */}
            <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#222', borderRadius: '8px', overflow: 'hidden' }}>
                <thead style={{ backgroundColor: '#444', textAlign: 'left' }}>
                    <tr>
                        <th style={{ padding: '12px' }}>Nombre</th>
                        <th style={{ padding: '12px' }}>Especie</th>
                        <th style={{ padding: '12px' }}>Edad</th>
                        <th style={{ padding: '12px' }}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {mascotas.length === 0 ? (
                        <tr><td colSpan="4" style={{ padding: '15px', textAlign: 'center' }}>No hay mascotas registradas aún.</td></tr>
                    ) : (
                        mascotas.map((mascota) => (
                            <tr key={mascota._id} style={{ borderBottom: '1px solid #444' }}>
                                <td style={{ padding: '12px' }}>{mascota.nombre}</td>
                                <td style={{ padding: '12px' }}>{mascota.especie}</td>
                                <td style={{ padding: '12px' }}>{mascota.edad} años</td>
                                <td style={{ padding: '12px' }}>
                                    <button onClick={() => eliminarMascota(mascota._id)} style={{ padding: '5px 10px', cursor: 'pointer', backgroundColor: 'transparent', color: '#ff6b6b', border: '1px solid #ff6b6b', borderRadius: '4px' }}>
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Mascotas;
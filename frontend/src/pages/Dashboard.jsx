
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
    const [datosGrafico, setDatosGrafico] = useState([]);

    useEffect(() => {
        const cargarEstadisticas = async () => {
            try {
                // Obtenemos las mascotas reales de la base de datos
                const respuesta = await axios.get('http://localhost:3000/api/mascotas');
                const mascotas = respuesta.data;

                // Contar cuántas mascotas hay por especie
                const conteoEspecies = mascotas.reduce((acumulador, mascota) => {
                    // Pasamos a minúsculas para que "Perro" y "perro" cuenten como lo mismo
                    const especie = mascota.especie.toLowerCase();
                    acumulador[especie] = (acumulador[especie] || 0) + 1;
                    return acumulador;
                }, {});

                // Darle el formato que necesita el gráfico
                const dataFormateada = Object.keys(conteoEspecies).map(key => ({
                    especie: key.charAt(0).toUpperCase() + key.slice(1), // Primera letra mayúscula
                    cantidad: conteoEspecies[key]
                }));

                setDatosGrafico(dataFormateada);
            } catch (error) {
                console.error('Error al cargar datos del dashboard', error);
            }
        };

        cargarEstadisticas();
    }, []);

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', color: 'white', padding: '20px' }}>
            <h2 style={{ textAlign: 'center' }}>Estadísticas de Mascotas</h2>
            
            <div style={{ backgroundColor: '#222', padding: '20px', borderRadius: '8px', marginTop: '20px', height: '400px' }}>
                {datosGrafico.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={datosGrafico}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#444" vertical={false} />
                            <XAxis dataKey="especie" stroke="#fff" />
                            <YAxis stroke="#fff" allowDecimals={false} />
                            <Tooltip 
                                cursor={{ fill: '#333' }}
                                contentStyle={{ backgroundColor: '#111', border: '1px solid #444', color: '#fff' }} 
                            />
                            <Bar dataKey="cantidad" fill="#007bff" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                ) : (
                    <p style={{ textAlign: 'center', marginTop: '150px', color: '#aaa' }}>
                        No hay mascotas registradas para mostrar estadísticas.
                    </p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
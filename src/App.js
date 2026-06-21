import React, { useState } from 'react';
import './App.css';
import Carrusel from './components/Carrusel';

function App() {
  const [esAdmin, setEsAdmin] = useState(false);
  const [busqueda, setBusqueda] = useState('');

  // Estados de Datos
  const [vehiculos, setVehiculos] = useState([
    { id: 1, marca: "Toyota", modelo: "RAV4", anio: 2022, patente: "ABCD12", precio: 24500000 }
  ]);
  const [formVehiculo, setFormVehiculo] = useState({ marca: '', modelo: '', precio: '' });

  const [articulos, setArticulos] = useState([
    { id: 1, nombre: "Neumático Michelin", precio: 85000, categoria: "Accesorios" }
  ]);
  const [formArticulo, setFormArticulo] = useState({ nombre: '', precio: '', categoria: '' });

  // Lógica de Filtrado (Buscador)
  const vehiculosFiltrados = vehiculos.filter(v => 
    v.marca.toLowerCase().includes(busqueda.toLowerCase()) || 
    v.modelo.toLowerCase().includes(busqueda.toLowerCase())
  );

  const articulosFiltrados = articulos.filter(a => 
    a.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Funciones de Acción
  const handleAgregarVehiculo = (e) => {
    e.preventDefault();
    setVehiculos([...vehiculos, { ...formVehiculo, id: Date.now(), precio: parseFloat(formVehiculo.precio) }]);
    setFormVehiculo({ marca: '', modelo: '', precio: '' });
  };

  const handleAgregarArticulo = (e) => {
    e.preventDefault();
    setArticulos([...articulos, { ...formArticulo, id: Date.now(), precio: parseFloat(formArticulo.precio) }]);
    setFormArticulo({ nombre: '', precio: '', categoria: '' });
  };

  const enviarWhatsApp = (item, tipo) => {
    const mensaje = tipo === 'auto' ? `Hola, me interesa el ${item.marca} ${item.modelo}` : `Hola, me interesa el repuesto: ${item.nombre}`;
    window.open(`https://wa.me/56900000000?text=${encodeURIComponent(mensaje)}`, '_blank');
  };

  return (
    <div className="admin-container">
      <header>
        <h1>LDcars Automotriz</h1>
        <input 
          type="text" 
          placeholder="🔍 Buscar vehículos o repuestos..." 
          className="search-bar"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)} 
        />
        
        {/* BOTÓN ADMIN CORREGIDO */}
        <button 
          onClick={() => {
            if (!esAdmin) {
              const pass = prompt("Ingrese clave admin:");
              if (pass === "1234") { setEsAdmin(true); } 
              else { alert("Clave incorrecta"); }
            } else {
              setEsAdmin(false);
            }
          }}
          style={{ backgroundColor: esAdmin ? '#dc3545' : '#28a745', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '20px', cursor: 'pointer' }}
        >
          {esAdmin ? "🔒 Cerrar Sesión" : "🔓 Modo Admin"}
        </button>
      </header>

      <Carrusel />

      <div className="dashboard-grid">
        {/* SECCIÓN VEHÍCULOS */}
        <section>
          <h2>Catálogo de Vehículos</h2>
          {esAdmin && (
            <form onSubmit={handleAgregarVehiculo} className="crud-form">
              <input placeholder="Marca" onChange={(e) => setFormVehiculo({...formVehiculo, marca: e.target.value})} required />
              <input placeholder="Modelo" onChange={(e) => setFormVehiculo({...formVehiculo, modelo: e.target.value})} required />
              <input type="number" placeholder="Precio" onChange={(e) => setFormVehiculo({...formVehiculo, precio: e.target.value})} required />
              <button type="submit">Guardar</button>
            </form>
          )}
          <div className="list-container">
            {vehiculosFiltrados.map(v => (
              <div key={v.id} className="item-card">
                <h3>{v.marca} {v.modelo}</h3>
                <p>Precio: ${v.precio.toLocaleString()}</p>
                <button className="btn-whatsapp" onClick={() => enviarWhatsApp(v, 'auto')}>WhatsApp 💬</button>
                {esAdmin && <button className="btn-delete" onClick={() => setVehiculos(vehiculos.filter(veh => veh.id !== v.id))}>Eliminar</button>}
              </div>
            ))}
          </div>
        </section>

        {/* SECCIÓN REPUESTOS */}
        <section>
          <h2>Venta de Repuestos</h2>
          {esAdmin && (
            <form onSubmit={handleAgregarArticulo} className="crud-form">
              <input placeholder="Nombre" onChange={(e) => setFormArticulo({...formArticulo, nombre: e.target.value})} required />
              <button type="submit">Guardar</button>
            </form>
          )}
          <div className="list-container">
            {articulosFiltrados.map(a => (
              <div key={a.id} className="item-card">
                <h3>{a.nombre}</h3>
                <p>Precio: ${a.precio.toLocaleString()}</p>
                <button className="btn-whatsapp" onClick={() => enviarWhatsApp(a, 'repuesto')}>WhatsApp 💬</button>
                {esAdmin && <button className="btn-delete" onClick={() => setArticulos(articulos.filter(art => art.id !== a.id))}>Eliminar</button>}
              </div>
            ))}
          </div>
        </section>

        {/* EQUIPO */}s
        <section>
          <h2>Nuestro Equipo</h2>
          <div className="team-grid">
            <div className="team-card"><h3>Juan Pérez</h3><p>Gerente de Ventas</p></div>
            <div className="team-card"><h3>Ana Gómez</h3><p>Atención al Cliente</p></div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
import React, { useState } from 'react';
import './App.css';
import Carrusel from './components/Carrusel';

function App() {
  // --- ESTADOS PARA VEHICULOS ---
  const [vehiculos, setVehiculos] = useState([
    { id: 1, marca: "Toyota", modelo: "RAV4", anio: 2022, patente: "ABCD12", color: "Gris", estado: "semi", precio: 24500000 }
  ]);

  const [formVehiculo, setFormVehiculo] = useState({
    marca: '', modelo: '', anio: '', patente: '', color: '', estado: 'nuevo', precio: ''
  });

  // --- ESTADOS PARA ARTÍCULOS ---
  const [articulos, setArticulos] = useState([
    { id: 1, nombre: "Neumático Michelin", precio: 85000, cantidad: 12, categoria: "Accesorios", procedencia: "Importado", estado: "nuevo" }
  ]);

  const [formArticulo, setFormArticulo] = useState({
    nombre: '', precio: '', cantidad: '', categoria: '', procedencia: '', estado: 'nuevo'
  });

  // --- CREADOR DE FORMULARIOS ---
  const handleAgregarVehiculo = (e) => {
    e.preventDefault();
    const nuevoVehiculo = {
      ...formVehiculo,
      id: Date.now(), // Genera un ID único temporal
      anio: parseInt(formVehiculo.anio),
      precio: parseFloat(formVehiculo.precio)
    };
    setVehiculos([...vehiculos, nuevoVehiculo]);
    // Limpiar formulario
    setFormVehiculo({ marca: '', modelo: '', anio: '', patente: '', color: '', estado: 'nuevo', precio: '' });
  };

  const handleAgregarArticulo = (e) => {
    e.preventDefault();
    const nuevoArticulo = {
      ...formArticulo,
      id: Date.now(),
      precio: parseFloat(formArticulo.precio),
      cantidad: parseInt(formArticulo.cantidad)
    };
    setArticulos([...articulos, nuevoArticulo]);
    // Limpiar formulario
    setFormArticulo({ nombre: '', precio: '', cantidad: '', categoria: '', procedencia: '', estado: 'nuevo' });
  };

  // --- ELIMINAR ---
  const handleEliminarVehiculo = (id) => {
    setVehiculos(vehiculos.filter(v => v.id !== id));
  };

  const handleEliminarArticulo = (id) => {
    setArticulos(articulos.filter(a => a.id !== id));
  };

  return (
    <div className="admin-container">
      <header>
        <h1>LDcars Automotriz</h1>
        <p>Gestión de Compra/Venta de Vehículos y Repuestos</p>
      </header>

      {/* --- AQUI ESTA EL CARRUSEL --- */}
      <Carrusel />

      <div className="dashboard-grid">
        
        {/* --- SECCIÓN VEHÍCULOS --- */}
        <section className="crud-section">
          <h2>Gestión de Vehículos</h2>
          
          {/* Formulario */}
          <form onSubmit={handleAgregarVehiculo} className="crud-form">
            <input type="text" placeholder="Marca" value={formVehiculo.marca} onChange={(e) => setFormVehiculo({...formVehiculo, marca: e.target.value})} required />
            <input type="text" placeholder="Modelo" value={formVehiculo.modelo} onChange={(e) => setFormVehiculo({...formVehiculo, modelo: e.target.value})} required />
            <input type="number" placeholder="Año" value={formVehiculo.anio} onChange={(e) => setFormVehiculo({...formVehiculo, anio: e.target.value})} required />
            <input type="text" placeholder="Patente" value={formVehiculo.patente} onChange={(e) => setFormVehiculo({...formVehiculo, patente: e.target.value})} required />
            <input type="text" placeholder="Color" value={formVehiculo.color} onChange={(e) => setFormVehiculo({...formVehiculo, color: e.target.value})} required />
            <input type="number" placeholder="Precio ($)" value={formVehiculo.precio} onChange={(e) => setFormVehiculo({...formVehiculo, precio: e.target.value})} required />
            <select value={formVehiculo.estado} onChange={(e) => setFormVehiculo({...formVehiculo, estado: e.target.value})}>
              <option value="nuevo">Nuevo</option>
              <option value="semi">Semi-usado</option>
              <option value="usado">Usado</option>
            </select>
            <button type="submit" className="btn-add">Agregar Vehículo</button>
          </form>

          {/* Lista/Tabla */}
          <div className="list-container">
            {vehiculos.map(v => (
              <div key={v.id} className="item-card">
                <div>
                  <strong>{v.marca} {v.modelo} ({v.anio})</strong>
                  <p>Patente: {v.patente} | Color: {v.color} | Estado: {v.estado}</p>
                  <span className="price">${v.precio.toLocaleString()}</span>
                </div>
                <button onClick={() => handleEliminarVehiculo(v.id)} className="btn-delete">Eliminar</button>
              </div>
            ))}
          </div>
        </section>

        {/* --- SECCIÓN ARTÍCULOS --- */}
        <section className="crud-section">
          <h2>Venta de Repuestos</h2>
          
          {/* Formulario */}
          <form onSubmit={handleAgregarArticulo} className="crud-form">
            <input type="text" placeholder="Nombre Artículo" value={formArticulo.nombre} onChange={(e) => setFormArticulo({...formArticulo, nombre: e.target.value})} required />
            <input type="number" placeholder="Precio ($)" value={formArticulo.precio} onChange={(e) => setFormArticulo({...formArticulo, precio: e.target.value})} required />
            <input type="number" placeholder="Cantidad Stock" value={formArticulo.cantidad} onChange={(e) => setFormArticulo({...formArticulo, cantidad: e.target.value})} required />
            <input type="text" placeholder="Categoría" value={formArticulo.categoria} onChange={(e) => setFormArticulo({...formArticulo, categoria: e.target.value})} required />
            <input type="text" placeholder="Procedencia (Nacional/Importado)" value={formArticulo.procedencia} onChange={(e) => setFormArticulo({...formArticulo, procedencia: e.target.value})} required />
            <select value={formArticulo.estado} onChange={(e) => setFormArticulo({...formArticulo, estado: e.target.value})}>
              <option value="nuevo">Nuevo</option>
              <option value="usado">Usado</option>
            </select>
            <button type="submit" className="btn-add">Agregar Artículo</button>
          </form>

          {/* Lista/Tabla */}
          <div className="list-container">
            {articulos.map(a => (
              <div key={a.id} className="item-card">
                <div>
                  <strong>{a.nombre}</strong>
                  <p>Cat: {a.categoria} | Stock: {a.cantidad} | Origen: {a.procedencia}</p>
                  <span className="price">${a.precio.toLocaleString()}</span>
                </div>
                <button onClick={() => handleEliminarArticulo(a.id)} className="btn-delete">Eliminar</button>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}

export default App;
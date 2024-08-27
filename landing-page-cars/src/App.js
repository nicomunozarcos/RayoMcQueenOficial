import React, { useState, Suspense, useEffect } from 'react';
import './App.scss';
import ThreeDModel from './ThreeDModel';

function App() {
  const [expandedRace, setExpandedRace] = useState(null);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [currentModel, setCurrentModel] = useState('/lightning_mcqueen.glb');
  const [currentScale, setCurrentScale] = useState(1);

  const handleModelChange = (modelPath, modelScale) => {
    setCurrentModel(modelPath);
    setCurrentScale(modelScale);
  };

  const races = [
    { 
      id: 1,
      name: "Copa Pistón", 
      result: "1er Lugar", 
      details: "Lightning McQueen dominó la carrera con un tiempo récord en la vuelta. Sus paradas estratégicas en boxes y su velocidad inigualable en la recta final aseguraron su victoria, dejando a la competencia asombrada.",
      image: "/a3f46de8cc5cc4f9225cb41b5a15df5e.jpg"
    },
    { 
      id: 2,
      name: "Gran Premio de Radiador Springs", 
      result: "1er Lugar", 
      details: "La ventaja de correr en casa llevó a una victoria decisiva para Lightning. Su conocimiento íntimo de cada curva y el apoyo del público local lo impulsaron a tomar la delantera desde el principio hasta el final.",
      image: "/RS_GP.jpg"
    },
    { 
      id: 3,
      name: "Gran Premio Mundial", 
      result: "2do Lugar", 
      details: "Un final de infarto en Tokio contra Francesco Bernoulli. La impresionante actuación de Lightning durante toda la carrera fue superada por poco en los últimos momentos, resultando en un final de foto.",
      image: "/McQueenandFrancescoPortoCorsa.jpg"
    },
    { 
      id: 4,
      name: "Copa Carburador", 
      result: "Próxima", 
      details: "La próxima semana en el Motor Speedway del Sur. Lightning se está entrenando intensamente para esta carrera de alta tensión, afinando su técnica de manejo en las curvas cerradas de la pista.",
      image: "/carburetor-cup.jpg"
    },
    { 
      id: 5,
      name: "Desafío de Carrera Rust-eze", 
      result: "Próxima", 
      details: "En 2 semanas en Radiador Springs. Este evento especial, patrocinado por Rust-eze, mostrará las habilidades de Lightning en su terreno natal, y los fondos recaudados se destinarán a organizaciones benéficas locales.",
      image: "/rust-eze-challenge.jpg"
    },
    { 
      id: 6,
      name: "Torneo Internacional de Velocidad", 
      result: "Próxima", 
      details: "El próximo mes, en sedes de todo el mundo. Lightning se está preparando para este agotador torneo de múltiples etapas que pondrá a prueba su capacidad de adaptación a diversas condiciones de pista y estilos de carrera.",
      image: "/international-speedway.jpg"
    },
  ];
  

  const merchandise = [
    { id: 1, name: "Rayo McQueen Figura", price: 19.99, image: "/1093380055_0340_0340.jpg" },
    { id: 2, name: "Gorra Rayo Mcqueen", price: 24.99, image: "/il_794xN.2845000604_7243.jpg" },
    { id: 3, name: "Replica Copa Piston", price: 49.99, image: "/H0bccb9c707654bc6bfb00677838401d6l.jpg" },
    { id: 4, name: "Rayo McQueen Racing Chaqueta", price: 79.99, image: "/Lightning-McQueen-Racing-Jacket-1200x1600.jpg" },
  ];

  useEffect(() => {
    const newTotal = cart.reduce((total, item) => total + item.price, 0);
    setTotalAmount(newTotal);
  }, [cart]);

  const toggleRaceDetails = (id) => {
    setExpandedRace(expandedRace === id ? null : id);
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className="app">
      <header className="header">
        <div className="container header__content">
          <div className="header__logos">
            <img src="/pngegg.png" alt="Rust-eze Logo" className="header__logo" />
          </div>
          <nav className="header__nav">
            <ul>
              <li><button onClick={() => scrollToSection('hero')}>Inico</button></li>
              <li><button onClick={() => scrollToSection('results')}>Resultados</button></li>
              <li><button onClick={() => scrollToSection('team')}>Equipo</button></li>
              <li><button onClick={() => scrollToSection('merchandise')}>Tienda</button></li>
              <li>
                <button onClick={toggleCart} className="cart-button" aria-label="Shopping Cart">
                  🛒 <span className="cart-count">{cart.length}</span>
                  <span className="cart-total">${totalAmount.toFixed(2)}</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <section id="hero" className="hero">
      <div className="container hero__content">
        <div className="hero__text">
          <h1 className="hero__title">
            <span className="hero__title-highlight">Rayo McQueen.</span>
          </h1>
          <p className="hero__subtitle">Velocidad. Soy rápido.</p>
        </div>
        <div className="hero__model">
          <Suspense fallback={<div>Loading model...</div>}>
            <ThreeDModel modelPath={currentModel} modelScale={currentScale}/>
          </Suspense>
        </div>
      </div>
      {/* Botones para cambiar entre modelos */}
      <div className="hero__buttons">
        <button className="button" onClick={() => handleModelChange('/lightning_mcqueen.glb', 1)}>
          Rayo Clásico
        </button>
        <button className="button" onClick={() => handleModelChange('/daredevil_lightning.glb', 1.4)}>
          Rayo Capitán América
        </button>
        <button className="button" onClick={() => handleModelChange('/dragon_lightning.glb', 1.4)}>
          Rayo Dragón Chino
        </button>
      </div>
    </section>

      <section id="results" className="results">
        <div className="container">
          <h1 className="section-title">Últimos resultados y próximas carreras</h1>
          <div className="results__grid">
            {races.map((race) => (
              <div 
                key={race.id} 
                className={`race-card ${expandedRace === race.id ? 'race-card--expanded' : ''}`}
              >
                <h3 className="race-card__title">{race.name}</h3>
                <p className="race-card__result">{race.result}</p>
                <button 
                  onClick={() => toggleRaceDetails(race.id)} 
                  className="button button--full"
                  aria-expanded={expandedRace === race.id}
                  aria-controls={`race-details-${race.id}`}
                >
                  {expandedRace === race.id ? 'Less Details' : 'More Details'}
                  <span className="button__icon">{expandedRace === race.id ? '▲' : '▼'}</span>
                </button>
                <div 
                  id={`race-details-${race.id}`}
                  className={`race-card__details ${expandedRace === race.id ? 'race-card__details--expanded' : ''}`}
                >
                  <img src={race.image} alt={race.name} className="race-card__image" />
                  <p>{race.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="team" className="team">
        <div className="container">
          <h2 className="section-title">Equipo Rusteze</h2>
          <div className="team__content">
            <img src="/pngegg.png" alt="Rust-eze Logo" className="team__logo" />
            <div className="team__info">
              <p className="team__sponsor">Orgullosos patrocinadores de Rayo McQueen!</p>
              <p className="team__description">
                Rust-eze Medicated Bumper Ointment: New Rear-End Formula! 
                Developed by our team of professionals to keep you racing smooth and fast.
              </p>
            </div>
          </div>
          <img 
            src="/sddefault.jpg" 
            alt="Rust-eze Team" 
            className="team__image"
          />
        </div>
      </section>

      <section id="merchandise" className="merchandise">
        <div className="container">
          <h2 className="section-title">Tienda Oficial</h2>
          <div className="merchandise__grid">
            {merchandise.map((item) => (
              <div key={item.id} className="merchandise-item">
                <img src={item.image} alt={item.name} className="merchandise-item__image" />
                <h3 className="merchandise-item__name">{item.name}</h3>
                <p className="merchandise-item__price">${item.price.toFixed(2)}</p>
                <button className="button" onClick={() => addToCart(item)}>Añadir al carrito</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2023 Lightning McQueen Racing. All rights reserved.</p>
        </div>
      </footer>

      {isCartOpen && (
        <div className="cart-modal">
          <div className="cart-modal__content">
            <h2>Carrito</h2>
            {cart.length === 0 ? (
              <p>Tu carrito está vacío.</p>
            ) : (
              <>
                <ul className="cart-items">
                  {cart.map((item, index) => (
                    <li key={index} className="cart-item">
                      <img src={item.image} alt={item.name} className="cart-item__image" />
                      <div className="cart-item__details">
                        <h3>{item.name}</h3>
                        <p>${item.price.toFixed(2)}</p>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="button button--small">Remove</button>
                    </li>
                  ))}
                </ul>
                <p className="cart-total">Total: €{totalAmount.toFixed(2)}</p>
              </>
            )}
            <button onClick={toggleCart} className="button">Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
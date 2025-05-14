import React, { useState }  from 'react';
import './app.scss';

function App() {
    const [modalActive, setModalActive] = useState(false);
  
    const openModal = () => {
      setModalActive(true);
    };
  
    const closeModal = (e) => {
      if (e.target === e.currentTarget) {
        setModalActive(false);
      }
    };
  
    return (
      <div className="app">
        <header>
          <div className="logo">Кинораф</div>
          <div className="search">
            <input type="text" placeholder="Поиск..." />
          </div>
        </header>
  
        <main>
          <h2>Популярные фильмы</h2>
          <MovieList openModal={openModal} />
  
          <h2 style={{ marginTop: '2rem' }}>Рекомендации</h2>
          <MovieList openModal={openModal} />
        </main>
  
        {/* Модальное окно */}
        <div className={`modal ${modalActive ? 'active' : ''}`} onClick={closeModal}>
          <div className="modal-content">
            <video controls>
              <source src="https://www.w3schools.com/html/mov_bbb.mp4 " type="video/mp4" />
              Ваш браузер не поддерживает видео.
            </video>
            <button onClick={() => alert('Запуск просмотра!')}>Смотреть</button>
          </div>
        </div>
      </div>
    );
  }
  
  function MovieList({ openModal }) {
    const movies = [1, 2, 3];
  
    return (
      <div className="movies">
        {movies.map((id) => (
          <div key={id} className="movie-card" onClick={openModal}>
            <img
              src={`https://via.placeholder.com/160x240.png?text= Фильм+${id}`}
              alt={`Фильм ${id}`}
            />
            <div className="info">Фильм {id}</div>
          </div>
        ))}
      </div>
    );
  }
  
  export default App;
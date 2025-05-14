import React, { useState } from 'react';
import MovieList from './movieList.tsx';
import Modal from './modal.tsx';
import styles from './app.scss';

export default function App() {
    const [modalActive, setModalActive] = useState(false);

    const openModal = () => setModalActive(true);

    return <>
        <div className={styles.header}>
            <div className={styles.logo}>Кинораф</div>
            <div className={styles.search}>
                <input type="text" placeholder="Поиск..." />
            </div>
        </div>

        <div className={styles.main}>
            <h2 className={styles.sectionTitle}>Популярные фильмы</h2>
            <MovieList openModal={openModal} />
            <h2 className={styles.sectionTitle}>Рекомендации</h2>
            <MovieList openModal={openModal} />
        </div>

        <Modal show={modalActive} setShow={setModalActive} />
    </>;
}
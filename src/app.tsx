import React, { useState, useEffect } from 'react';
import MovieList from './movieList.tsx';
import Modal from './modal.tsx';
import styles from './app.scss';
import { getApi } from './api.ts';

export default function App() {
    const [modalActive, setModalActive] = useState(false);
    const openModal = () => setModalActive(true);

    const [popular, setPopular] = useState([]);
    const [recommends, setRecommends] = useState([]);

    useEffect(() => {
        getApi('popular').then(({ success, popular }) => {
            if (success) setPopular(popular);
        });
        getApi('recommends').then(({ success, recommends }) => {
            if (success) setRecommends(recommends);
        });
    }, []);

    return <>
        <div className={styles.header}>
            <a className={styles.logo} href="/">
                <img src="/icons/logo.svg" />
                <span>inoraf</span>
            </a>
            <div className={styles.search}>
                <input type="text" placeholder="Поиск..." />
            </div>
        </div>

        <div className={styles.main}>
            <h2 className={styles.sectionTitle}>Популярные фильмы</h2>
            <MovieList movies={popular} openModal={openModal} />
            <h2 className={styles.sectionTitle}>Рекомендации</h2>
            <MovieList movies={recommends} openModal={openModal} />
        </div>

        <Modal show={modalActive} setShow={setModalActive} />
    </>;
}
import React, { useState, useEffect, useRef } from 'react';
import MovieList from './movieList.tsx';
import Modal from './modal.tsx';
import styles from './app.scss';
import { getApi } from './api.ts';
import { CheckoutProvider, PaymentElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51ROswmQoWqQ4g3iBD9JIBJioKDibNd62H2QKbvjTZPqrDbMhTFMgHIoTdkgUMIUolZ1rg19Y2cD3NUM0vRNZ8Vjw006BloLVfr');

async function fetchClientSecret() {
    const data = await fetch('http://localhost:8000/create-checkout-session', { method: 'POST' }).then(res => res.json());
    return data.checkoutSessionClientSecret;
}

export default function App() {
    const [modalActive, setModalActive] = useState(false);
    const openModal = () => setModalActive(true);

    const [popular, setPopular] = useState([]);
    const [recommends, setRecommends] = useState([]);

    const videoRef = useRef(null);

    useEffect(() => {
        getApi('popular').then(({ success, popular }) => {
            if (success) setPopular(popular);
        });
        getApi('recommends').then(({ success, recommends }) => {
            if (success) setRecommends(recommends);
        });

        fetch("/back/video.php?file=video.mp4")
            .then(response => {
                if (!response.ok) throw new Error("Network response was not ok");
                return response.blob();
            })
            .then(blob => {
                const url = URL.createObjectURL(blob);
                if (videoRef.current) {
                    (videoRef.current as HTMLVideoElement).src = url;
                }
            })
            .catch(error => {
                console.error("Ошибка:", error);
            });
    }, []);

    return <>
        <CheckoutProvider stripe={stripePromise} options={{ fetchClientSecret }}>
            <PaymentElement />
        </CheckoutProvider>
        <div className={styles.header}>
            <a className={styles.logo} href="/">
                <img src="/icons/logo.svg" />
                <span>inoraf</span>
            </a>
            <div className={styles.search}>
                <input type="text" placeholder="Поиск..." />
            </div>
            <div className={styles.subscriptionButton}>
                <button onClick={() => { }}>Купить подписку</button>
            </div>
            <div className={styles.subscriptionButton}>
                <button>Войти</button>
            </div>
        </div>

        <div className={styles.main}>
            <h2 className={styles.sectionTitle}>Популярные фильмы</h2>
            <MovieList movies={popular} openModal={openModal} />
            <h2 className={styles.sectionTitle}>Рекомендации</h2>
            <MovieList movies={recommends} openModal={openModal} />
        </div>

        <div className={styles.videoPlayer}>
            <h2 className={styles.sectionTitle}>Видеоплеер</h2>
            <video controls width="100%" height="auto">
                <source src="/video.mp4" type="video/mp4" />
                Ваш браузер не поддерживает воспроизведение видео.
            </video>
        </div>

        <Modal show={modalActive} setShow={setModalActive} />
    </>;
}

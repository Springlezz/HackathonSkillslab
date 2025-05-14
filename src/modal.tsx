import React from 'react';
import styles from './modal.scss';

export default function Modal({ show, setShow }: { show: boolean; setShow: (show: boolean) => void; }) {
    function onClick(event: React.MouseEvent<HTMLDivElement>) {
        if (event.target === event.currentTarget) {
            setShow(false);
        }
    }

    return (
        <div className={show ? `${styles.modal} ${styles.show}` : styles.modal} onClick={onClick}>
            <div className={styles.content}>
                <video controls>
                    <source src="https://www.w3schools.com/html/mov_bbb.mp4 " type="video/mp4" />
                    Ваш браузер не поддерживает видео.
                </video>
                <button onClick={() => alert('Запуск просмотра!')}>Смотреть</button>
            </div>
        </div>
    );
}
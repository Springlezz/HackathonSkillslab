import React from 'react';
import styles from './movieList.scss';

export default function MovieList({ openModal }) {
    const movies = [1, 2, 3, 4, 5, 6, 7, 8];

    // Горизонтальная прокрутка колесом мыши
    function onScroll(event: React.WheelEvent<HTMLDivElement>) {
        event.currentTarget.scrollLeft += event.deltaY;
    }

    return (
        <div className={styles.movies} onWheel={onScroll}>
            {movies.map(id => (
                <div key={id} className={styles.card} onClick={openModal}>
                    <img
                        src={`https://via.placeholder.com/160x240.png?text= Фильм+${id}`}
                        alt={`Фильм ${id}`} />
                    <div className={styles.info}>Фильм {id}</div>
                </div>
            ))}
        </div>
    );
}
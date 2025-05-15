import React from 'react';
import styles from './movieList.scss';

interface Movie {
    id: number;
    title: string;
    poster: string;
}

export default function MovieList({ movies, openModal }: { movies: Movie[]; openModal: () => void; }) {
    // Горизонтальная прокрутка колесом мыши
    function onScroll(event: React.WheelEvent<HTMLDivElement>) {
        event.currentTarget.scrollLeft += event.deltaY;
    }

    return (
        <div className={styles.movies} onWheel={onScroll}>
            {movies.map(movie => (
                <div key={movie.id} className={styles.card} onClick={openModal}>
                    <img
                        src={movie.poster}
                        alt={movie.title} />
                    <div className={styles.info}>{movie.title}</div>
                </div>
            ))}
        </div>
    );
}
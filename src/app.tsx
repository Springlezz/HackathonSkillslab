import React from 'react';
import styles from './app.scss';

export default function App() {
    const [count, setCount] = React.useState(0);

    return <>
        <h1>Веб-сайт</h1>
        <p className={styles.content}>Контент</p>
        <button onClick={() => setCount(count + 1)}>Кликни: {count}</button>
    </>;
}
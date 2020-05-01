import React from 'react';
import styled from './home.module.scss';

const Home = () => {
    return (
        <div className={styled.container}>
            <div className={styled.box}>
                Добрый день!
            </div>
        </div>
    );
}

export default Home;
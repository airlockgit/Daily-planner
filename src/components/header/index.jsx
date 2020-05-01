import React from 'react';
import styled from './header.module.scss';
import { Link } from 'react-router-dom';

export const Header = () => (
    <div className={styled.container}>
        <Link to='/'><h1 className={styled.title}>Daily planner</h1></Link>
    </div>
);
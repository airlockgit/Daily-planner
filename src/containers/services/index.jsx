import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { List, Card, Spin, Alert, Button } from 'antd';
import styled from './services.module.scss';
import { useDispatch, useSelector } from 'react-redux';

export const Services = () => {
    const dispatch = useDispatch();
    const { isLoading, error, products } = useSelector(state => state.app.services);

    const fetchProducts = () => {
        dispatch({ type: 'FETCH_PRODUCTS' });
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className={styled.container}>
            <div className={styled.box}>
                {
                    isLoading ?
                        <List
                            className={styled.list}
                            dataSource={products}
                            renderItem={product => (
                                <List.Item>
                                    <Link className={styled.link} to={`/${product.id}/details`}>{product.name}</Link>
                                    <div>{product.price} руб.</div>
                                </List.Item>
                            )}
                        /> : error ?
                            <Alert
                                message="Произошла ошибка"
                                description={<div><Button type="primary" onClick={fetchProducts}>Повторить запрос</Button></div>}
                                type="error"
                            />
                            : <Spin tip="Загрузка..." />
                }
            </div>
        </div>
    );
}

export const Detail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { isLoading, error, product } = useSelector(state => state.app.services);

    const fetchProducts = () => {
        dispatch({ type: 'FETCH_PRODUCT', id });
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className={styled.container}>
            <div className={styled.box}>
                {
                    isLoading ?
                        <Card title={product.name}>
                            <p>{product.content}</p>
                            <p>{product.price}</p>
                        </Card> : error ?
                            <Alert
                                message="Произошла ошибка"
                                description={<div><Button type="primary" onClick={fetchProducts}>Повторить запрос</Button></div>}
                                type="error"
                            />
                            : <Spin tip="Загрузка..." />
                }
            </div>
        </div >
    )
}
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { List } from 'antd';
import styled from './menu.module.scss';

export const Menu = () => {
    const { menu } = useSelector(state => state.app);

    return (
        <div className={styled.container}>
            <div className={styled.box}>
                <div className={styled.nav}>
                    <List
                        dataSource={menu}
                        renderItem={item => (
                            <List.Item>
                                <Link className={styled.link} to={item.link}>{item.title}</Link>
                            </List.Item>
                        )}
                    />
                </div>
            </div>
        </div>
    );
}
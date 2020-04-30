import React from 'react';
import styled from './calendar.module.scss';
import { Calendar as CalendarAnt } from 'antd';

const Calendar = () => {

    const onPanelChange = () => {
        console.log('hello');
    }

    return (
        <div className={styled.container}>
            <CalendarAnt onPanelChange={onPanelChange} />
        </div>
    );
}

export default Calendar;
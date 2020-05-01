import React from 'react';
import styled from './calendar.module.scss';
import { Calendar as CalendarAnt } from 'antd';

const Calendar = () => {
    const onPanelChange = () => {
        //console.log('hello');
    }

    return (
        <div className={styled.container}>
            <div className={styled.box}>
                <CalendarAnt onPanelChange={onPanelChange} />
            </div>
        </div>
    );
}

export default Calendar;
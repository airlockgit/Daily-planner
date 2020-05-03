import React from 'react';
import styled from './calendar.module.scss';
import { Calendar as CalendarAnt, Badge } from 'antd';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

const formetDate = 'YYYY-MM-DD';

const Calendar = () => {
    const history = useHistory();

    const { todos } = useSelector(state => state.activity);

    const onPanelSelect = (value) => {
        const task = todos.find(todo => moment(todo.date).isSame(value.format('YYYY-MM-DD')));

        if (task) {
            history.push('activity/edit/' + task.id + '#calendar');
        } else {
            history.push('activity/new/' + moment(value).format(formetDate) + '#calendar');
        }
    }

    const getListData = (value) => {
        let listData = [];

        const task = todos.find(todo => moment(todo.date).isSame(value.format('YYYY-MM-DD')));

        if (task && task.title) listData.push({ type: 'success', content: task.title })

        return listData;
    }

    const dateCellRender = (value) => {
        const listData = getListData(value);

        return (
            <ul className={styled.events}>
                {listData.map((item, i) => (
                    <li key={i} title={item.content}>
                        <p className={styled.events__item}>
                            {item.content}
                        </p>
                    </li>
                ))}
            </ul>
        );
    }

    return (
        <div className={styled.container}>
            <div className={styled.box}>
                <CalendarAnt
                    dateCellRender={dateCellRender}
                    onSelect={onPanelSelect} />
            </div>
        </div>
    );
}

export default Calendar;
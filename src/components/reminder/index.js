import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { interval } from 'rxjs';

const formetDate = 'YYYY-MM-DD';
const formetDateTime = 'YYYY-MM-DD HH:mm';

const interval$ = interval(1000);

export function useRemind() {
    let [notifications, setNotifications] = useState([]);
    let isSame = [];

    const { todos } = useSelector(state => state.activity);

    useEffect(() => {
        const checkNotiEver = interval$.subscribe(() => {
            //Выборка событий за сегодня
            isSame = todos.filter(todo => moment(todo.date).isSame(moment().format(formetDate)) && todo.id != 0 && !todo.closed);

            if (isSame.length > 0) {//если события есть
                let openNoti = [];

                isSame.forEach(todo => {
                    let remind = todo.remindTime ? moment(moment.duration(todo.timeFrom) - moment.duration('00:' + todo.remindTime)).format('HH:mm') : todo.timeFrom;
                    let from = moment(todo.date + ' ' + remind, formetDateTime);
                    let to = moment(todo.date + ' ' + todo.timeTo, formetDateTime);
                    let check = moment(moment().format(formetDateTime)).isBetween(from, to);
                    let alert = notifications.find(noti => noti.id == todo.id);//если такое событие уже есть, 
                    ///можно сделать сравнение, если значения поменялись

                    if (check && !alert) {
                        openNoti.push(todo);//только новое событие
                    }
                });

                if (openNoti.length > 0) {//если нужно новое оповещение
                    checkNotiEver.unsubscribe();
                    setNotifications([...notifications, ...openNoti])
                }
            } else {//не проверяем время события, пока не изменится список задач
                checkNotiEver.unsubscribe();
            }
        });
    }, [todos, notifications]);

    return notifications;
}
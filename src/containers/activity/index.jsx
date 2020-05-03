import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams, useHistory } from "react-router-dom";
import styled from './activity.module.scss';
import moment from 'moment';
import {
    Button, Input, Modal, DatePicker, Row, Col,
    TimePicker, Comment,
} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import * as createActions from '../../actions/todos';

const formatDate = 'YYYY-MM-DD';

const Activity = ({ modalOpen, remove, edit }) => {
    const history = useHistory();
    const { id, date: newDate } = useParams();
    const dispatch = useDispatch();

    const hashCalendar = window.location.hash;

    const [modalOptions, setModalOptions] = useState({
        open: modalOpen,
    });

    const defaultTask = {
        date: newDate ? newDate : moment().format(formatDate),
        timeFrom: '12:00',
        timeTo: '12:05',
        remindTime: false,
        closed: false,
    };

    const [task, setTask] = useState(defaultTask);
    const { todos } = useSelector(state => state.activity);

    const _handleInput = e => {
        const { value } = e.target;

        setTask({
            ...task,
            title: value,
        })
    }

    useEffect(() => {
        showModalFromPage();
    }, [edit, remove]);

    const showModalFromPage = () => {
        if (id) {
            const newTask = todos.find(todo => todo.id == id);

            if (edit) {
                if (newTask) {//если задача есть, если нет то редирект
                    setTask(newTask);
                    setModalOptions({ open: true });
                } else {
                    history.push('/activity');
                }
            } else if (remove) {
                const redirect = () => hashCalendar ? history.goBack() : history.push('/activity');

                if (newTask) {//если id указан верный
                    showDeleteConfirm(() => {//да, нет
                        dispatch(createActions.deleteTodo(id))
                            .then(redirect);
                    }, redirect);
                } else {//редирект на страницу создания задач
                    history.push('/activity')
                }
            }
        }
    }

    const showDeleteConfirm = (callbackOk, callbackCancel) => {
        Modal.confirm({
            title: 'Вы действительно хотите удалить событие?',
            icon: <ExclamationCircleOutlined />,
            okText: 'Да',
            okType: 'danger',
            cancelText: 'Нет',
            onOk() {
                callbackOk();
            },
            onCancel() {
                callbackCancel()
            },
        });
    }

    const _handleNewTask = () => {
        //переход без перезагрузки страницы, модальное окно == обычная страница, для примера
        history.push('/activity/new');
        setModalOptions({ open: true });
    }

    const _handleCloseModal = () => {
        history.push('/activity');
        setModalOptions({ open: false });
        setTask(defaultTask);

        if (hashCalendar) history.push('/calendar');
    }

    const _handleOkModal = () => {
        const updateTask = () => {
            setTask(defaultTask);
            setModalOptions({ open: false });
            hashCalendar ? history.push('/calendar') : history.push('/activity');
        }

        if (!id) {
            dispatch(createActions.addTodo(task))//новая задача
                .then(() => {
                    Modal.success({
                        content: 'Событие добавлено!',
                    });

                    updateTask();
                });
        } else {//редактирование
            dispatch(createActions.updateTodo(task))
                .then(() => {
                    Modal.success({
                        content: 'Событие обновлено!',
                    });

                    updateTask();
                });
        }
    }

    const changeDate = (date, dateString) => {
        setTask({
            ...task,
            date: dateString,
        })
    }

    const changeTime = (time, timeString) => {
        setTask({
            ...task,
            timeFrom: timeString[0],
            timeTo: timeString[1],
        })
    }

    const changeRemindTime = (time, timeString) => {
        setTask({
            ...task,
            remindTime: timeString,
        })
    }

    return (
        <div className={styled.container}>
            <div className={styled.box}>
                <h2>Cписок задач</h2>
                <Button
                    type="primary"
                    onClick={_handleNewTask}
                >+ Создать</Button>
                <div>
                    {
                        todos.sort((a, b) => b.id - a.id).map((todo, i) => {
                            if (todo.id != 0) {
                                return (
                                    <Comment key={i}
                                        id={todo.id}//для якоря
                                        author={<h2>{todo.title}</h2>}
                                        content={
                                            <div className={styled.editBox}>
                                                <Row>
                                                    <Col>
                                                        {`Дата ${todo.date ? todo.date : ' '} Время от ${todo.timeFrom ? todo.timeFrom : ' '} до ${todo.timeTo ? todo.timeTo : ''}`}
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        {
                                                            todo.remindTime ?
                                                                <span>Напомнить за: <span className={styled.remind__number}>{todo.remindTime.replace(/0/g, ' ')} минут</span></span> : null
                                                        }
                                                    </Col>
                                                </Row>
                                                <Row className={styled.editBox__options}>
                                                    <Col span={2}>
                                                        <Link className={styled.link} to={`/activity/edit/${todo.id}`}>Редактировать</Link>
                                                    </Col>
                                                    <Col span={2}>
                                                        <Link className={styled.link__delete} to={`/activity/delete/${todo.id}`}>Удалить</Link>
                                                    </Col>
                                                </Row>
                                            </div>
                                        }
                                    />
                                )
                            }
                        })
                    }
                </div>
                <Modal
                    title={id ? 'Редактировать' : 'Новая задача'}
                    visible={modalOptions.open}
                    onOk={_handleOkModal}
                    onCancel={_handleCloseModal}
                    okText={!id ? 'Добавить' : 'Сохранить'}
                    cancelText="Отмена"
                >
                    <Input placeholder="Название" onChange={_handleInput} value={task.title} />
                    <div className={styled.list}>
                        <Row className={styled.list__item} align='middle'>
                            <Col span={5}>
                                Дата:
                        </Col>
                            <Col span={6}>
                                <DatePicker
                                    format={formatDate}
                                    value={moment(task.date ? task.date : moment().format(formatDate))} onChange={changeDate} />
                            </Col>
                        </Row>
                        <Row className={styled.list__item} align='middle'>
                            <Col span={5}>
                                Время:
                        </Col>
                            <Col span={13}>
                                <TimePicker.RangePicker
                                    onCalendarChange={changeTime}
                                    format="HH:mm"
                                    value={[moment(task.timeFrom ? task.timeFrom : '00:00', 'HH:mm'),
                                    moment(task.timeTo ? task.timeTo : '00:05', 'HH:mm')]} />
                            </Col>
                        </Row>
                        <Row className={styled.list__item} align='middle'>
                            <Col span={5}>
                                Напомнить за:
                        </Col>
                            <Col span={6}>
                                <TimePicker
                                    onChange={changeRemindTime}
                                    format="mm"
                                    value={moment(task.remindTime ? task.remindTime : '00', 'mm')} />
                            </Col>
                        </Row>
                        {
                            hashCalendar && id &&
                            <Row>
                                <Col>
                                    <Link className={styled.link__delete} to={`/activity/delete/${task.id}#calendar`}>Удалить событие</Link>
                                </Col>
                            </Row>
                        }
                    </div>
                </Modal>
            </div>
        </div >
    );
}

export default Activity;
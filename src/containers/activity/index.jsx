import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams, useLocation, useHistory } from "react-router-dom";
import styled from './activity.module.scss';
import moment from 'moment';
import {
    Button, Input, Modal, DatePicker, Row, Col,
    TimePicker, Comment,
} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import * as createActions from '../../actions/todos';

const Activity = ({ modalOpen, remove, edit }) => {
    const history = useHistory();
    const { id } = useParams();
    const dispatch = useDispatch();

    const [modalOptions, setModalOptions] = useState({
        open: modalOpen,
    });

    const [task, setTask] = useState({});

    const { todos } = useSelector(state => state.activity);

    const _handleInput = e => {
        const { value } = e.target;
        console.log(task);
        setTask({
            ...task,
            title: value,
        })
    }

    useEffect(() => {
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
                if (newTask) {
                    showDeleteConfirm(() => {
                        dispatch(createActions.deleteTodo(id));
                    },
                        () => history.push('/activity'));
                } else {
                    history.push('/activity');
                }
            }
        }
    }, [edit, remove]);

    function showDeleteConfirm(callbackOk, callbackCancel) {
        Modal.confirm({
            title: 'Are you sure delete this task?',
            icon: <ExclamationCircleOutlined />,
            content: 'Some descriptions',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
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
        setModalOptions({ open: false })
    }

    const _handleOkModal = () => {
        const updateTask = () => {
            setTask({});
            history.push('/activity');
            setModalOptions({ open: false });
        }

        if (!id) {
            dispatch(createActions.addTodo(task))//новая задача
                .then(() => {
                    updateTask();

                    Modal.success({
                        content: 'Событие добавлено!',
                    });
                });
        } else {//редактирование
            dispatch(createActions.updateTodo(task))
                .then(() => {
                    updateTask();

                    Modal.success({
                        content: 'Событие обновлено!',
                    });
                });
        }
    }

    const changeDate = (date, dateString) => {
        setTask({
            ...task,
            date: dateString,
        })
    }

    const changeTimeFrom = (time, timeString) => {
        setTask({
            ...task,
            timeFrom: timeString,
        })
    }

    const changeTimeTo = (time, timeString) => {
        setTask({
            ...task,
            timeTo: timeString,
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
                        todos.map((todo, i) => {
                            if (todo.id != 0) {
                                return (
                                    <Comment key={i}
                                        author={<h2>{todo.title}</h2>}
                                        content={
                                            <>
                                                <p>
                                                    {`Дата ${todo.date ? todo.date : ' '}, Время от ${todo.timeFrom ? todo.timeFrom : ' '} до ${todo.timeTo ? todo.timeTo : ' '}`}
                                                </p>
                                                <p>
                                                    <Link to={`/activity/edit/${todo.id}`}>Редактировать</Link>
                                                    <Link to={`/activity/delete/${todo.id}`}>Удалить</Link>
                                                </p>
                                            </>
                                        }
                                    />
                                )
                            }
                        })
                    }
                </div>
                <Modal
                    title="Новая задача"
                    visible={modalOptions.open}
                    onOk={_handleOkModal}
                    onCancel={_handleCloseModal}
                    okText={!id ? 'Добавить' : 'Сохранить'}
                    cancelText="Отмена"
                >
                    <Input placeholder="Название" onChange={_handleInput} value={task.title} />
                    <div className={styled.list}>
                        <Row className={styled.list__item}>
                            <Col span={4}>
                                Дата:
                        </Col>
                            <Col span={6}>
                                <DatePicker onChange={changeDate} />
                            </Col>
                        </Row>
                        <Row className={styled.list__item}>
                            <Col span={4}>
                                Время от:
                        </Col>
                            <Col span={6}>
                                <TimePicker
                                    onChange={changeTimeFrom}
                                    format="h:mm a"
                                    defaultValue={moment('00:00', 'HH:mm')} />
                            </Col>
                        </Row>
                        <Row className={styled.list__item}>
                            <Col span={4}>
                                Время до:
                        </Col>
                            <Col span={6}>
                                <TimePicker
                                    onChange={changeTimeTo}
                                    format="h:mm a"
                                    defaultValue={moment('00:00', 'HH:mm')} />
                            </Col>
                        </Row>
                    </div>
                </Modal>
            </div>
        </div >
    );
}

export default Activity;
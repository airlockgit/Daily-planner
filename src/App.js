import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Layout, notification } from 'antd';
import styled from './app.module.scss';
import Calendar from './containers/calendar';
import { Menu } from './components/menu';
import Activity from './containers/activity';
import Home from './containers/home';
import { Header } from './components/header';
import { useRemind } from './components/reminder';
import { useDispatch } from 'react-redux';
import * as createActions from './actions/todos';
import { Services, Detail } from './containers/services';

const { Sider, Content } = Layout;

function App() {
  const dispatch = useDispatch();
  const notifications = useRemind();

  useEffect(() => {
    Reminder(notifications, todo => {
      dispatch(createActions.updateTodo({ id: todo.id, closed: true }));//если уведомление закрыто, больше не показываем
    });

  }, [notifications]);

  return (
    <Layout>
      <BrowserRouter>
        <Header />
        <Layout>
          <Sider className={styled.leftSider}>
            <Menu />
          </Sider>
          <Content className={styled.content}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/calendar" component={Calendar} />
              <Route path="/services" component={Services} />
              <Route path="/:id/details" component={Detail} />
              <Route path="/activity/new/:date?" children={<Activity modalOpen={true} />} />
              <Route path="/activity/edit/:id" children={<Activity edit={true} />} />
              <Route path="/activity/delete/:id" children={<Activity remove={true} />} />
              <Route path="/activity/:date?" component={Activity} />
            </Switch>
          </Content>
        </Layout>
      </BrowserRouter >
    </Layout >
  )
};

const Reminder = (notifications, callback) => {
  notification.destroy();

  if (notifications.length > 0) {
    notifications.forEach(todo => {
      notification.open({
        message: 'Напоминание',
        description: <><p>{todo.title}</p><p>C {todo.timeFrom} до {todo.timeTo}</p></>,
        duration: 0,
        onClose: callback.bind(this, todo),
      });
    })
  }
};

export default App;

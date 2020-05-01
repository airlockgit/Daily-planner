import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';
import styled from './app.module.scss';
import Calendar from './containers/calendar';
import { Menu } from './components/menu';
import Activity from './containers/activity';
import Home from './containers/home';
import { Header } from './components/header';

const { Sider, Content } = Layout;

const App = () => (
  <Layout>
    <BrowserRouter>
      <Header />
      <Layout>
        <Sider className={styled.leftSider}>
          <Menu />
        </Sider>
        <Content className={styled.content}>
          <Route exact path="/" component={Home} />
          <Route path="/calendar" component={Calendar} />
          <Switch>
            <Route path="/activity/new" children={<Activity modalOpen={true} />} />
            <Route path="/activity/edit/:id" children={<Activity edit={true} />} />
            <Route path="/activity/delete/:id" children={<Activity remove={true} />} />
            <Route path="/activity" component={Activity} />
          </Switch>
        </Content>
      </Layout>
    </BrowserRouter >
  </Layout >
);

export default App;

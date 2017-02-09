/**
 * Created by yangfan on 2017/2/8.
 * 项目路由文件
 */
import React,{Component} from "react";
import {Route,IndexRoute} from "react-router";
import App from "./containers/App";
import HomePage from "./containers/HomePage";

const routes = (
    <Route path="/" component={App}>
        <IndexRoute component={HomePage}/>
    </Route>
);
export default routes;
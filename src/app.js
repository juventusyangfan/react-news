/**
 * Created by yangfan on 2017/2/8.
 * 项目的入口文件
 */
import "babel-polyfill";
import React from "react";
import {render} from "react-dom";
import store from "./store";
import {Provider} from "react-redux";
import {Router,browserHistory,hashHistory} from "react-router";
import routes from "./routes";
import "./styles/index.css";
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

render(
    <Provider>
        <Router routes={routes} history={hashHistory}/>
    </Provider>,
    document.getElementById("root")
)
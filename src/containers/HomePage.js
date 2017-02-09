/**
 * Created by yangfan on 2017/2/8.
 * HomePage页面的容器组件
 */
import React, { Component, PropTypes } from "react"
import { connect } from "react-redux";
import {selectTab,fetchTopics,recordScrollT} from "../actions";
import Header from "../components/HomePage/Header/Header";
import Lists from "../components/HomePage/Lists/Lists";
/**
 * Created by yangfan on 2017/2/9.
 * 入口组件
 */
import React, { Component, PropTypes } from "react"
import { connect } from "react-redux";

class App extends Component {
    render() {
        return (
            <div>{this.props.children}</div>
        )
    }

    componentWillMount() {
    }

    componentWillReceiveProps(newProps) {
    }

    componentWillUnmount() {
    }
}

export default App;
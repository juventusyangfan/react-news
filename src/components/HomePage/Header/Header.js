/**
 * Created by yangfan on 2017/2/8.
 * HomePage页面头部的展示组件
 */
import React, { PropTypes,Component } from "react";
import styles from "./Header.scss";
import {Link} from "react-router";
import {Tabs, Tab} from "material-ui/Tabs";
import {grey800} from "material-ui/styles/colors";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import muiThemeable from "material-ui/styles/muiThemeable";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import SwipeableViews from "react-swipeable-views";

const muiTheme = getMuiTheme({
    palette: {
        backgroundColor: grey800
    }
});

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slideIndex: 0
        }
    }

    handleChange = (value) => {
        this.setState({
            slideIndex: value
        });
        this.props.onClick(this.props.tabs[value].filter)
    };

    componentWillMount() {
        const {tabs,filter} = this.props;
        let slideIndex;
        tabs.forEach((tab, index) => {
            if (tab.filter === filter) {
                slideIndex = index;
            }
        });
        this.setState({
            slideIndex: slideIndex
        });
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div>
                    <div className={styles.header} style={{top:-this.props.fixedTop}}>
                        <AppBar title={<p style={{textAlign:'center'}}>体育新闻</p>}
                                style={{backgroundColor:muiTheme.palette.backgroundColor}}/>
                        <Tabs onChange={this.handleChange} value={this.state.slideIndex}>
                            {this.props.tabs.map((tab, i) =>
                                    <Tab key={i} label={tab.title} value={i}>
                                    </Tab>
                            )}
                        </Tabs>
                    </div>
                    <SwipeableViews index={this.state.slideIndex} onChangeIndex={this.handleChange}>
                        {this.props.children}
                    </SwipeableViews>
                </div>
            </MuiThemeProvider>
        )
    }
}

export default muiThemeable()(Header);
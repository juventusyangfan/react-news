/**
 * Created by yangfan on 2017/2/8.
 * HomePage页面的容器组件
 */
import React, { Component, PropTypes } from "react"
import { connect } from "react-redux";
import {selectTab,fetchNews,recordScrollT} from "../actions";
import Header from "../components/HomePage/Header/Header";
import Lists from "../components/HomePage/Lists/Lists";
import Snackbar from "../components/common/Snackbar";
import CircleLoading from "../components/common/CircleLoading";
import getSize from "../utils/getSize";
import PullRefresh from "../components/common/PullRefresh";

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fadeIn: true,
            openDrawer: false,
            openSnackbar: false,
            isFreshing: false,
            fixedTop: 0,
            scrollT: 0
        }
    }

    fresh = () => {
        const {selectedTab,dispatch} = this.props;
        dispatch(fetchNews(selectedTab, 1));
    };
    onRefresh = (next) => {
        if (!this.state.isFreshing) {
            this.setState({
                isFreshing: true
            });
            this.fresh();
            setTimeout(() => {
                next();
                this.openSnackbar();
                this.setState({
                    isFreshing: false
                })
            }, 1000)
        }
    };
    openSnackbar = () => {
        this.setState({
            openSnackbar:true
        });
        setTimeout(() => {
            this.setState({
                openSnackbar:false
            })
        },1000);
    }
    handleClick = (tab) => {
        let {scrollT} = getSize();
        const {selectedTab,dispatch,tabData} = this.props;
        dispatch(recordScrollT(selectedTab, scrollT));
        dispatch(selectTab(tab));

        const ua = navigator.userAgent;
        if (!tabData[tab] && ua.indexOf('Mobile') === -1) {
            if (scrollT >= 64) {
                dispatch(recordScrollT(tab, 64));
                this.setState({
                    scrollT: 64
                })
            } else {
                dispatch(recordScrollT(tab, scrollT));
                this.setState({
                    scrollT: scrollT
                })
            }
        }
    };
    loadMore = () => {
        const {selectedTab,page,isFetching,dispatch} = this.props;
        let ipage = page;
        if (!isFetching) {
            dispatch(fetchNews(selectedTab, ++ipage));
        }
    };

    tabs = [
        {
            title: "体育",
            filter: "tiyu"
        },
        {
            title: "NBA",
            filter: "nba"
        },
        {
            title: "足球",
            filter: "football"
        }
    ];

    render() {
        const {selectedTab,isFetching,page,news,dispatch,article,currentRouter,login,profile,unreadMessageCount,tabData} = this.props;
        return (
            <div className={this.state.fadeIn?'fade-in':''}>
                <PullRefresh zIndex={10000} size={60} max={200} color='#E91E63' onRefresh={this.onRefresh}/>
                <Header filter={selectedTab} onClick={this.handleClick} fixedTop={this.state.fixedTop} tabs={this.tabs}>
                    {this.tabs.map((tab, index) =>
                            <div key={index}>
                                {((isFetching && page === 0) || (tab.filter !== selectedTab && !tabData[tab.filter])) &&
                                <CircleLoading />}
                                {tab.filter === selectedTab &&
                                <div style={{opacity: (!isFetching || page >= 1) ? 1 : 0 }}>
                                    <Lists news={news} dispatch={dispatch} article={article} isFetching={isFetching}/>
                                </div>}
                            </div>
                    )}
                </Header>
                <Snackbar isOpened={this.state.openSnackbar} message="刷新成功"/>
            </div>
        )
    }

    //添加组件生命周期方法
    componentWillMount() {
    }

    componentWillReceiveProps(newProps) {
        const {news,isFetching,selectedTab,scrollT,dispatch} = newProps;
        if (news.length == 0 && this.props.scrollT == 0) {
            window.scrollTo(0, 0);
        }
        if (!isFetching && news.length === 0) {
            dispatch(fetchNews(selectedTab));
        }
        if (selectedTab !== this.props.selectedTab) {
            if (scrollT) {
                window.scrollTo(0, scrollT);
            }
        }
    }

    componentDidMount() {
        const {selectedTab,page,scrollT,dispatch} = this.props;
        if (page === 0) {
            dispatch(fetchNews(selectedTab));
        }
        if (scrollT) {
            window.scrollTo(0, scrollT);
        }
        let lastScrollY = this.lastScrollY;
        window.onscroll = () => {
            let {windowH,contentH,scrollT} = getSize();
            if (windowH + scrollT + 100 > contentH) {
                this.loadMore()
            }


            // 由于下面的操作比较费cpu,所以进行判断是否为手机端
            const ua = navigator.userAgent;
            if (ua.indexOf('Mobile') === -1) {
                if (!lastScrollY || !scrollT) {
                    lastScrollY = scrollT
                }
                let diff = scrollT - lastScrollY;
                if (diff >= 0) {
                    if (scrollT > 64 && this.state.fixedTop !== 64) {
                        this.setState({
                            fixedTop: 64
                        })
                    }
                    if (scrollT <= 64) {
                        this.setState({
                            fixedTop: scrollT
                        })
                    }
                } else {
                    this.setState({
                        scrollT: 0
                    });
                    if (scrollT > 64 && this.state.fixedTop !== 0) {
                        this.setState({
                            fixedTop: 0
                        })
                    }
                }
                lastScrollY = scrollT
            }
        }
    }

    componentDidUpdate() {
        let {windowH,contentH,scrollT} = getSize();
        const {news} = this.props;
        if (scrollT === 0 && this.state.scrollT > 0) {
            window.scrollTo(0, this.state.scrollT)
        }

        // 判断内容加载后，内容的高度是否填满屏幕，若网页太高，加载一次内容的高度不能填满整个网页，则继续请求数据
        if (news.length > 0 && windowH + 200 > contentH) {
            this.loadMore();
        }
    }

    componentWillUnmount() {
        let {scrollT} = getSize();
        const {selectedTab,dispatch} = this.props;
        dispatch(recordScrollT(selectedTab, scrollT));
        window.onscroll = null;
    }
}

function mapStateToProps(state) {
    const {homePage} = state;
    const {selectedTab,tabData} = homePage;
    const {isFetching,page,scrollT,news} = tabData[selectedTab] || {isFetching: false, page: 0, scrollT: 0, news: []};
    return {isFetching, page, scrollT, news, selectedTab, tabData}
}

export default connect(mapStateToProps)(HomePage);
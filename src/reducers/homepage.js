/**
 * Created by yangfan on 2017/2/8.
 * HomePage页面的reducer
 */
import {SELECT_TAB,RECORD_SCROLLT,REQUEST_NEWS,RECEIVE_NEWS} from "../actions";

const selectedTab = (state, action) => {
    switch (action.type) {
        case SELECT_TAB:
            return action.tab;
        default:
            return state;
    }
};

const tabDataItem = (state = {isFetching: false, page: 0, scrollT: 0, news: []}, action) => {
    switch (action.type) {
        case REQUEST_NEWS:
            return {
                ...state,
                isFetching: true
            }
        case RECEIVE_NEWS:
            if (state.page < action.page) {
                let news = state.news;
                action.news = news.concat(action.news);
            }
            return {
                ...state,
                isFetching: false,
                page: action.page,
                news: action.news,
                num: action.num
            }
        case RECORD_SCROLLT:
            return {
                ...state,
                scrollT: action.scrollT
            }
        default :
            return state;
    }
};

const tabData = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_NEWS:
        case REQUEST_NEWS:
        case RECORD_SCROLLT:
            return {
                ...state,
                [action.tab]: tabDataItem(state[action.tab], action)
            }
        default:
            return state
    }
};

const homePage = (state = {selectedTab: "tiyu", tabData: {}}, action) => {
    if (state) {
        const sTab = selectedTab(state.selectedTab, action);
        const tData = tabData(state.tabData, action);
        return {...state, selectedTab: sTab, tabData: tData}
    }
    return state;
};

export default homePage;
/**
 * Created by yangfan on 2017/2/8.
 * 存放项目的action
 */
import fetch from "isomorphic-fetch";
import {APIKEY} from "./config";

export const REQUEST_NEWS = "REQUEST_NEWS";
export const RECEIVE_NEWS = "RECEIVE_NEWS";
export const SELECT_TAB = "SELECT_TAB";
export const RECORD_SCROLLT = "RECORD_SCROLLT";

const selectTab = tab => ({
    type: SELECT_TAB,
    tab
});

const recordScrollT = (tab, scrollT) => {
    return ({
        type: RECORD_SCROLLT,
        tab,
        scrollT
    })
}

const requestNews = tab => ({
    type: REQUEST_NEWS,
    tab
});
const receiveNews = (tab, news, page, num) => ({
    type: RECEIVE_NEWS,
    tab,
    news,
    page,
    num
});
const fetchNews = (tab, page = 1, num = 10) => {
    return dispatch => {
        dispatch(requestNews(tab));
        fetch(`http://api.tianapi.com/${tab}/?page=${page}&num=${num}&key=${APIKEY}`)//天行网新闻数据api
            .then(response => {//fetch中加大括号必须有返回值
                return response.json();
            })
            .then(json => {
                if(json.code==200){
                    return dispatch(receiveNews(tab, json.newslist, page, num));
                }
                else{
                    return false;
                }
            });
    }
};

export {selectTab,recordScrollT,fetchNews};
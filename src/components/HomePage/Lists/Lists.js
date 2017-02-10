/**
 * Created by yangfan on 2017/2/8.
 * HomePage页面列表的展示组件
 */
import React, { PropTypes,Compontend } from "react";
import FlipMove from "react-flip-move";
import styles from "./Lists.scss";
import classnames from "classnames";
import {Link} from "react-router";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import {List, ListItem} from "material-ui/List";
import Divider from "material-ui/Divider";
import Avatar from "material-ui/Avatar";

const Lists = props => {
    const tabChn = {tiyu: "体育", NBA: "NBA", football: "足球"};
    const {news,isFetching} = props;
    let disableAllAnimations = news.length === 20 ? false : true
    let enterAnimation = {
        from: {transform: 'translateY(-80px)', opacity: 0},
        to: {transform: 'translateY(0)', opacity: 1}
    };
    return (
        <div style={{position:'relative'}}>
            <div className={styles.lists}>
                <MuiThemeProvider>
                    <List>
                        <FlipMove disableAllAnimations={disableAllAnimations} enterAnimation={enterAnimation}
                                  easing='ease-out' duration='400' staggerDelayBy='40' staggerDurationBy='4'>
                            {news.map((newsOne, i) =>
                                    <a key={i} href={newsOne.url} className={styles.link}>
                                        <ListItem
                                            leftAvatar={<Avatar src={newsOne.picUrl} />}
                                            primaryText={
                                                   <div className={styles.text}>
                                                     <span className={styles.title}>{newsOne.title}</span>
                                                   </div>
                                                }
                                            secondaryText={
                                                    <div className={styles.text}>
                                                      <span>{newsOne.description}</span>
                                                      <span style={{float:'right'}}>{newsOne.ctime}</span>
                                                   </div>
                                                }
                                            />
                                        <Divider inset={true}/>
                                    </a>
                            )}
                        </FlipMove>
                    </List>
                </MuiThemeProvider>

                <div className={styles.spinner}>
                    <div className={styles.bounce1}></div>
                    <div className={styles.bounce2}></div>
                    <div className={styles.bounce3}></div>
                </div>
            </div>
        </div>
    )
};

export default Lists;
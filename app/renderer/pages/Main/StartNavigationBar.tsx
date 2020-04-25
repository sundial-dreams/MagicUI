import React from 'react';
// @ts-ignore
import  style from './StartNavigationBar.css';

export interface IProps {

}

export default function StartNavigation(props: IProps) {
    return (
        <div className={style.start_navigation_bar}>
            <button className={style.start_btn}>
                Start
            </button>
        </div>
    )
}
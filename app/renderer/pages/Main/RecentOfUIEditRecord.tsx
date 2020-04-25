import React, {useState} from 'react';
// @ts-ignore
import style from './RecentOfUIEditRecord.css';


export interface IProps {

}

export default function RecentOfUIEditRecord(props: IProps) {
    return (
        <div className={style.recent_of_ui_edit_record}>
            <h3 className={style.title}>
                UI Edit Recent
            </h3>
            <div className={style.recent_record_list}>
                {Array.from({length: 4}, v => <UIEditRecordItem/>)}
            </div>
        </div>
    )
}

export interface IUIEditRecordItemProps {

}

function UIEditRecordItem(props: IUIEditRecordItemProps) {
    return (
        <div className={style.ui_edit_record_item}>
            <div className={style.header}>

            </div>
            <div className={style.content}>
                <div className={style.icon}>
                    xxx
                </div>
                <h3 className={style.title}>
                    ni hao
                </h3>
                <h4 className={style.desc}>
                    it is ...
                </h4>
            </div>
        </div>
    )
}
import React, {ReactNode, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {IStoreState} from '../../store';
import {COMPONENT_TYPES} from '../../utils/constants';
import {UIComponentsFold, UIComponentItem} from './components';
import {
  faSquare,
  faCircle,
  faEdit,
  faWindowMaximize,
  faMobile,
  faImage,
  faInbox
} from '@fortawesome/free-solid-svg-icons';
// @ts-ignore
import style from './ComponentsPanel.css';


export interface IComponentsPanelProps {

}

const componentFoldConfig = [
  {
    title: 'SHAPE',
    children: [
      {
        name: COMPONENT_TYPES.SHAPE.RECT,
        icon: faSquare
      },
      {
        name: COMPONENT_TYPES.SHAPE.CIRCLE,
        icon: faCircle
      },
      {
        name: COMPONENT_TYPES.SHAPE.ELLIPSE,
        icon: faCircle
      }
    ]
  },
  {
    title: 'WIDGET',
    children: [
      {
        name: COMPONENT_TYPES.WIDGET.PC_WIDGET,
        icon: faWindowMaximize
      },
      {
        name: COMPONENT_TYPES.WIDGET.MOBILE_WIDGET,
        icon: faMobile
      }
    ]
  },
  {
    title: 'LAYOUT',
    children: []
  },
  {
    title: 'BUTTON',
    children: [
      {
        name: COMPONENT_TYPES.BUTTON.CUSTOM_BUTTON,
        icon: faEdit
      }
    ]
  },
  {
    title: 'INPUT',
    children: [
      {
        name: COMPONENT_TYPES.INPUT.CUSTOM_INPUT,
        icon: faInbox
      }
    ]
  },
  {
    title: 'TEXT',
    children: [
      {
        name: COMPONENT_TYPES.TEXT.LABEL,
        icon: faEdit
      },
      {
        name: COMPONENT_TYPES.TEXT.CUSTOM_TEXT,
        icon: faEdit
      }
    ]
  },
  {
    title: 'IMAGE',
    children: [
      {
        name: COMPONENT_TYPES.IMAGE.CUSTOM_IMAGE,
        icon: faImage
      }
    ]
  }
];

export default function ComponentsPanel(props: IComponentsPanelProps) {

  const foldElem = componentFoldConfig.map((v, i) => {
    if (v.children.length === 0)
      return null;

    const items = v.children.map((v, i) => {
      return (
        <UIComponentItem name={v.name} icon={v.icon} key={i}/>
      );
    });

    return (
      <UIComponentsFold title={v.title} key={i}>
        {items}
      </UIComponentsFold>
    );
  });

  return (
    <div className={style.components_panel}>
      <div className={style.components}>
        <div className={style.ui_page_wrapper}>
          <UIPageStore currentUIPage={'A Page'}/>
        </div>
        <div className={style.ui_components_fold_wrapper}>
          {foldElem}
        </div>
      </div>
      <div className={style.status_bar}>

      </div>
    </div>
  );
}

interface IUIPageStoreProps {
  currentUIPage: string
}

function UIPageStore(props: IUIPageStoreProps) {

  return (
    <div className={style.ui_page_store}>
      <button className={style.current_ui_page}>
        {props.currentUIPage} +
      </button>
      <div className={style.ui_page_search_panel}>
        <input/>
        <ul className={style.ui_page_result}>
          <li>A Page</li>
          <li>B Page</li>
          <li>C Page</li>
          <li>D Page</li>
        </ul>
      </div>
    </div>
  );
}

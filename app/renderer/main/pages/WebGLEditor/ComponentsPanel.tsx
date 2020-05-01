import React, { ReactNode, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IStoreState } from '../../store';
import { COMPONENT_TYPES } from '../../utils/constants';
import { UIComponentsFold, UIComponentItem, NewPageModal } from './components';
import {
  faSquare,
  faCircle,
  faEdit,
  faWindowMaximize,
  faMobile,
  faImage,
  faInbox,
  faPlus,
  faPlusSquare,
  faCheck, faSearch
} from '@fortawesome/free-solid-svg-icons';
// @ts-ignore
import style from './ComponentsPanel.scss';
import modal from '../../components/modal';
import { cls } from '../../../public/utils';
import { createOnePage } from '../../utils/api';
import toast from '../../components/toast';


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
  const state = useSelector((state: IStoreState) => state.user);

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

  const handleCreateNewPage = () => {
    modal(cancel => <NewPageModal cancel={cancel} email={state.email}/>);
  };
  return (
    <div className={style.components_panel}>
      <div className={style.components}>
        <div className={style.ui_page_wrapper}>
          <UIPageStore currentPage={'A Page'}/>
        </div>
        <div className={style.ui_components_fold_wrapper}>
          {foldElem}
        </div>
      </div>
      <div className={style.status_bar}>
        <NewPageButton onClick={handleCreateNewPage}/>
      </div>
    </div>
  );
}

interface IUIPageStoreProps {
  currentPage: string
}

function UIPageStore(props: IUIPageStoreProps) {
  const [hideContent, setHideContent] = useState(true);
  const handleClick = () => {
    setHideContent(hideContent => !hideContent);
  };
  return (
    <div className={style.ui_page_store}>
      <button className={style.current_ui_page} onClick={handleClick}>
        {props.currentPage}
        <span>
          <FontAwesomeIcon icon={faCheck}/>
        </span>
      </button>
      <div className={cls(style.ui_page_search_panel, !hideContent && style.show)}>
        <div className={style.search}>
          <input type="text" placeholder="search page..."/>
          <button>
            <FontAwesomeIcon icon={faSearch}/>
          </button>
        </div>
        <ul className={style.ui_page_result}>
          <ResultItem name="a page"/>
          <ResultItem name="a page"/>
          <ResultItem name="a page"/>
          <ResultItem name="a page"/>
          <ResultItem name="a page"/>
        </ul>
      </div>
    </div>
  );
}

function ResultItem(props: { name: string, onClick?: () => void }) {
  return (
    <li className={style.result_item} onClick={props.onClick}>
      <span>
        <FontAwesomeIcon icon={faPlusSquare}/>
      </span>
      {props.name}
    </li>
  );
}

interface INewPageButtonProps {
  onClick: () => void
}

function NewPageButton(props: INewPageButtonProps) {
  return (
    <div className={style.new_page_button} onClick={props.onClick}>
      <button>
        <FontAwesomeIcon icon={faPlus}/>
      </button>
    </div>
  );
}



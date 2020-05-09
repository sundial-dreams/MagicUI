import React, { ReactNode, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IStoreState } from '../../store';
import { UIComponentsFold, UIComponentItem, NewPageModal } from './components';
import {
  faPlus,
  faCheck,
  faSearch,
  faBatteryEmpty,
  faWindowRestore,
  faCircleNotch, faThermometerEmpty
} from '@fortawesome/free-solid-svg-icons';
import modal from '../../components/modal';
import { cls } from '../../../public/utils';
import { fetchPages } from '../../utils/api';
import { selectWebGLPage } from '../../actions/webglEditor';
import { ComponentFoldConfig } from '../../utils/constants';

// @ts-ignore
import style from './ComponentsPanel.scss';


export interface IComponentsPanelProps {

}


export default function ComponentsPanel(props: IComponentsPanelProps) {
  const state = useSelector((state: IStoreState) => state.user);

  const foldElem = ComponentFoldConfig.map((v, i) => {
    const type = v.type;
    if (v.children.length === 0)
      return null;

    const items = v.children.map((v, i) => {
      return (
        <UIComponentItem type={type} name={v.name} icon={v.icon} key={i}/>
      );
    });

    return (
      <UIComponentsFold title={v.type} key={i}>
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

type PageType = { pageId: string, page: {}, name: string };

function UIPageStore(props: any) {
  const [hideContent, setHideContent] = useState(true);
  const [pages, setPages] = useState([] as PageType[]);
  const [loading, setLoading] = useState(false);

  const webGLPage = useSelector((state: IStoreState) => state.webGLPage);
  const user = useSelector((state: IStoreState) => state.user);
  const dispatch = useDispatch();

  const handleClick = () => {
    if (hideContent) {
      if (!user.email) return;
      setPages([]);
      setLoading(true);
      fetchPages(user.email).then(v => {
        if (!v.err) {
          const pages = v.pages as PageType[];
          setPages(pages);
          setLoading(false);
        }
      }).catch(e => {

      });
    }
    setHideContent(hideContent => !hideContent);
  };

  const elem = pages.length > 0 ? pages.map((v, i) => {
    const click = () => {
      dispatch(selectWebGLPage(
        v.pageId,
        v.name,
        v.page
      ));
      handleClick();
    };
    return (<ResultItem name={v.name} key={i} onClick={click}/>);
  }).slice(0, 5) : (
    <div className={style.no_data}>
      <FontAwesomeIcon icon={faThermometerEmpty}/> No Data!
    </div>
  );
  const loadingElem = (
    <div className={style.loading}>
      <FontAwesomeIcon icon={faCircleNotch} spin/> loading...
    </div>
  );

  return (
    <div className={style.ui_page_store}>
      <button className={style.current_ui_page} onClick={handleClick}>
        {webGLPage.name.toLocaleUpperCase()}
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
          {loading ? loadingElem : elem}
        </ul>
      </div>
    </div>
  );
}

function ResultItem(props: { name: string, onClick?: () => void }) {
  return (
    <li className={style.result_item} onClick={props.onClick}>
      <span>
        <FontAwesomeIcon icon={faWindowRestore}/>
      </span>
      {props.name}
    </li>
  );
}

function NewPageButton(props: { onClick: () => void }) {
  return (
    <div className={style.new_page_button} onClick={props.onClick}>
      <button>
        <FontAwesomeIcon icon={faPlus}/>
      </button>
    </div>
  );
}



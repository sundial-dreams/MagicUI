import React, { ReactNode, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IStoreState } from '../../store';
import { UIComponentsFold, UIComponentItem, NewPageModal } from './components';
import {
  faPlus,
  faCheck,
  faSearch,
  faTags,
  faCircleNotch, faThermometerEmpty, faTrash, faEdit, faTag
} from '@fortawesome/free-solid-svg-icons';
import modal from '../../components/modal';
import { cls } from '../../../public/utils';
import { deleteOnePage, fetchAllPages, fetchOnePage, modifyPageName } from '../../utils/api';
import { selectWebGLPage } from '../../actions/webglEditor';
import { ComponentFoldConfig } from '../../utils/constants';

// @ts-ignore
import style from './ComponentsPanel.scss';
import Confirm from '../../components/modal/confirm';
import toast from '../../components/toast';

export default function ComponentsPanel(props: {}) {
  const user = useSelector((state: IStoreState) => state.user);
  const webglPage = useSelector((state: IStoreState) => state.webGLPage);

  const dispatch = useDispatch();

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
  const openCreatePageModal = () => {
    modal(cancel => <NewPageModal cancel={cancel} email={user.email} dispatch={dispatch}/>);
  };
  const openDeletePageModal = () => {
    modal(cancel => <Confirm title={`do you want to delete ${webglPage.name}?`} cancel={cancel} confirm={() => {
      deleteOnePage(user.email, webglPage.id).then((v) => {
        if (!v.err) {
          fetchOnePage(user.email, v.pageId).then((res) => {
            cancel();
            toast('delete one page!');
            dispatch(selectWebGLPage(
              v.pageId,
              v.name,
              res.page.page,
              v.id
            ));
          });
        }
      });
    }}/>);
  };

  return (
    <div className={style.components_panel}>
      <div className={style.components}>
        <div className={style.ui_page_wrapper}>
          <WebGLPageList currentPage={'A Page'}/>
        </div>
        <div className={style.ui_components_fold_wrapper}>
          {foldElem}
        </div>
      </div>
      <div className={style.status_bar}>
        <NewPageButton onClick={openCreatePageModal}/>
        <DeletePageButton onClick={openDeletePageModal}/>
      </div>
    </div>
  );
}

type PageType = { id: string, pageId: string, name: string };

function WebGLPageList(props: any) {
  const [hideContent, setHideContent] = useState(true);
  const [pages, setPages] = useState([] as PageType[]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [disabled, setDisabled] = useState(true);

  const webGLPage = useSelector((state: IStoreState) => state.webGLPage);
  const user = useSelector((state: IStoreState) => state.user);
  const dispatch = useDispatch();

  useEffect(() => setName(webGLPage.name), [webGLPage.name]);

  const handleClick = () => {
    if (hideContent) {
      if (!user.email) return;
      setPages([]);
      setLoading(true);
      fetchAllPages(user.email).then(v => {
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
  const canEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDisabled(false);
  }
  const handleModifyPageName = (e: React.MouseEvent) => {
    e.stopPropagation();
    modifyPageName(user.email, webGLPage.id, name).then(v => {
      console.log(v);
      if (!v.err) {
        setDisabled(true);
        return;
      }
      setDisabled(true);
    })
  }

  const elem = pages.length > 0 ? pages.map((v, i) => {
    const click = () => {
      fetchOnePage(user.email, v.pageId).then(res => {
        if (!res.err) {
          dispatch(selectWebGLPage(
            v.pageId,
            v.name,
            res.page.page,
            v.id
          ));
        }
      });
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
      <div className={style.current_ui_page} onClick={handleClick}>
        <input type="text"
               className={cls(!disabled && style.active)}
               onClick={disabled ? () => {} : e => e.stopPropagation()}
               value={name}
               onChange={e => setName(e.target.value)}
               disabled={disabled}/>
        <span onClick={disabled ? canEdit : handleModifyPageName}>
          <FontAwesomeIcon icon={disabled ? faEdit : faCheck} color={disabled ? '#999999' : 'red'}/>
        </span>
      </div>
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
        <FontAwesomeIcon icon={faTags}/>
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

function DeletePageButton(props: { onClick: () => void }) {
  return (
    <div className={style.delete_page_button} onClick={props.onClick}>
      <button>
        <FontAwesomeIcon icon={faTrash}/>
      </button>
    </div>
  );
}



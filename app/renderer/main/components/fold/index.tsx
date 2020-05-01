import React, {ReactNode} from 'react';

// @ts-ignore
import style from './index.scss';

export interface IFoldProps {
  children: ReactNode[] | ReactNode,
  indent: number
}

export default function Fold(props: IFoldProps) {
  const content = Array.isArray(props.children) ? props.children.map(v => (
    <div className={style.item_wrapper}>
      {v}
    </div>
  )) : props.children;

  const foldStyle = {
    paddingLeft: props.indent * 10 + 'px'
  };

  return (
    <div className={style.fold} style={foldStyle}>
      <button className={style.fold_main}>
       + dir
      </button>
      <div className={style.fold_content}>
        {content}
      </div>
    </div>
  );
}

export function FoldItem() {
  return (
    <div className={style.fold_item}>
      filename
    </div>
  );
}


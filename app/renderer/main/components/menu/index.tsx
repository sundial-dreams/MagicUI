import React, { PropsWithChildren, ReactNode } from 'react';
// @ts-ignore
import style from './index.scss';

export interface IMenuProps {
  children: ReactNode[] | ReactNode
}

export default function Menu(props: IMenuProps) {
  const content = Array.isArray(props.children) ? props.children.map((v: ReactNode) => (
      <div className={style.menu_item_wrapper}>
        {v}
      </div>
    )
  ) : props.children;

  return (
    <div className={style.menu}>
      {content}
    </div>
  );
}

export interface IMenuItemProps {
  name: string,
  children: ReactNode[] | ReactNode
}

export function MenuItem(props: IMenuItemProps) {
  const content = Array.isArray(props.children) ? props.children.map(v => (
    <div className={style.menu_item_section_wrapper}>
      {v}
    </div>
  )) : props.children;

  const section = props.children && (
    <div className={style.menu_item_content}>
      {content}
    </div>
  );

  return (
    <div className={style.menu_item}>
      <button>{props.name}</button>
      {section}
    </div>
  );
}

export interface IItemSection {
  text: string,
  onClick?: () => void
}

export function ItemSection(props: IItemSection) {
  return (
    <button className={style.item_section} onClick={props.onClick}>
      {props.text}
    </button>
  );
}
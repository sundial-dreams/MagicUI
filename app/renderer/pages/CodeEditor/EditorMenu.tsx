import React from 'react';
import Menu, {ItemSection, MenuItem} from '../../components/menu';
// @ts-ignore
import style from  './index.css';

export function EditorMenu() {
  return (
    <Menu>
      <MenuItem name="file">
        <ItemSection text="new"/>
        <ItemSection text="recent"/>
      </MenuItem>
      <MenuItem name="edit">
        <ItemSection text="undo"/>
        <ItemSection text="delete"/>
      </MenuItem>
      <MenuItem name="run">
        <ItemSection text="run ast code"/>
        <ItemSection text="stop"/>
      </MenuItem>
      <MenuItem name="help">
        <ItemSection text="how"/>
        <ItemSection text="what"/>
      </MenuItem>
    </Menu>
  )
}
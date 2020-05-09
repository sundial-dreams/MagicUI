import React from 'react';
import Menu, {ItemSection, MenuItem} from '../../components/menu';
// @ts-ignore
import style from './index.scss';

export function EditorMenu() {
  return (
    <Menu>
      <MenuItem name="File">
        <ItemSection text="New File"/>
        <ItemSection text="New Folder"/>
        <ItemSection text="Delete"/>
      </MenuItem>
      <MenuItem name="Edit">
        <ItemSection text="Save"/>
        <ItemSection text="Save All"/>
      </MenuItem>
      <MenuItem name="Run">
        <ItemSection text="Build"/>
        <ItemSection text="Run"/>
      </MenuItem>
      <MenuItem name="Help">
        <ItemSection text="DSL help"/>
        <ItemSection text="Question"/>
      </MenuItem>
    </Menu>
  )
}
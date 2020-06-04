import React  from 'react';
import Menu, { ItemSection, MenuItem } from '../../components/menu';
import { Markdown } from './components';


// @ts-ignore
import style from './index.scss';

const text = `
# DSL Syntax Support

## DSL（Domain Specific Language）
   
   DSL语法设计参考了SCSS语法，采用一个嵌套结构来表达UI页面嵌套关系。
   
   以Type.name形式表达一个组件的类型和名称，以“{”开头，以“}”结尾，将组件的属性和相关信息进行包裹。
   
   组件属性定义为两类，基础属性和样式属性，基础属性关键字包括position、size、text、image，样式属性以style关键字定义，用大括号进行包裹，内层属性包括background、border、shadow。属性与属性之间使用“；”分开。
   一个属性的参数使用空格进行分隔，末尾使用“；”号结束一个属性的定义。
  
   使用children关键字表达一个组件的所有子组件，使用“[”和“]”对所有的子组件进行包裹，子组件DSL代码以“，”分开。
   
`;

export default function Help() {
  return (
    <div id="page" className={style.help}>
      <div className={style.header_navigation}>
        <div className={style.menu_wrapper}>
          <HelpMenu/>
        </div>
      </div>
      <div className={style.content}>
        <Markdown text={text}/>
      </div>
    </div>
  )
}


function HelpMenu() {
  return (
    <Menu>
      <MenuItem name="Question">
        <ItemSection text="DSL Syntax"/>
        <ItemSection text="UI Editor"/>
      </MenuItem>
      <MenuItem name="Other">
        <ItemSection text="other question"/>
        <ItemSection text="Save All"/>
      </MenuItem>
    </Menu>
  )
}
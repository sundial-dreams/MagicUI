import React, {ChangeEvent, ReactNode, useEffect, useState} from 'react';
import {cls} from '../../utils';
import {useDispatch, useSelector} from 'react-redux';
import {IStoreState} from '../../store';
import {useInput} from '../../hooks';
import {changeComponentBackground, changeComponentBorder, changeComponentShadow, changeComponentText} from '../../actions/UIEditor';

// @ts-ignore
import style from './PropertiesPanel.scss';
const {round} = Math;


interface IBasicPropertiesProps {
  position: { x: number, y: number },
  size: { width: number, height: number }
}

function BasicProperties(props: IBasicPropertiesProps) {

  return (
    <PropertiesItem name="BASIC">
      <div className={style.position_props}>
        <div>
          <span>X</span>
          <input value={round(props.position.x)}/>
        </div>
        <div>
          <span>Y</span>
          <input value={round(props.position.y)}/>
        </div>
      </div>
      <div className={style.size_props}>
        <div>
          <span>W</span>
          <input value={round(props.size.width)}/>
        </div>
        <div>
          <span>H</span>
          <input value={round(props.size.height)}/>
        </div>
      </div>
    </PropertiesItem>
  );
}

interface IBackgroundPropertiesProps {
  background: {
    fill: string,
    opacity: number
  }
}

function BackgroundProperties(props: IBackgroundPropertiesProps) {
  const dispatch = useDispatch();
  const [color, setColor] = useState('');
  const [opacity, setOpacity] = useState(0);

  useEffect(() => setColor(props.background.fill), [props.background.fill]);
  useEffect(() => setOpacity(props.background.opacity), [props.background.opacity]);

  const handleChangeColor = (e: any) => {
    setColor(e.target.value);
    console.log(e.target.value);
    dispatch(changeComponentBackground(e.target.value, props.background.opacity));
  };
  const handleChangeOpacity = (e: any) => {
    setOpacity(+e.target.value);
    dispatch(changeComponentBackground(props.background.fill, +e.target.value));
  };

  return (
    <PropertiesItem name="BACKGROUND">
      <div className={style.bg_color_props}>
        <span>Fill</span>
        <input value={color} onChange={handleChangeColor}/>
      </div>
      <div className={style.bg_opacity_props}>
        <span>Opacity</span>
        <input value={opacity} onChange={handleChangeOpacity}/>
      </div>
    </PropertiesItem>
  );
}

interface IBorderPropertiesProps {
  border: {
    width: number,
    radius: number,
    fill: string
  }
}

function BorderProperties(props: IBorderPropertiesProps) {
  const dispatch = useDispatch();
  const [width, setWidth] = useState(0);
  const [radius, setRadius] = useState(0);
  const [color, setColor] = useState('');

  useEffect(() => setWidth(props.border.width), [props.border.width]);
  useEffect(() => setRadius(props.border.radius), [props.border.radius]);
  useEffect(() => setColor(props.border.fill), [props.border.fill]);

  const handleChangeColor = (e: any) => {
    setColor(e.target.value);
    dispatch(changeComponentBorder(e.target.value, width, radius));
  };

  const handleChangeWidth = (e: any) => {
    setWidth(e.target.value);
    dispatch(changeComponentBorder(color, +e.target.value, radius));
  };

  const handleChangeRadius = (e: any) => {
    setRadius(e.target.value);
    dispatch(changeComponentBorder(color, width, + e.target.value));
  };
  return (
    <PropertiesItem name="BORDER">
      <div className={style.border_props}>
        <div>
          <span>W</span>
          <input value={width} onChange={handleChangeWidth}/>
        </div>
        <div>
          <span>R</span>
          <input value={radius} onChange={handleChangeRadius}/>
        </div>
      </div>
      <div className={style.border_color_props}>
        <span>Fill</span>
        <input value={color} onChange={handleChangeColor}/>
      </div>
    </PropertiesItem>
  );
}

interface IShadowPropertiesProps {
  shadow: {
    offsetX: number,
    offsetY: number,
    blur: number,
    fill: string
  }
}

function ShadowProperties(props: IShadowPropertiesProps) {
  const dispatch = useDispatch();
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [blur, setBlur] = useState(0);
  const [color, setColor] = useState('');

  useEffect(() => setOffsetX(props.shadow.offsetX), [props.shadow.offsetX]);
  useEffect(() => setOffsetY(props.shadow.offsetY), [props.shadow.offsetY]);
  useEffect(() => setColor(props.shadow.fill), [props.shadow.fill]);
  useEffect(() => setBlur(props.shadow.blur), [props.shadow.blur]);

  const handleChangeOffsetX = (e: any) => {
    const value = +e.target.value;
    setOffsetX(value);
    dispatch(changeComponentShadow(color, blur, value, offsetY));
  };

  const handleChangeOffsetY = (e: any) => {
    const value = +e.target.value;
    setOffsetY(value);
    dispatch(changeComponentShadow(color, blur, offsetX, value));
  };

  const handleChangeBlur = (e: any) => {
    const value = +e.target.value;
    setBlur(value);
    dispatch(changeComponentShadow(color, value, offsetX, offsetY));
  };

  const handleChangeColor = (e: any) => {
    const value = e.target.value;
    setColor(value);
    dispatch(changeComponentShadow(value, blur, offsetX, offsetY));
  };

  return (
    <PropertiesItem name="SHADOW">
      <div className={style.shadow_offset_props}>
        <div>
          <span>X</span>
          <input value={offsetX} onChange={handleChangeOffsetX}/>
        </div>
        <div>
          <span>Y</span>
          <input value={offsetY} onChange={handleChangeOffsetY}/>
        </div>
      </div>
      <div className={style.shadow_blur_props}>
        <span>Blur</span>
        <input value={blur} onChange={handleChangeBlur}/>
      </div>
      <div className={style.shadow_color_props}>
        <span>Fill</span>
        <input value={color} onChange={handleChangeColor}/>
      </div>
    </PropertiesItem>
  );
}

interface ITextPropertiesProps {
  text: {
    fill: string,
    text: string
  }
}

function TextProperties(props: ITextPropertiesProps) {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const [color, setColor] = useState('');

  useEffect(() => setText(props.text.text), [props.text.text]);
  useEffect(() => setColor(props.text.fill), [props.text.fill]);

  const handleChangeText = (e: any) => {
    const value = e.target.value;
    setText(value);
    dispatch(changeComponentText(color, value));
  };

  const handleChangeColor = (e: any) => {
    const value = e.target.value;
    setColor(value);
    dispatch(changeComponentText(value, text));
  };

  return (
    <PropertiesItem name="TEXT">
      <div className={style.text_props}>
        <span>Text</span>
        <input value={text} onChange={handleChangeText}/>
      </div>
      <div className={style.text_color_props}>
        <span>Fill</span>
        <input value={color} onChange={handleChangeColor}/>
      </div>
    </PropertiesItem>
  );
}

interface IImagePropertiesProps {

}

function ImageProperties(props: IImagePropertiesProps) {
  return (
    <PropertiesItem name="IMAGE">
      <div className={style.image_src_props}>
        <span>Image</span>
        <input/>
      </div>
    </PropertiesItem>
  );
}

export interface IPropertiesPanelProps {

}

export default function PropertiesPanel(props: IPropertiesPanelProps) {
  const cpnState = useSelector((state: IStoreState) => state.component);
  const cpnProps = cpnState.props;

  return (
    <div className={style.properties_panel}>
      <div className={style.panel_content}>
        <h3>{cpnState.name}</h3>
        <div className={style.component_properties}>
          <BasicProperties position={cpnProps.position} size={cpnProps.size}/>
          {cpnProps.background && <BackgroundProperties background={cpnProps.background}/>}
          {cpnProps.border && <BorderProperties border={cpnProps.border}/>}
          {cpnProps.shadow && <ShadowProperties shadow={cpnProps.shadow}/>}
          {cpnProps.text && <TextProperties text={cpnProps.text}/>}
          {cpnProps.image && <ImageProperties/> }
        </div>
      </div>
      <div className={style.status_bar}>

      </div>
    </div>
  );
}

interface IPropertiesFoldProps {
  name: string,
  children: ReactNode[] | ReactNode
}

function PropertiesItem(props: IPropertiesFoldProps) {
  return (
    <div className={style.properties_item}>
      <button>{props.name}</button>
      <div className={style.item_content}>
        {props.children}
      </div>
    </div>
  );
}
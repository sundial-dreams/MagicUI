import React, { ChangeEvent, ReactNode, useEffect, useRef, useState } from 'react';
import { cls } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { SketchPicker } from 'react-color';
import { IStoreState } from '../../store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCheck} from '@fortawesome/free-solid-svg-icons';
import {
  changeComponentBackground,
  changeComponentBorder, changeComponentImage,
  changeComponentShadow,
  changeComponentText
} from '../../actions/webglEditor';

// @ts-ignore
import style from './PropertiesPanel.scss';

const { round } = Math;


const useShowPicker = (value = false): [boolean, () => void, React.MutableRefObject<any>, () => void] => {
  const [showPicker, setShowPicker] = useState(value);
  const pickerRef = useRef(null);
  const toggleShowPicker = () => setShowPicker(showPicker => !showPicker);
  let flag = true;
  const hidePicker = () => {
    if (flag) {
      setShowPicker(false);
    }
    flag = true;
  }

  useEffect(() => {
    const picker = pickerRef.current as unknown as HTMLElement;
    picker.addEventListener('click', e => {
      flag = false;
    }, false);
    document.body.addEventListener('click', hidePicker, false);

    return () => {
      document.body.removeEventListener('click', hidePicker, false);
    };
  }, []);
  return [showPicker, toggleShowPicker, pickerRef, hidePicker];
};

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
  const [showPicker, toggleShowPicker, pickerRef] = useShowPicker(false);
  useEffect(() => setColor(props.background.fill), [props.background.fill]);
  useEffect(() => setOpacity(props.background.opacity), [props.background.opacity]);
  const handleChangeColor = (e: any) => {
    setColor(e.hex);
    dispatch(changeComponentBackground(e.hex, props.background.opacity));
  };
  const handleChangeOpacity = (e: any) => {
    setOpacity(+e.target.value);
    dispatch(changeComponentBackground(props.background.fill, +e.target.value));
  };

  return (
    <PropertiesItem name="BACKGROUND">
      <div className={style.bg_color_props}>
        <span>Fill</span>
        <input value={color} onClick={() => toggleShowPicker()}/>
        <div className={cls(style.bg_color_picker, showPicker && style.show)} ref={pickerRef}>
          <SketchPicker color={color} onChange={handleChangeColor}/>
        </div>
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
  const [showPicker, toggleShowPicker, pickerRef] = useShowPicker(false);

  useEffect(() => setWidth(props.border.width), [props.border.width]);
  useEffect(() => setRadius(props.border.radius), [props.border.radius]);
  useEffect(() => setColor(props.border.fill), [props.border.fill]);

  const handleChangeColor = (e: any) => {
    setColor(e.hex);
    dispatch(changeComponentBorder(e.hex, width, radius));
  };

  const handleChangeWidth = (e: any) => {
    setWidth(e.target.value);
    dispatch(changeComponentBorder(color, +e.target.value, radius));
  };

  const handleChangeRadius = (e: any) => {
    setRadius(e.target.value);
    dispatch(changeComponentBorder(color, width, +e.target.value));
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
        <input value={color} onClick={toggleShowPicker}/>
        <div className={cls(style.border_color_picker, showPicker && style.show)} ref={pickerRef}>
          <SketchPicker color={color} onChange={handleChangeColor}/>
        </div>
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
  const [showPicker, toggleShowPicker, pickerRef] = useShowPicker(false);

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
    const value = e.hex;
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
        <input value={color} onClick={toggleShowPicker}/>
        <div className={cls(style.shadow_color_picker, showPicker && style.show)} ref={pickerRef}>
          <SketchPicker color={color} onChange={handleChangeColor}/>
        </div>
      </div>
    </PropertiesItem>
  );
}

interface ITextPropertiesProps {
  text: {
    fill: string,
    text: string,
    fontSize: number
  }
}

function TextProperties(props: ITextPropertiesProps) {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const [color, setColor] = useState('');
  const [fontSize, setFontSize] = useState(0);
  const [showPicker, toggleShowPicker, pickerRef] = useShowPicker(false);

  useEffect(() => setText(props.text.text), [props.text.text]);
  useEffect(() => setColor(props.text.fill), [props.text.fill]);
  useEffect(() => setFontSize(props.text.fontSize), [props.text.fontSize]);

  const handleChangeText = (e: any) => {
    const value = e.target.value;
    setText(value);
    dispatch(changeComponentText(color, value, fontSize));
  };

  const handleChangeFontSize = (e: any) => {
    const value = e.target.value;
    setFontSize(value);
    dispatch(changeComponentText(color, text, value));
  };

  const handleChangeColor = (e: any) => {
    const value = e.hex;
    setColor(value);
    dispatch(changeComponentText(value, text, fontSize));
  };

  return (
    <PropertiesItem name="TEXT">
      <div className={style.text_props}>
        <span>Text</span>
        <input value={text} onChange={handleChangeText}/>
      </div>
      <div className={style.text_font_size_props}>
        <span>Size</span>
        <input value={fontSize} onChange={handleChangeFontSize}/>
      </div>
      <div className={style.text_color_props}>
        <span>Fill</span>
        <input value={color} onClick={toggleShowPicker}/>
        <div className={cls(style.text_color_picker, showPicker && style.show)} ref={pickerRef}>
          <SketchPicker color={color} onChange={handleChangeColor}/>
        </div>
      </div>
    </PropertiesItem>
  );
}

interface IImagePropertiesProps {
  image: {
    src: string
  }
}

function ImageProperties(props: IImagePropertiesProps) {
  const dispatch = useDispatch();
  const [src, setSrc] = useState('');
  const [showPicker, toggleShowPicker, pickerRef, hidePicker] = useShowPicker(false);
  useEffect(() => setSrc(props.image.src), [props.image.src]);
  const handleChangeSrc = (e: any) => {
    const value = e.target.value;
    setSrc(value);
  };

  const handleConfirmSrc = () => {
    console.log('click src');
    dispatch(changeComponentImage(src));
    hidePicker();
  };

  return (
    <PropertiesItem name="IMAGE">
      <div className={style.image_src_props}>
        <span>src</span>
        <input onClick={toggleShowPicker} value={src}/>
        <div className={cls(style.image_src_card, showPicker && style.show)} ref={pickerRef}>
          <input onChange={handleChangeSrc} value={src}/>
          <button onClick={handleConfirmSrc}>
            OK
          </button>
        </div>
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
        <h3>{cpnState.name.split('_').join(' ')}</h3>
        <div className={style.component_properties}>
          <BasicProperties position={cpnProps.position} size={cpnProps.size}/>
          {cpnProps.background && <BackgroundProperties background={cpnProps.background}/>}
          {cpnProps.border && <BorderProperties border={cpnProps.border}/>}
          {cpnProps.shadow && <ShadowProperties shadow={cpnProps.shadow}/>}
          {cpnProps.text && <TextProperties text={cpnProps.text}/>}
          {cpnProps.image && <ImageProperties image={cpnProps.image}/>}
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
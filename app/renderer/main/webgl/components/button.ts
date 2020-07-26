import WebGLComponent, { TBackground, TBorder, TShadow, TSize, TText, TypeOrUndefined } from './components';
import Konva from 'konva';
import { COMPONENT_TYPES, TYPES } from '../../utils/constants';

export class WebGLButton extends WebGLComponent {
  private readonly _rect: Konva.Rect;
  private readonly _text: Konva.Text;

  constructor(position: { x: number, y: number }) {
    super(position);
    this.id = 'button-' + Date.now();
    this.type = TYPES.BUTTON;
    this.name = COMPONENT_TYPES.BUTTON.CUSTOM_BUTTON;
    this.isRawComponent = true;
    this._text = new Konva.Text({
      text: 'Button',
      fontSize: 12,
      fill: 'white',
      width: 100,
      padding: 10,
      align: 'center',
      verticalAlign: 'center'
    });

    this._rect = new Konva.Rect({
      width: this._text.width(),
      height: this._text.height(),
      fill: '#FF5370',
      cornerRadius: 2,
      shadowColor: 'blue',
      shadowOpacity: 0.2,
      shadowBlur: 5,
      shadowOffset: { x: 0, y: 0 }
    });


    this.group.add(this._rect);
    this.group.add(this._text);
    this.group.on('transform', () => {
      this._rect.setAttrs({
        width: this._rect.width() * this.group.scaleX(),
        height: this._rect.height() * this.group.scaleY()
      });
      this._text.setAttrs({
        width: this._text.width() * this.group.scaleX(),
        height: this._text.height() * this.group.scaleY()
      });
      this.group.setAttrs({
        scaleX: 1,
        scaleY: 1
      });
    });

    this.configGroup({
      id: this.id
    });
    this.configTransformer({
      node: this.group as any,
      boundBoxFunc(oldBox, newBox) {
        newBox.width = Math.max(100, newBox.width);
        newBox.height = Math.max(28, newBox.height);
        return newBox;
      }
    });
  }

  set size(size: TSize) {
    this._rect.setSize(size);
    super.setSize(size);
  }

  setSize(size: { width: number; height: number }) {
    this._rect.setSize(size);
    super.setSize(size);
  }

  set shadow(shadow: TypeOrUndefined<TShadow>) {
    if (shadow) {
      this._rect.shadowBlur(shadow.blur);
      this._rect.shadowOffsetY(shadow.offsetY);
      this._rect.shadowOffsetX(shadow.offsetX);
      this._rect.shadowColor(shadow.fill);
    }
  }

  get shadow(): TypeOrUndefined<TShadow> {
    return {
      offsetX: this._rect.shadowOffset().x,
      offsetY: this._rect.shadowOffset().y,
      blur: this._rect.shadowBlur(),
      fill: this._rect.shadowColor()
    };
  }

  getShadowProps() {
    return {
      offsetX: this._rect.shadowOffset().x,
      offsetY: this._rect.shadowOffset().y,
      blur: this._rect.shadowBlur(),
      fill: this._rect.shadowColor()
    };
  }

  setShadowProps(shadow: { offsetX: number; offsetY: number; blur: number; fill: string }) {
    this._rect.shadowBlur(shadow.blur);
    this._rect.shadowOffsetY(shadow.offsetY);
    this._rect.shadowOffsetX(shadow.offsetX);
    this._rect.shadowColor(shadow.fill);
  }

  set background(background: TypeOrUndefined<TBackground>) {
    if (background) {
      this._rect.opacity(background.opacity);
      this._rect.fill(background.fill);
    }
  }

  get background(): TypeOrUndefined<TBackground> {
    return {
      opacity: this._rect.opacity(),
      fill: this._rect.fill()
    };
  }

  getBackgroundProps() {
    return {
      opacity: this._rect.opacity(),
      fill: this._rect.fill()
    };
  }

  setBackgroundProps(background: { opacity: number; fill: string }) {
    this._rect.opacity(background.opacity);
    this._rect.fill(background.fill);
  }

  set border(border: TypeOrUndefined<TBorder>) {
    if (border) {
      this._rect.strokeWidth(border.width);
      this._rect.stroke(border.fill);
      this._rect.cornerRadius(border.radius);
    }
  }

  get border(): TypeOrUndefined<TBorder> {
    return {
      width: this._rect.strokeWidth(),
      fill: this._rect.stroke(),
      radius: this._rect.cornerRadius()
    };
  }

  getBorderProps() {
    return {
      width: this._rect.strokeWidth(),
      fill: this._rect.stroke(),
      radius: this._rect.cornerRadius()
    };
  }

  setBorderProps(border: { width: number; fill: string; radius: number }) {
    this._rect.strokeWidth(border.width);
    this._rect.stroke(border.fill);
    this._rect.cornerRadius(border.radius);
  }

  get text(): TypeOrUndefined<TText> {
    return {
      text: this._text.text(),
      fill: this._text.fill()
    };
  }

  set text(text: TypeOrUndefined<TText>) {
    if (!text) return;
    this._text.text(text.text);
    this._text.fill(text.fill);
  }

  getTextProps() {
    return {
      text: this._text.text(),
      fill: this._text.fill()
    };
  }

  setTextProps(text: { text: string; fill: string }) {
    this._text.text(text.text);
    this._text.fill(text.fill);
  }
}
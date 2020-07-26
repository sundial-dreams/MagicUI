import WebGLComponent, { TBackground, TBorder, TShadow, TSize, TText, TypeOrUndefined } from './components';
import Konva from 'konva';
import { COMPONENT_TYPES, TYPES } from '../../utils/constants';

export class WebGLText extends WebGLComponent {
  private readonly _text: Konva.Text;

  constructor(position: { x: number, y: number }) {
    super(position);

    this.id = 'text-' + Date.now();
    this.type = TYPES.TEXT;
    this.name = COMPONENT_TYPES.TEXT.CUSTOM_TEXT;
    this.isRawComponent = true;
    this._text = new Konva.Text({
      fontSize: 12,
      text: 'some text here',
      fill: 'black'
    });

    this.group.add(this._text);

    this.onTransform(e => {
      this._text.setAttrs({
        width: this._text.width() * this.group.scaleX()
      });
      this.group.setAttrs({scaleX: 1});
    });

    this.configGroup({id: this.id});

    this.configTransformer({
      node: this.group as any,
      enabledAnchors: [
        'middle-left', 'middle-right'
      ],
      boundBoxFunc(oldBox, newBox) {
        newBox.width = Math.max(30, newBox.width);
        return newBox;
      }
    });
  }

  set size(size: TSize) {
    this._text.setSize(size);
    super.setSize(size);
  }

  setSize(size: { width: number; height: number }) {
    this._text.setSize(size);
    super.setSize(size);
  }

  get text(): TypeOrUndefined<TText> {
    return {
      text: this._text.text(),
      fill: this._text.fill(),
      fontSize: this._text.fontSize()
    };
  }

  set text(text: TypeOrUndefined<TText>) {
    if (text) {
      this._text.text(text.text);
      this._text.fill(text.fill);
      this._text.fontSize(text.fontSize);
    }
  }

  getTextProps() {
    return {
      text: this._text.text(),
      fill: this._text.fill(),
      fontSize: this._text.fontSize()
    };
  }

  setTextProps(text: TypeOrUndefined<TText>) {
    if (!text) return;
    this._text.text(text.text);
    this._text.fill(text.fill);
    this._text.fontSize(text.fontSize);
  }
}

export class WebGLLabel extends WebGLComponent {
  private readonly label: Konva.Label;
  private readonly _text: Konva.Text;
  private readonly tag: Konva.Tag;

  constructor(position: { x: number, y: number }) {
    super(position);
    this.id = 'label-' + Date.now();
    this.type = TYPES.TEXT;
    this.name = COMPONENT_TYPES.TEXT.LABEL;
    this.isRawComponent = true;
    this.label = new Konva.Label({opacity: 0.75});
    this.tag = new Konva.Tag({fill: 'yellow'});
    this._text = new Konva.Text({
      text: 'Some label...',
      fontSize: 12,
      padding: 5,
      fill: 'black'
    });
    this.label.add(this.tag);

    this.label.add(this._text);

    this.group.add(this.label);

    this.configGroup({id: this.id});
    this.configTransformer({
      node: this.group as any,
      enabledAnchors: [
        'top-left', 'top-right',
        'bottom-left', 'bottom-right'
      ],
      boundBoxFunc(oldBox, newBox) {
        return newBox;
      }
    });
  }

  get text(): TypeOrUndefined<TText> {
    return {
      text: this._text.text(),
      fill: this._text.fill(),
      fontSize: this._text.fontSize()
    };
  }

  set text(text: TypeOrUndefined<TText>) {
    if (text) {
      this._text.text(text.text);
      this._text.fill(text.fill);
      this._text.fontSize(text.fontSize);
    }
  }

  getTextProps() {
    return {
      text: this._text.text(),
      fill: this._text.fill(),
      fontSize: this._text.fontSize()
    };
  }

  setTextProps(text: TText) {
    this._text.text(text.text);
    this._text.fill(text.fill);
    this._text.fontSize(text.fontSize);
  }

  get background(): TypeOrUndefined<TBackground> {
    return {
      opacity: this.label.opacity(),
      fill: this.tag.fill()
    };
  }

  set background(background: TypeOrUndefined<TBackground>) {
    if (background) {
      this.label.opacity(background.opacity);
      this.tag.fill(background.fill);
    }
  }

  getBackgroundProps(): { opacity: number; fill: string } | undefined {
    return {
      opacity: this.label.opacity(),
      fill: this.tag.fill()
    };
  }

  setBackgroundProps(background: { opacity: number; fill: string }) {
    this.label.opacity(background.opacity);
    this.tag.fill(background.fill);
  }

  get border(): TypeOrUndefined<TBorder> {
    return {
      width: this.tag.strokeWidth(),
      fill: this.tag.stroke(),
      radius: this.tag.cornerRadius()
    };
  }

  set border(border: TypeOrUndefined<TBorder>) {
    if (border) {
      this.tag.strokeWidth(border.width);
      this.tag.stroke(border.fill);
      this.tag.cornerRadius(border.radius as number);
    }
  }

  getBorderProps(): { width: number; fill: string; radius: number | number[] } | undefined {
    return {
      width: this.tag.strokeWidth(),
      fill: this.tag.stroke(),
      radius: this.tag.cornerRadius()
    };
  }

  setBorderProps(border: { width: number; fill: string; radius: number }) {
    this.tag.strokeWidth(border.width);
    this.tag.stroke(border.fill);
    this.tag.cornerRadius(border.radius);
  }

  get shadow(): TypeOrUndefined<TShadow> {
    return {
      offsetY: this.tag.shadowOffsetY(),
      offsetX: this.tag.shadowOffsetX(),
      blur: this.tag.shadowBlur(),
      fill: this.tag.shadowColor()
    };
  }

  set shadow(shadow: TypeOrUndefined<TShadow>) {
    if (shadow) {
      this.tag.shadowOffsetY(shadow.offsetY);
      this.tag.shadowOffsetX(shadow.offsetX);
      this.tag.shadowBlur(shadow.blur);
      this.tag.shadowColor(shadow.fill);
    }
  }

  getShadowProps(): { offsetX: number; offsetY: number; blur: number; fill: string } | undefined {
    return {
      offsetY: this.tag.shadowOffsetY(),
      offsetX: this.tag.shadowOffsetX(),
      blur: this.tag.shadowBlur(),
      fill: this.tag.shadowColor()
    };
  }

  setShadowProps(shadow: { offsetX: number; offsetY: number; blur: number; fill: string }) {
    this.tag.shadowOffsetY(shadow.offsetY);
    this.tag.shadowOffsetX(shadow.offsetX);
    this.tag.shadowBlur(shadow.blur);
    this.tag.shadowColor(shadow.fill);
  }
}
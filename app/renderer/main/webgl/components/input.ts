import WebGLComponent, { TBackground, TBorder, TShadow, TSize, TypeOrUndefined } from './components';
import Konva from 'konva';
import { COMPONENT_TYPES, TYPES } from '../../utils/constants';

export class WebGLInput extends WebGLComponent {
  private readonly rect: Konva.Rect;
  constructor(position: {x: number, y: number}) {
    super(position);
    this.id = 'input-' + Date.now();
    this.type = TYPES.INPUT;
    this.name = COMPONENT_TYPES.INPUT.CUSTOM_INPUT;
    this.isRawComponent = true;

    this.rect = new Konva.Rect({
      width: 200,
      height: 28,
      fill: 'white',
      stroke: '#ddd',
      strokeWidth: 1,
      shadowBlur: 2,
      cornerRadius: 5
    });
    this.group.add(this.rect);

    this.onTransform(e => {
      this.rect.setAttrs({
        width: this.rect.width() * this.group.scaleX(),
        height: this.rect.height() * this.group.scaleY()
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
        newBox.width = Math.max(120, newBox.width);
        newBox.height = Math.max(28, newBox.height);
        return newBox;
      }
    });
  }

  set size(size: TSize) {
    this.rect.setSize(size);
    super.setSize(size);
  }

  setSize(size: { width: number; height: number }) {
    this.rect.setSize(size);
    super.setSize(size);
  }

  get shadow(): TypeOrUndefined<TShadow> {
    return {
      offsetX: this.rect.shadowOffset().x,
      offsetY: this.rect.shadowOffset().y,
      blur: this.rect.shadowBlur(),
      fill: this.rect.shadowColor()
    };
  }

  set shadow(shadow: TypeOrUndefined<TShadow>) {
    if (shadow) {
      this.rect.shadowBlur(shadow.blur);
      this.rect.shadowOffsetY(shadow.offsetY);
      this.rect.shadowOffsetX(shadow.offsetX);
      this.rect.shadowColor(shadow.fill);
    }
  }

  getShadowProps() {
    return {
      offsetX: this.rect.shadowOffset().x,
      offsetY: this.rect.shadowOffset().y,
      blur: this.rect.shadowBlur(),
      fill: this.rect.shadowColor()
    };
  }

  setShadowProps(shadow: { offsetX: number; offsetY: number; blur: number; fill: string }) {
    this.rect.shadowBlur(shadow.blur);
    this.rect.shadowOffsetY(shadow.offsetY);
    this.rect.shadowOffsetX(shadow.offsetX);
    this.rect.shadowColor(shadow.fill);
  }

  get background(): TypeOrUndefined<TBackground> {
    return {
      opacity: this.rect.opacity(),
      fill: this.rect.fill()
    };
  }

  set background(background: TypeOrUndefined<TBackground>) {
    if (background) {
      this.rect.opacity(background.opacity);
      this.rect.fill(background.fill);
    }
  }

  getBackgroundProps() {
    return {
      opacity: this.rect.opacity(),
      fill: this.rect.fill()
    };
  }

  setBackgroundProps(background: { opacity: number; fill: string }) {
    this.rect.opacity(background.opacity);
    this.rect.fill(background.fill);
  }

  get border(): TypeOrUndefined<TBorder> {
    return {
      width: this.rect.strokeWidth(),
      fill: this.rect.stroke(),
      radius: this.rect.cornerRadius()
    };
  }

  set border(border: TypeOrUndefined<TBorder>) {
    if (border) {
      this.rect.strokeWidth(border.width);
      this.rect.stroke(border.fill);
      this.rect.cornerRadius(border.radius);
    }
  }

  getBorderProps() {
    return {
      width: this.rect.strokeWidth(),
      fill: this.rect.stroke(),
      radius: this.rect.cornerRadius()
    };
  }

  setBorderProps(border: { width: number; fill: string; radius: number }) {
    this.rect.strokeWidth(border.width);
    this.rect.stroke(border.fill);
    this.rect.cornerRadius(border.radius);
  }
}
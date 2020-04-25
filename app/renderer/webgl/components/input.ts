import WebGLComponent from './components';
import Konva from 'konva';
import {COMPONENT_TYPES} from '../../utils/constants';

export class WebGLInput extends WebGLComponent {
  private readonly rect: Konva.Rect;
  constructor(position: {x: number, y: number}) {
    super(position);
    this.id = 'input-' + Date.now();
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
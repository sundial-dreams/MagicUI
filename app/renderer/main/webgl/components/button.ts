import WebGLComponent from './components';
import Konva from 'konva';
import { COMPONENT_TYPES, TYPES } from '../../utils/constants';

export class WebGLButton extends WebGLComponent {
  private readonly rect: Konva.Rect;
  private readonly text: Konva.Text;

  constructor(position: { x: number, y: number }) {
    super(position);
    this.id = 'button-' + Date.now();
    this.type = TYPES.BUTTON;
    this.name = COMPONENT_TYPES.BUTTON.CUSTOM_BUTTON;
    this.isRawComponent = true;
    this.text = new Konva.Text({
      text: 'Button',
      fontSize: 12,
      fill: 'white',
      width: 100,
      padding: 10,
      align: 'center',
      verticalAlign: 'center'
    });

    this.rect = new Konva.Rect({
      width: this.text.width(),
      height: this.text.height(),
      fill: '#FF5370',
      cornerRadius: 2,
      shadowColor: 'blue',
      shadowOpacity: 0.2,
      shadowBlur: 5,
      shadowOffset: {x: 0, y: 0}
    });


    this.group.add(this.rect);
    this.group.add(this.text);
    this.group.on('transform', () => {
      this.rect.setAttrs({
        width: this.rect.width() * this.group.scaleX(),
        height: this.rect.height() * this.group.scaleY()
      });
      this.text.setAttrs({
        width: this.text.width() * this.group.scaleX(),
        height: this.text.height() * this.group.scaleY()
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

  setSize(size: { width: number; height: number }) {
    this.rect.setSize(size);
    super.setSize(size);
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

  getTextProps() {
    return {
      text: this.text.text(),
      fill: this.text.fill()
    };
  }

  setTextProps(text: { text: string; fill: string }) {
    this.text.text(text.text);
    this.text.fill(text.fill);
  }
}
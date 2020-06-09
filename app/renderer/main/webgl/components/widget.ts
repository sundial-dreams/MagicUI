import WebGLComponent from './components';
import Konva from 'konva';
import { COMPONENT_TYPES, TYPES } from '../../utils/constants';

export class WebGLPCWidget extends WebGLComponent {
  private readonly rect: Konva.Rect;
  constructor(position: { x: number, y: number }) {
    super(position);
    this.id = 'widget-pc_widget' + Date.now();
    this.type = TYPES.WIDGET;
    this.name = COMPONENT_TYPES.WIDGET.PC_WIDGET;

    this.rect = new Konva.Rect({
      width: 650,
      height: 450,
      fill: 'white',
      shadowColor: 'black',
      shadowBlur: 10,
      shadowOffset: {x: 0, y: 0},
      shadowOpacity: 0.2,
      cornerRadius: 4
    });


    const ctrBtnConfigs = [
      {fill: 'green', x: 10, y: 10, radius: 5},
      {fill: 'red', x: 25, y: 10, radius: 5},
      {fill: 'yellow', x: 40, y: 10, radius: 5}
    ];
    this.group.add(this.rect);

    ctrBtnConfigs.forEach(v => {
      this.group.add(new Konva.Circle({
        ...v
      }));
    });


    this.group.on('transform', e => {
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
      enabledAnchors: [
        'top-left', 'top-right',
        'bottom-left', 'bottom-right'
      ],
      rotateEnabled: false,
      boundBoxFunc(oldBox, newBox) {
        newBox.width = Math.max(650, newBox.width);
        newBox.height = Math.max(450, newBox.height);
        return newBox;
      }
    });
  }

  setSize(size: { width: number; height: number }) {
    this.rect.setSize(size);
    super.setSize(size);
  }

  getShadowProps(): { offsetX: number; offsetY: number; blur: number; fill: string } {
    return {
      offsetX: this.rect.shadowOffsetX(),
      offsetY: this.rect.shadowOffsetY(),
      fill: this.rect.shadowColor(),
      blur: this.rect.shadowBlur()
    }
  }

  setShadowProps(shadow: {offsetX: number, offsetY: number, blur: number, fill: string}) {
    this.rect.shadowOffsetX(shadow.offsetX);
    this.rect.shadowOffsetY(shadow.offsetY);
    this.rect.shadowBlur(shadow.blur);
    this.rect.shadowColor(shadow.fill);
  }

  getBorderProps(): { width: number; fill: string; radius: number | number[] } {
    return {
      width: this.rect.strokeWidth(),
      fill: this.rect.stroke(),
      radius: this.rect.cornerRadius()
    }
  }

  setBorderProps(border: { width: number; fill: string; radius: number }) {
    this.rect.strokeWidth(border.width);
    this.rect.stroke(border.fill);
    this.rect.cornerRadius(border.radius);
  }

  getBackgroundProps(): { opacity: number; fill: string } {
    return {
      opacity: this.rect.opacity(),
      fill: this.rect.fill()
    }
  }

  setBackgroundProps(background: {opacity: number, fill: string}) {
    this.rect.fill(background.fill);
    this.rect.opacity(background.opacity);
  }



}

export class WebGLMobileWidget extends WebGLComponent {
  private readonly rect: Konva.Rect;
  private readonly titleBar: Konva.Rect;
  constructor(position: { x: number, y: number }) {
    super(position);
    this.id = 'widget-mobile_widget' + Date.now();
    this.type = TYPES.WIDGET;
    this.name = COMPONENT_TYPES.WIDGET.MOBILE_WIDGET;

    this.rect = new Konva.Rect({
      width: 300,
      height: 450,
      fill: 'white',
      shadowColor: 'black',
      shadowBlur: 10,
      shadowOffset: {x: 0, y: 0},
      shadowOpacity: 0.2,
      cornerRadius: 2
    });

    this.titleBar = new Konva.Rect({
      width: this.rect.width(),
      height: 20,
      fill: '#cccccc',
      cornerRadius: [2, 2, 0, 0],
      x: 0,
      y: 0
    });
    this.group.add(this.rect);
    this.group.add(this.titleBar);

    this.group.on('transform', e => {
      this.rect.setAttrs({
        width: this.rect.width() * this.group.scaleX(),
        height: this.rect.height() * this.group.scaleY()
      });
      this.titleBar.setAttrs({
        width: this.titleBar.width() * this.group.scaleX(),
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
      enabledAnchors: [
        'top-left', 'top-right',
        'bottom-left', 'bottom-right'
      ],
      rotateEnabled: false,
      boundBoxFunc(oldBox, newBox) {
        newBox.width = Math.max(300, newBox.width);
        newBox.height = Math.max(450, newBox.height);
        return newBox;
      }
    });
  }

  setSize(size: { width: number; height: number }) {
    this.rect.setSize(size);
    this.titleBar.width(size.width);
    super.setSize(size);
  }

  getShadowProps(): { offsetX: number; offsetY: number; blur: number; fill: string } {
    return {
      offsetX: this.rect.shadowOffsetX(),
      offsetY: this.rect.shadowOffsetY(),
      fill: this.rect.shadowColor(),
      blur: this.rect.shadowBlur()
    }
  }

  setShadowProps(shadow: {offsetX: number, offsetY: number, blur: number, fill: string}) {
    this.rect.shadowOffsetX(shadow.offsetX);
    this.rect.shadowOffsetY(shadow.offsetY);
    this.rect.shadowBlur(shadow.blur);
    this.rect.shadowColor(shadow.fill);
  }

  getBorderProps(): { width: number; fill: string; radius: number | number[] } {
    return {
      width: this.rect.strokeWidth(),
      fill: this.rect.stroke(),
      radius: this.rect.cornerRadius()
    }
  }

  setBorderProps(border: { width: number; fill: string; radius: number }) {
    this.rect.strokeWidth(border.width);
    this.rect.stroke(border.fill);
    this.rect.cornerRadius(border.radius);
  }

  getBackgroundProps(): { opacity: number; fill: string } {
    return {
      opacity: this.rect.opacity(),
      fill: this.rect.fill()
    }
  }

  setBackgroundProps(background: {opacity: number, fill: string}) {
    this.rect.fill(background.fill);
    this.rect.opacity(background.opacity);
  }

}

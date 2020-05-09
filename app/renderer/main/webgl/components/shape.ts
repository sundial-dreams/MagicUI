import WebGLComponent from './components';
import Konva from 'konva';
import { COMPONENT_TYPES, TYPES } from '../../utils/constants';

export class WebGLRect extends WebGLComponent {
  private readonly rect: Konva.Rect;

  constructor(position: { x: number, y: number }) {
    super(position);
    this.id = 'rect-' + Date.now();
    this.type = TYPES.SHAPE;
    this.name = COMPONENT_TYPES.SHAPE.RECT;
    this.rect = new Konva.Rect({
      width: 100,
      height: 100,
      fill: 'white',
      stroke: '#dddddd',
      strokeWidth: 2,
      cornerRadius: 5
    });

    this.group.add(this.rect);
    this.group.on('transform', () => {
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
        newBox.width = Math.max(50, newBox.width);
        newBox.height = Math.max(50, newBox.height);
        return newBox;
      }
    });
  }

  setSize(size: { width: number; height: number }) {
    this.rect.setSize(size);
    super.setSize(size);
  }

  getBorderProps(): { width: number; fill: string; radius: number | number[] } | undefined {
    return {
      width: this.rect.strokeWidth(),
      fill: this.rect.stroke(),
      radius: this.rect.cornerRadius()
    };
  }

  setBorderProps(border: { width: number; fill: string; radius: number }) {
    this.rect.stroke(border.fill);
    this.rect.strokeWidth(border.width);
    this.rect.cornerRadius(border.radius);
  }

  getBackgroundProps(): { opacity: number; fill: string } | undefined {
    return {
      fill: this.rect.fill(),
      opacity: this.rect.opacity()
    };
  }

  setBackgroundProps(background: { opacity: number; fill: string }) {
    this.rect.fill(background.fill);
    this.rect.opacity(background.opacity);
  }

  getShadowProps(): { offsetX: number; offsetY: number; blur: number; fill: string } | undefined {
    return {
      offsetX: this.rect.shadowOffsetX(),
      offsetY: this.rect.shadowOffsetY(),
      blur: this.rect.shadowBlur(),
      fill: this.rect.shadowColor()
    };
  }

  setShadowProps(shadow: { offsetX: number; offsetY: number; blur: number; fill: string }) {
    this.rect.shadowColor(shadow.fill);
    this.rect.shadowBlur(shadow.blur);
    this.rect.shadowOffsetX(shadow.offsetX);
    this.rect.shadowOffsetY(shadow.offsetY);
  }

}

export class WebGLCircle extends WebGLComponent {
  private readonly circle: Konva.Circle;

  constructor(position: { x: number, y: number }) {
    super(position);
    this.id = 'circle-' + Date.now();
    this.type = TYPES.SHAPE;
    this.name = COMPONENT_TYPES.SHAPE.CIRCLE;
    this.circle = new Konva.Circle({
      radius: 50,
      fill: 'white',
      stroke: '#ddd',
      strokeWidth: 2
    });

    this.group.add(this.circle);

    this.group.on('transform', () => {
      this.circle.setAttrs({
        width: this.circle.width() * this.group.scaleX(),
        height: this.circle.height() * this.group.scaleY()
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
        newBox.width = Math.max(50, newBox.width);
        newBox.height = Math.max(50, newBox.height);
        return newBox;
      },
      enabledAnchors: [
        'top-left', 'top-right',
        'bottom-left', 'bottom-right'
      ],
      rotateEnabled: false
    });
  }
  setSize(size: { width: number; height: number }) {
    this.circle.setSize(size);
    super.setSize(size);
  }

  getBorderProps(): { width: number; fill: string; radius: number | number[] } | undefined {
    return {
      width: this.circle.strokeWidth(),
      fill: this.circle.stroke(),
      radius: 0
    };
  }

  setBorderProps(border: { width: number; fill: string; radius: number }) {
    this.circle.stroke(border.fill);
    this.circle.strokeWidth(border.width);
  }

  getBackgroundProps(): { opacity: number; fill: string } | undefined {
    return {
      fill: this.circle.fill(),
      opacity: this.circle.opacity()
    };
  }

  setBackgroundProps(background: { opacity: number; fill: string }) {
    this.circle.fill(background.fill);
    this.circle.opacity(background.opacity);
  }

  getShadowProps(): { offsetX: number; offsetY: number; blur: number; fill: string } | undefined {
    return {
      offsetX: this.circle.shadowOffsetX(),
      offsetY: this.circle.shadowOffsetY(),
      blur: this.circle.shadowBlur(),
      fill: this.circle.shadowColor()
    };
  }

  setShadowProps(shadow: { offsetX: number; offsetY: number; blur: number; fill: string }) {
    this.circle.shadowColor(shadow.fill);
    this.circle.shadowBlur(shadow.blur);
    this.circle.shadowOffsetX(shadow.offsetX);
    this.circle.shadowOffsetY(shadow.offsetY);
  }

}

export class WebGLEllipse extends WebGLComponent {
  private readonly ellipse: Konva.Ellipse;

  constructor(position: { x: number, y: number }) {
    super(position);
    this.id = 'ellipse-' + Date.now();
    this.type = TYPES.SHAPE;
    this.name = '';
    this.ellipse = new Konva.Ellipse({
      radiusX: 100,
      radiusY: 50,
      stroke: '#ddd',
      fill: 'white',
      strokeWidth: 2
    });

    this.group.add(this.ellipse);

    this.onTransform(e => {
      this.ellipse.setAttrs({
        width: this.ellipse.width() * this.group.scaleX(),
        height: this.ellipse.height() * this.group.scaleY()
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
        newBox.width = Math.max(100, newBox.width);
        newBox.height = Math.max(50, newBox.height);
        return newBox;
      }
    });
  }

  setSize(size: { width: number; height: number }) {
    this.ellipse.setSize(size);
    super.setSize(size);
  }

  getBorderProps(): { width: number; fill: string; radius: number | number[] } | undefined {
    return {
      width: this.ellipse.strokeWidth(),
      fill: this.ellipse.stroke(),
      radius: 0
    };
  }

  setBorderProps(border: { width: number; fill: string; radius: number }) {
    this.ellipse.stroke(border.fill);
    this.ellipse.strokeWidth(border.width);
  }

  getBackgroundProps(): { opacity: number; fill: string } | undefined {
    return {
      fill: this.ellipse.fill(),
      opacity: this.ellipse.opacity()
    };
  }

  setBackgroundProps(background: { opacity: number; fill: string }) {
    this.ellipse.fill(background.fill);
    this.ellipse.opacity(background.opacity);
  }

  getShadowProps(): { offsetX: number; offsetY: number; blur: number; fill: string } | undefined {
    return {
      offsetX: this.ellipse.shadowOffsetX(),
      offsetY: this.ellipse.shadowOffsetY(),
      blur: this.ellipse.shadowBlur(),
      fill: this.ellipse.shadowColor()
    };
  }

  setShadowProps(shadow: { offsetX: number; offsetY: number; blur: number; fill: string }) {
    this.ellipse.shadowColor(shadow.fill);
    this.ellipse.shadowBlur(shadow.blur);
    this.ellipse.shadowOffsetX(shadow.offsetX);
    this.ellipse.shadowOffsetY(shadow.offsetY);
  }

}
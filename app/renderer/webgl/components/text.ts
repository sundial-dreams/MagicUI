import WebGLComponent from './components';
import Konva from 'konva';
import {COMPONENT_TYPES} from '../../utils/constants';

export class WebGLText extends WebGLComponent {
  private readonly text: Konva.Text;

  constructor(position: { x: number, y: number }) {
    super(position);

    this.id = 'text-' + Date.now();
    this.name = COMPONENT_TYPES.TEXT.CUSTOM_TEXT;
    this.isRawComponent = true;
    this.text = new Konva.Text({
      fontSize: 12,
      text: 'some text here',
      fill: 'black'
    });

    this.group.add(this.text);

    this.onTransform(e => {
      this.text.setAttrs({
        width: this.text.width() * this.group.scaleX()
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

  getTextProps(): { text: string; fill: string } | undefined {
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

export class WebGLLabel extends WebGLComponent {
  private readonly label: Konva.Label;
  private readonly text: Konva.Text;
  private readonly tag: Konva.Tag;

  constructor(position: { x: number, y: number }) {
    super(position);
    this.id = 'label-' + Date.now();
    this.name = COMPONENT_TYPES.TEXT.LABEL;
    this.isRawComponent = true;
    this.label = new Konva.Label({opacity: 0.75});
    this.tag = new Konva.Tag({fill: 'yellow'});
    this.text = new Konva.Text({
      text: 'Some label...',
      fontSize: 12,
      padding: 5,
      fill: 'black'
    });
    this.label.add(this.tag);

    this.label.add(this.text);

    this.group.add(this.label);

    // this.onTransform(e => {
    //   label.setAttrs({
    //     width: label.width() * this.group.scaleX(),
    //     height: label.height() * this.group.scaleY()
    //   });
    //   this.group.setAttrs({scaleX: 1, scaleY: 1});
    // });
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

  getTextProps(): { text: string; fill: string } | undefined {
    return {
      text: this.text.text(),
      fill: this.text.fill()
    };
  }

  setTextProps(text: { text: string; fill: string }) {
    this.text.text(text.text);
    this.text.fill(text.fill);
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
import WebGLComponent from './components';
import Konva from 'konva';
import {COMPONENT_TYPES} from '../../utils/constants';

export class WebGLImage extends WebGLComponent {
  constructor(position: {x: number, y: number}) {
    super(position);
    this.id = 'image-' + Date.now();
    this.name = COMPONENT_TYPES.IMAGE.CUSTOM_IMAGE;
    this.isRawComponent = true;
    const imageObject = new Image();
    imageObject.src = require('~resources/images/avatar.jpg').default;
    imageObject.onload = () => {
      const image = new Konva.Image({
        image: imageObject,
        width: imageObject.width * 0.1,
        height: imageObject.height * 0.1
      });
      this.group.add(image);
      this.configGroup({
        id: this.id
      });
      this.configTransformer({
        node: this.group as any,
      });
      this.group.getLayer()?.batchDraw();
    };
  }
}
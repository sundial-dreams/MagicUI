import WebGLComponent from './components';
import Konva from 'konva';
import { COMPONENT_TYPES, TYPES } from '../../utils/constants';

export class WebGLImage extends WebGLComponent {
  private src: string;

  constructor(position: { x: number, y: number }, size?: {width: number, height: number}) {
    super(position);
    this.id = 'image-' + Date.now();
    this.type = TYPES.IMAGE;
    this.name = COMPONENT_TYPES.IMAGE.CUSTOM_IMAGE;
    this.isRawComponent = true;
    const imageObject = new Image();
    this.src = imageObject.src = 'http://localhost:9000/image/anime-1.jpeg';
    imageObject.onload = () => {
      const image = new Konva.Image({
        image: imageObject,
        width: size?.width || imageObject.width * 0.5,
        height: size?.height || imageObject.height * 0.5
      });
      this.group.add(image);

      this.configTransformer({
        node: this.group as any
      });
      this.group.getLayer()?.batchDraw();
    };

    this.configGroup({
      id: this.id
    });

  }

  setSize(size: { width: number; height: number }) {
    super.setSize(size);
  }

  setImageProps(image: { src: string }, size?: {width: number, height: number}) {
    const imageObject = new Image();
    this.src = imageObject.src = image.src;
    imageObject.onload = () => {
      const img = new Konva.Image({
        image: imageObject,
        width: size?.width || imageObject.width * 0.5,
        height: size?.height || imageObject.height * 0.5
      });
      this.group.removeChildren();
      this.group.add(img);
      this.configTransformer({
        node: this.group as any
      });
      this.group?.getLayer()?.batchDraw();
    };
  }

  getImageProps(): { src: string } | undefined {
    return {
      src: this.src
    };
  }

}
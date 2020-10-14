import WebGLComponent, { TImage, TSize, TypeOrUndefined } from './components';
import Konva from 'konva';
import { COMPONENT_TYPES, TYPES } from '../../utils/constants';

export class WebGLImage extends WebGLComponent {
  private src: string;

  constructor(position: { x: number, y: number }, size?: { width: number, height: number }) {
    super(position);
    this.id = 'image-' + Date.now();
    this.type = TYPES.IMAGE;
    this.name = COMPONENT_TYPES.IMAGE.CUSTOM_IMAGE;
    this.isRawComponent = true;
    const imageObject = new Image();
    const width = 200;
    this.src = imageObject.src = 'http://localhost:8000/image/anime-1.jpeg';

    imageObject.onload = () => {
      const image = new Konva.Image({
        image: imageObject,
        width: size?.width || width,
        height: size?.height || width / imageObject.width * imageObject.height
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

  set size(size: TSize) {
    super.setSize(size);
  }

  setSize(size: { width: number; height: number }) {
    super.setSize(size);
  }

  set image(image: TypeOrUndefined<TImage>) {
    if (!image) return;
    const imageObject = new Image();
    this.src = imageObject.src = image.src;
    imageObject.onload = () => {
      const img = new Konva.Image({
        image: imageObject,
        width: image.size?.width || imageObject.width * 0.5,
        height: image.size?.height || imageObject.height * 0.5
      });
      this.group.removeChildren();
      this.group.add(img);
      this.configTransformer({
        node: this.group as any
      });
      this.group?.getLayer()?.batchDraw();
    };
  }

  setImageProps(image: { src: string }, size?: { width: number, height: number }, callback?: Function) {
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
      // add callback
      callback && callback();
    };
  }

  get image(): TypeOrUndefined<TImage> {
    return { src: this.src }
  }

  getImageProps(): { src: string } | undefined {
    return {
      src: this.src
    };
  }

}
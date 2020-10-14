import Konva from 'konva';

export type TPosition = { x: number, y: number };
export type TSize = { width: number, height: number };
export type TShadow = { offsetX: number, offsetY: number, blur: number, fill: string };
export type TBorder = { width: number; fill: string; radius: number | number[] };
export type TBackground = { opacity: number, fill: string };
export type TText = { text: string, fill: string, fontSize: number };
export type TImage = { src: string, size?: TSize };
export type TOpacity = { opacity: number, fill: string };

export type TypeOrUndefined<T> = T | undefined;

export default abstract class WebGLComponent implements IWebGLComponentProps, IWebGLComponentEvents {
  protected id: string;
  protected name: string;
  protected type: string;
  protected group: Konva.Group;
  protected transformer: Konva.Transformer;
  protected isRawComponent: boolean;
  protected data: any;
  protected children: Map<string, WebGLComponent>;
  protected parent: WebGLComponent | null;

  protected constructor(position: { x: number, y: number }) {
    this.group = new Konva.Group({
      draggable: true,
      name: 'object',
      ...position
    });

    this.transformer = new Konva.Transformer({
      node: this.group as any,
      rotateEnabled: false,
      id: '__component_transformer'
    });

    this.children = new Map<string, WebGLComponent>();
    this.parent = null;

    this.id = '';
    this.isRawComponent = false;
    this.name = 'component';
    this.type = 'component';
    this.data = {
      position
    };
  }

  protected configGroup(config: Konva.ContainerConfig) {
    this.group.setAttrs({
      id: this.getId(),
      ...config
    });
  }

  protected configTransformer(config: Konva.TransformerConfig) {
    this.transformer.setAttrs({
      ...config
    });
  }

  getId() {
    return this.id;
  }

  getType() {
    return this.type;
  }

  getGroup() {
    return this.group;
  }

  getTransformer() {
    return this.transformer;
  }

  getParent() {
    return this.parent;
  }

  appendChild(component: WebGLComponent) {
    this.children.set(component.getId(), component);
  }

  removeChild(id: string) {
    if (this.children.has(id)) {
      this.children.delete(id);
    }
  }

  getChildren() {
    return this.children;
  }

  onDragMove(callback: (e: Konva.KonvaEventObject<any>) => void) {
    this.getGroup().on('dragmove', callback);
  }

  onTransform(callback: (e: Konva.KonvaEventObject<any>) => void) {
    this.getGroup().on('transform', callback);
  }

  onTransformEnd(callback: (e: Konva.KonvaEventObject<any>) => void) {
    this.getGroup().on('transformend', callback);
  }

  onSelected(callback: (event: Konva.KonvaEventObject<any>) => void) {
    this.getGroup().on('dragstart', (event) => {
      event.cancelBubble = true;
      callback(event);
    });
    this.getGroup().on('click', (event) => {
      event.cancelBubble = true;
      callback(event);
    });
  }

  onDragEnd(callback: (event: Konva.KonvaEventObject<any>) => void) {
    this.getGroup().on('dragend', callback);
  }

  appendToLayer(layer: Konva.Layer) {
    layer.add(this.getGroup());
    layer.add(this.getTransformer());
  }

  hideTransformer() {
    this.getTransformer().hide();
  }

  showTransformer() {
    this.getTransformer().show();
  }

  appendComponent(component: WebGLComponent) {
    if (!this.isRawComponent) {
      const group = component.getGroup();
      const transformer = component.getTransformer();
      group.moveTo(this.getGroup());
      transformer.moveTo(this.getGroup());

      if (component.parent) {
        component.parent.removeChild(component.getId());
      }
      component.parent = this;
      this.appendChild(component);
    }
  }

  moveToTop() {
    this.getGroup().moveToTop();
    this.getTransformer().moveToTop();
  }

  removeFromLayer() {
    this.parent?.removeChild(this.getId());
    this.getGroup().remove();
    this.getTransformer().remove();
  }

  set position(position: TPosition) {
    this.getGroup().setPosition(position);
  }

  get position(): TPosition {
    return this.getGroup().position();
  }

  getPosition(): TPosition {
    return this.getGroup().position();
  }

  setPosition(position: TPosition) {
    this.getGroup().setPosition(position);
  }

  set size(size: TSize) {
    this.getGroup().setSize(size);
    this.getTransformer().setSize(size);
  }

  get size(): TSize {
    return this.getTransformer().size();
  }

  getSize(): TSize {
    return this.getTransformer().getSize();
  }

  setSize(size: TSize) {
    this.getGroup().setSize(size);
    this.getTransformer().setSize(size);
  }


  get shadow(): TypeOrUndefined<TShadow> {
    return undefined;
  }

  set shadow(shadow: TypeOrUndefined<TShadow>) {}

  getShadowProps(): TypeOrUndefined<TShadow> {
    return undefined;
  }

  setShadowProps(shadow: TypeOrUndefined<TShadow>) {}

  get border(): TypeOrUndefined<TBorder> {
    return undefined;
  }

  set border(border: TypeOrUndefined<TBorder>) {}

  getBorderProps(): TypeOrUndefined<TBorder> {
    return undefined;
  }

  setBorderProps(border: TypeOrUndefined<TBorder>) {
  }

  get text():TypeOrUndefined<TText> {
    return undefined;
  }

  set text(text: TypeOrUndefined<TText>) {}

  getTextProps():TypeOrUndefined<TText>{
    return undefined;
  }

  setTextProps(text: TypeOrUndefined<TText>) {
  }

  get background(): TypeOrUndefined<TBackground> {
    return undefined;
  }

  set background(background: TypeOrUndefined<TBackground>) {}

  getBackgroundProps(): TypeOrUndefined<TBackground> {
    return undefined;
  }

  setBackgroundProps(background: TypeOrUndefined<TBackground>) {}

  get image(): TypeOrUndefined<TImage> {
    return undefined;
  }

  set image(image: TypeOrUndefined<TImage>) {}

  getImageProps(): TypeOrUndefined<TImage> {
    return undefined;
  }

  setImageProps(image: TImage, size?: { width: number, height: number }, callback?: Function) {
  }

  getName() {
    return this.name;
  }
}


export interface IWebGLComponentProps {
  getPosition(): TPosition;

  setPosition(position: TPosition): void;

  getSize(): TSize;

  setSize(size: TSize): void;

  getShadowProps(): TypeOrUndefined<TShadow>;

  setShadowProps(shadow: TShadow): void;

  getBorderProps(): TypeOrUndefined<TBorder>;

  setBorderProps(border: TBorder): void;

  getTextProps(): TypeOrUndefined<TText>;

  setTextProps(text: TText): void;

  getBackgroundProps(): TypeOrUndefined<TBackground>;

  setBackgroundProps(background: TBackground): void;

  getImageProps(): TypeOrUndefined<TImage>;

  setImageProps(image: TImage, size?: { width: number, height: number }, callback?: Function): void;
}

export interface IWebGLComponentEvents {
  onDragMove(callback: (e: Konva.KonvaEventObject<any>) => void): void;

  onTransform(callback: (e: Konva.KonvaEventObject<any>) => void): void;

  onTransformEnd(callback: (e: Konva.KonvaEventObject<any>) => void): void;

  onSelected(callback: (event: Konva.KonvaEventObject<any>) => void): void;

  onDragEnd(callback: (event: Konva.KonvaEventObject<any>) => void): void;
}
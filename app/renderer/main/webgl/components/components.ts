import Konva from 'konva';
import {Dispatch} from 'redux';

export default abstract class WebGLComponent {
  protected id: string;
  protected name: string;
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
      id: '__component_transformer'
    });

    this.children = new Map<string, WebGLComponent>();
    this.parent = null;

    this.id = '';
    this.isRawComponent = false;
    this.name = 'component';
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

  getGroup() {
    return this.group;
  }

  getTransformer() {
    return this.transformer;
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
      group.offsetX(0);
      group.offsetY(0);

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

  getPosition() {
    return this.getGroup().position();
  }

  getSize() {
    return this.getTransformer().getSize();
  }

  setSize(size: {width: number, height: number}) {
    this.getTransformer().setSize(size);
  }

  getShadowProps(): { offsetX: number, offsetY: number, blur: number, fill: string } | undefined {
    return undefined;
  }

  setShadowProps(shadow: { offsetX: number, offsetY: number, blur: number, fill: string }) {
  }

  getBorderProps(): { width: number; fill: string; radius: number | number[] } | undefined {
    return undefined;
  }

  setBorderProps(border: { width: number; fill: string; radius: number }) {
  }

  getTextProps(): { text: string, fill: string } | undefined {
    return undefined;
  }

  setTextProps(text: { text: string, fill: string }) {
  }

  getBackgroundProps(): { opacity: number, fill: string } | undefined {
    return undefined;
  }

  setBackgroundProps(background: { opacity: number, fill: string }) {
  }

  getImageProps(): {} | undefined {
    return undefined;
  }

  setImageProps(image: {}) {
  }

  getName() {
    return this.name;
  }
}

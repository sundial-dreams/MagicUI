import * as Three from 'three';
export default class UIEditorRenderer {
  private renderer: Three.WebGLRenderer;
  private scene: Three.Scene;
  private dom: HTMLElement;
  private camera: Three.Camera;

  constructor(dom: HTMLElement) {
    this.renderer = new Three.WebGLRenderer();
    this.scene = new Three.Scene();
    this.camera = new Three.Camera();
    this.dom = dom;

  }

  paint() {

  }
}


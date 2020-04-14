import * as Three from 'three';
// @ts-ignore
import DragControls from 'three-dragcontrols/lib/index.module';

export default class CanvasEditorRenderer {
  private readonly scene: Three.Scene;
  private readonly camera: Three.PerspectiveCamera;
  private readonly renderer: Three.WebGLRenderer;
  private readonly controls: DragControls;

  constructor(container: HTMLElement) {
    this.camera = new Three.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
    this.scene = new Three.Scene();
    this.scene.background = new Three.Color(0x313341);
    this.renderer = new Three.WebGLRenderer();
    this.camera.position.z = 5;
    this.renderer.domElement.style.width = '100%';
    this.renderer.domElement.style.height = '100%';
    container.appendChild(this.renderer.domElement);

    const geometry = new Three.BoxGeometry(1, 1, 1);
    const material = new Three.MeshBasicMaterial({color: 0xffffff});
    const cube = new Three.Mesh(geometry, material);
    this.scene.add(cube);
    this.controls = new DragControls([cube], this.camera, this.renderer.domElement);
    this.controls.addEventListener('drag', () => this.render());
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }
}
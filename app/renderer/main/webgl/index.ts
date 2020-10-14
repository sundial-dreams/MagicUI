import Konva from 'konva';
import { Dispatch } from 'redux';
import WebGLComponent from './components/components';
import WebGLEditorUtils, { getComponentProps } from './utils';
import ComponentManager from './manager';
import { dragComponent, resetComponent, selectComponent, transformComponent } from '../actions/webglEditor';

const CANVAS_WIDTH = 2500;
const CANVAS_HEIGHT = 1000;

export default class CanvasEditorRenderer {
  private readonly renderer: Konva.Stage;
  private readonly layer: Konva.Layer;
  private readonly dispatch: Dispatch;
  private readonly componentsManager: ComponentManager;

  constructor(container: HTMLElement, dispatch: Dispatch) {
    this.renderer = new Konva.Stage({
      container: container.id,
      width: CANVAS_WIDTH,
      height: CANVAS_HEIGHT
    });

    this.componentsManager = new ComponentManager();

    this.layer = new Konva.Layer();
    this.dispatch = dispatch;

    WebGLEditorUtils.addGuidesLineForLayer(this.layer, this.renderer);
    this.renderer.add(this.layer);
  }

  getComponentManager() {
    return this.componentsManager;
  }


  addComponent(webGLComponent: WebGLComponent) {

    this.addSomeEventForComponent(webGLComponent);

    webGLComponent.appendToLayer(this.layer);
    this.componentsManager.pushComponent(webGLComponent);

    const id = WebGLEditorUtils.checkInSomeGroup(
      this.layer,
      this.renderer,
      webGLComponent.getGroup()
    );

    if (id) {
      this.componentsManager.appendComponentById(id, webGLComponent);
    }

    this.dispatch(selectComponent(
      webGLComponent.getId(),
      webGLComponent.getType(),
      webGLComponent.getName(),
      this.componentsManager.getPathOfComponent(webGLComponent).join('>'),
      getComponentProps(webGLComponent)
    ));


    this.render();
  }

  addComponentForParent(parent: WebGLComponent, child: WebGLComponent) {
    if (!this.componentsManager.getComponentById(parent.getId())) {
      this.componentsManager.pushComponent(parent);
      this.addSomeEventForComponent(parent);
    }
    if (!this.componentsManager.getComponentById(child.getId())) {
      this.componentsManager.pushComponent(child);
      this.addSomeEventForComponent(child);
    }
    parent.appendComponent(child);
    child.hideTransformer();
    this.render();
  }

  addRootComponent(root: WebGLComponent) {
    if (!this.componentsManager.getComponentById(root.getId())) {
      this.componentsManager.pushComponent(root);
      this.addSomeEventForComponent(root);
      this.componentsManager.showCurrentComponentTransformer(
        root.getId()
      );
      this.addComponent(root);
      this.dispatch(selectComponent(
        root.getId(),
        root.getType(),
        root.getName(),
        this.componentsManager.getPathOfComponent(root).join('>'),
        getComponentProps(root)
      ));
      this.render();
    }
  }

  addSomeEventForComponent(component: WebGLComponent) {
    component.onSelected(e => {
      this.componentsManager.showCurrentComponentTransformer(
        component.getId()
      );
      component.moveToTop();
      this.dispatch(selectComponent(
        component.getId(),
        component.getType(),
        component.getName(),
        this.componentsManager.getPathOfComponent(component).join('>'),
        getComponentProps(component)
      ));
      this.render();
    });

    component.onDragEnd(e => {
      this.dispatch(dragComponent(e.target.position()));
    });

    component.onTransformEnd(e => {
      this.dispatch(transformComponent(component.getSize()));
    })

    component.onDragEnd(e => {
      const id = WebGLEditorUtils.checkInSomeGroup(
        this.layer,
        this.renderer,
        component.getGroup()
      );


      if (id) {
        this.componentsManager.appendComponentById(id, component);
      }
      this.render();
    });
  }

  toImage() {
    const root = this.componentsManager.getRootComponent() as WebGLComponent;
    const { width, height } = root.getSize();
    const { x, y } = root.getPosition();

    return this.renderer.toDataURL({
      pixelRatio: 1,
      width: width + x * 2,
      height: height + y * 2
    });
  }

  pasteComponent(id: string) {
    const cpn = this.componentsManager.pasteComponentById(id, this);
    if (cpn) {
      this.dispatch(resetComponent());
    }
    return cpn;
  }

  removeComponent(id: string) {
    const cpn = this.componentsManager.getComponentById(id);
    this.componentsManager.removeComponentById(id);
    this.render();
    this.dispatch(resetComponent());
    return cpn;
  }

  modifyComponentProperties(id: string, propType: string, data: any, callback?: Function) {
    this.componentsManager.modifyComponentPropertiesById(id, propType, data, callback);
    this.render();
  }

  toJsonObject() {
    return this.componentsManager.toJsonObject();
  }

  clear() {
    this.componentsManager.removeAll();
  }

  render() {
    this.layer.draw();
  }
}

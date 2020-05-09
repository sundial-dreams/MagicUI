import WebGLComponent from './components/components';
import { WEBGL_COMPONENT_PROP_TYPES } from '../utils/constants';
import { drawComponentFromJsonObject, webGLComponentToJsonObject } from './utils';
import CanvasEditorRenderer from './index';

export default class ComponentManager {
  private curCpnId: string;
  private prevCpnId: string;
  private readonly webGLComponentCollection: Map<string, WebGLComponent>;
  private rootComponent: WebGLComponent | null;

  constructor() {
    this.curCpnId = '';
    this.prevCpnId = '';
    this.rootComponent = null;
    this.webGLComponentCollection = new Map<string, WebGLComponent>();
  }

  getComponentById(id: string) {
    return this.webGLComponentCollection.get(id);
  }

  pushComponent(webGLComponent: WebGLComponent) {
    this.curCpnId = webGLComponent.getId();
    this.hidePrevComponentTransformer();
    this.webGLComponentCollection.set(this.curCpnId, webGLComponent);
    if (!this.rootComponent) this.rootComponent = webGLComponent;
  }

  getRootComponent() {
    return this.rootComponent;
  }

  getPathOfComponent(component: WebGLComponent) {
    let r: any = component;
    let path = [];
    while (r.getParent()) {
      path.push(r.getName());
      r = r.getParent();
    }
    path.push(r.getName());
    return path;
  }

  hidePrevComponentTransformer() {
    if (!this.prevCpnId) {
      this.prevCpnId = this.curCpnId;
      this.webGLComponentCollection.get(this.prevCpnId)?.hideTransformer();
      return;
    }

    this.webGLComponentCollection.get(this.prevCpnId)?.hideTransformer();
    this.prevCpnId = this.curCpnId;
  }

  showCurrentComponentTransformer(id: string) {
    this.curCpnId = id;
    this.hidePrevComponentTransformer();
    this.webGLComponentCollection.get(id)?.showTransformer();
  }

  appendComponentById(id: string, webGLComponent: WebGLComponent) {
    if (this.webGLComponentCollection.has(id)) {
      this.webGLComponentCollection.get(id)?.appendComponent(
        webGLComponent
      );
    }
  }

  removeComponentById(id: string) {
    if (this.webGLComponentCollection.has(id)) {
      this.webGLComponentCollection.get(id)?.removeFromLayer();
      this.webGLComponentCollection.delete(id);
    }
  }

  pasteComponentById(id: string, renderer: CanvasEditorRenderer) {
    if (this.webGLComponentCollection.has(id)) {
      const cpn = this.webGLComponentCollection.get(id) as WebGLComponent;
      const json = webGLComponentToJsonObject(cpn);
      return drawComponentFromJsonObject(json, renderer, true);
    }
    return null;
  }

  modifyComponentPropertiesById(id: string, propType: string, data: any) {
    if (this.webGLComponentCollection.has(id)) {
      const component = this.webGLComponentCollection.get(id) as WebGLComponent;
      console.log(propType);
      switch (propType) {
        case WEBGL_COMPONENT_PROP_TYPES.BACKGROUND: {
          component.getBackgroundProps() && component.setBackgroundProps(data);
          return;
        }
        case WEBGL_COMPONENT_PROP_TYPES.BORDER: {
          component.getBorderProps() && component.setBorderProps(data);
          return;
        }
        case WEBGL_COMPONENT_PROP_TYPES.SHADOW: {
          component.getShadowProps() && component.setShadowProps(data);
          return;
        }
        case WEBGL_COMPONENT_PROP_TYPES.TEXT: {
          component.getTextProps() && component.setTextProps(data);
          return;
        }
        case WEBGL_COMPONENT_PROP_TYPES.IMAGE: {
          component.getImageProps() && component.setImageProps(data);
          return;
        }
      }
    }
  }

  toJsonObject() {
    if (this.rootComponent) {
      return webGLComponentToJsonObject(this.rootComponent);
    }
    return null;
  }

  removeAll() {
    if (this.rootComponent)
      this.rootComponent.removeFromLayer();
    this.webGLComponentCollection.clear();
    this.curCpnId = '';
    this.prevCpnId = '';
    this.rootComponent = null;
  }

}
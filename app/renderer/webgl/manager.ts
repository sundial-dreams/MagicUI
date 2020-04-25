import WebGLComponent from './components/components';
import {WEBGL_COMPONENT_PROP_TYPES} from '../utils/constants';
import {getComponentProps, mapComponentById} from './index';

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

  pushComponent(webGLComponent: WebGLComponent) {
    this.curCpnId = webGLComponent.getId();
    this.hidePrevComponentTransformer();
    this.webGLComponentCollection.set(this.curCpnId, webGLComponent);
    if (!this.rootComponent) this.rootComponent = webGLComponent;
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

  pasteComponentById(id: string) {
    if (this.webGLComponentCollection.has(id)) {
      const cpn = this.webGLComponentCollection.get(id) as WebGLComponent;
      const json = traverseComponent(cpn);
      console.log(json);
      const newCpn = generateUIFromJson(json);
      console.log(newCpn);
      return newCpn;
    }
    return null;
  }

  modifyComponentPropertiesById(id: string, propType: string, data: any) {
    if (this.webGLComponentCollection.has(id)) {
      const component = this.webGLComponentCollection.get(id) as WebGLComponent;
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

}

function traverseComponent(component: WebGLComponent) {
  return getComponentInfo(component);
}

type TRawComponent = {
  id: string,
  type: string,
  name: string,
  props: any,
  children: TRawComponent[]
};

function getComponentInfo(component: WebGLComponent): TRawComponent {
  return {
    id: component.getId(),
    type: component.getId().split('-')[0],
    name: component.getName(),
    props: getComponentProps(component),
    children: component.getChildren().size ?
      [...component.getChildren().values()].map(value => {
        return getComponentInfo(value)
      }) : []
  };
}


function generateUIFromJson(jsonObject: TRawComponent) {
  const queue = [jsonObject];
  let root = null;

  while (queue.length) {
    const front = queue.shift() as TRawComponent;
    const parent = new mapComponentById[front.name](jsonObject.props.position);
    if (!root) root = parent;
    for (let v of front.children) {
      queue.push(v);
      let cpn = new mapComponentById[v.name](v.props.position);
      cpn.setSize(v.props.size);
      cpn.getBackgroundProps() && cpn.setBackgroundProps(v.props.background);
      cpn.getShadowProps() && cpn.setShadowProps(v.props.shadow);
      cpn.getBorderProps() && cpn.setBorderProps(v.props.border);
      cpn.getTextProps() && cpn.setTextProps(v.props.text);
      cpn.getImageProps() && cpn.setImageProps(v.props.image);
      parent.appendComponent(cpn);
    }
  }
  return root;
}
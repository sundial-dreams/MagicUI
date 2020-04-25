import Konva from 'konva';
import {Dispatch} from 'redux';
import WebGLComponent from './components/components';
import WebGLEditorUtils from './utils';
import ComponentManager from './manager';
import {COMPONENT_TYPES} from '../utils/constants';
import {WebGLButton} from './components/button';
import {WebGLLabel, WebGLText} from './components/text';
import {WebGLMobileWidget, WebGLPCWidget} from './components/widget';
import {WebGLCircle, WebGLEllipse, WebGLRect} from './components/shape';
import {WebGLImage} from './components/image';
import {dragComponent, resetComponent, selectComponent, transformComponent} from '../actions';
import {WebGLInput} from './components/input';

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

  addComponent(webGLComponent: WebGLComponent) {

    webGLComponent.onSelected(e => {
      this.componentsManager.showCurrentComponentTransformer(
        webGLComponent.getId()
      );
      webGLComponent.moveToTop();
      this.dispatch(selectComponent(
        webGLComponent.getId(),
        webGLComponent.getName(),
        getComponentProps(webGLComponent)
      ));
      this.render();
    });

    webGLComponent.onDragMove(e => {
      this.dispatch(dragComponent(e.target.position()));
    });

    webGLComponent.onTransform(e => {
      this.dispatch(transformComponent(webGLComponent.getSize()));
    });

    webGLComponent.onDragEnd(e => {
      const id = WebGLEditorUtils.checkInSomeGroup(
        this.layer,
        this.renderer,
        webGLComponent.getGroup()
      );

      if (id) {
        this.componentsManager.appendComponentById(id, webGLComponent);
      }
      this.render();
    });

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
      webGLComponent.getName(),
      getComponentProps(webGLComponent)
    ));

    this.render();
  }

  pasteComponent(id: string) {
    const cpn = this.componentsManager.pasteComponentById(id);
    if (cpn) {
      this.addComponent(cpn);
      this.dispatch(resetComponent());
    }
  }

  removeComponent(id: string) {
    this.componentsManager.removeComponentById(id);
    this.render();
    this.dispatch(resetComponent());
  }

  modifyComponentProperties(id: string, propType: string, data: any) {
    this.componentsManager.modifyComponentPropertiesById(id, propType, data);
    this.render();
  }

  render() {
    this.layer.draw();
  }
}

export const mapComponentById = {
  // button
  [COMPONENT_TYPES.BUTTON.CUSTOM_BUTTON]: WebGLButton,
  // input
  [COMPONENT_TYPES.INPUT.CUSTOM_INPUT]: WebGLInput,
  // text
  [COMPONENT_TYPES.TEXT.LABEL]: WebGLLabel,
  [COMPONENT_TYPES.TEXT.CUSTOM_TEXT]: WebGLText,
  // widget
  [COMPONENT_TYPES.WIDGET.PC_WIDGET]: WebGLPCWidget,
  [COMPONENT_TYPES.WIDGET.MOBILE_WIDGET]: WebGLMobileWidget,
  // shape
  [COMPONENT_TYPES.SHAPE.RECT]: WebGLRect,
  [COMPONENT_TYPES.SHAPE.CIRCLE]: WebGLCircle,
  [COMPONENT_TYPES.SHAPE.ELLIPSE]: WebGLEllipse,
  // image
  [COMPONENT_TYPES.IMAGE.CUSTOM_IMAGE]: WebGLImage

};

export function getComponentProps(webGLComponent: WebGLComponent) {
  return {
    position: webGLComponent.getPosition(),
    size: webGLComponent.getSize(),
    shadow: webGLComponent.getShadowProps(),
    background: webGLComponent.getBackgroundProps(),
    border: webGLComponent.getBorderProps(),
    text: webGLComponent.getTextProps(),
    image: webGLComponent.getImageProps()
  };
}

export function dropComponentToWebGLEditor(componentId: string, position: { x: number, y: number }, editor: CanvasEditorRenderer) {
  editor.addComponent(
    new mapComponentById[componentId](position)
  );
}

export function removeComponentFromWebGLEditor(componentId: string, editor: CanvasEditorRenderer) {
  editor.removeComponent(
    componentId
  );
}

export function pasteComponentToWebGLEditor(componentId: string, editor: CanvasEditorRenderer) {
  editor.pasteComponent(
    componentId
  );
}

export function modifyComponentProperties(componentId: string, propType: string, data: any, editor: CanvasEditorRenderer) {
  editor.modifyComponentProperties(
    componentId,
    propType,
    data
  );
}
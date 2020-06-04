import { Compiler, compileToJson } from './compile';
import { COMPONENT_TYPES, TYPES } from './contants';

export class ReactCompiler extends Compiler {
  compile(code: string): string | string[] {
    const jsonObject = compileToJson(code);
    const reactCode = (`import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

export default class App extends React.Component {
  state = {};
  componentDidMount() {}
  render() {
     return (
       ${compileToElementToken(jsonObject)}
     )
  }
}
ReactDOM.render(<App/>, document.getElementById('root'));`);

    const scssCode = compileToStyleToken(jsonObject);
    return [reactCode, scssCode];
  }
}




function compileToElementToken(obj: any): any {
  switch (obj.type) {
    case TYPES.WIDGET: {
      return (`<div className="${obj.id}">${obj.children.map((v: any) => compileToElementToken(v)).join('\n')}</div>`);
    }
    case TYPES.BUTTON: {
      return (`<button className="${obj.id}">${obj.props.text ? obj.props.text.text : ''}</button>`);
    }
    case TYPES.SHAPE: {
      return (`<div className="${obj.id}">${obj.children.map((v: any) => compileToElementToken(v)).join('\n')}</div>`);
    }
    case TYPES.TEXT: {
      return (`<div className="${obj.id}">${obj.props.text ? obj.props.text.text : ''}</div>`);
    }
    case TYPES.INPUT: {
      return (`<input className="${obj.id}" placeholder="some text"/>`);
    }
    case TYPES.IMAGE: {
      return (`<img className="${obj.id}" src="${obj.props.image ? obj.props.image.src : ''}" alt="none"/>`);
    }
  }
}

function compileToStyleToken(obj: any): any {

  switch (obj.type) {
    case TYPES.WIDGET: {
      switch (obj.name) {
        case COMPONENT_TYPES.WIDGET.PC_WIDGET: {
          return (`.${obj.id} {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: ${obj.props.background?.fill};
  opacity: ${obj.props.background?.opacity};
  border: ${obj.props.border?.width}px solid ${obj.props.border?.fill}; 
  border-radius: ${obj.props.border?.radius}px;
  box-shadow: ${obj.props.shadow?.offsetX}px ${obj.props.shadow?.offsetY}px ${obj.props.shadow?.blur}px ${obj.props.shadow?.fill};
  ${obj.children.map((v: any) => compileToStyleToken(v)).join('\n')}
}`);
        }
        case COMPONENT_TYPES.WIDGET.MOBILE_WIDGET: {
          return (`.${obj.id} {
  position: relative;
  width: 100%;
  height: 100%;          
  background-color: ${obj.props.background?.fill};
  opacity: ${obj.props.background?.opacity};
  border: ${obj.props.border?.width}px solid ${obj.props.border?.fill}; 
  border-radius: ${obj.props.border?.radius}px;
  box-shadow: ${obj.props.shadow?.offsetX}px ${obj.props.shadow?.offsetY}px ${obj.props.shadow?.blur}px ${obj.props.shadow?.fill};
  ${obj.children.map((v: any) => compileToStyleToken(v)).join('\n')}
}`)
        }
      }
      break;
    }

    case TYPES.BUTTON: {
      switch (obj.name) {
        case COMPONENT_TYPES.BUTTON.CUSTOM_BUTTON: {
          return (`.${obj.id} {
  position: absolute;
  outline: none;
  width: ${obj.props.size.width}px;
  height: ${obj.props.size.height}px;
  background-color: ${obj.props.background?.fill};
  opacity: ${obj.props.background?.opacity};
  border: ${obj.props.border?.width}px solid ${obj.props.border?.fill}; 
  border-radius: ${obj.props.border?.radius}px;
  box-shadow: ${obj.props.shadow?.offsetX}px ${obj.props.shadow?.offsetY}px ${obj.props.shadow?.blur}px ${obj.props.shadow?.fill};
  left: ${obj.props.position.x}px;
  top: ${obj.props.position.y}px;
}`);
        }
      }
      break;
    }

    case TYPES.SHAPE: {
      switch (obj.name) {
        case COMPONENT_TYPES.SHAPE.RECT: {
          return (`.${obj.id} {
  position: absolute;
  width: ${obj.props.size.width}px;
  height: ${obj.props.size.height}px;
  background-color: ${obj.props.background?.fill};
  opacity: ${obj.props.background?.opacity};
  border: ${obj.props.border?.width}px solid ${obj.props.border?.fill}; 
  border-radius: ${obj.props.border?.radius}px;
  box-shadow: ${obj.props.shadow?.offsetX}px ${obj.props.shadow?.offsetY}px ${obj.props.shadow?.blur}px ${obj.props.shadow?.fill};
  left: ${obj.props.position.x}px;
  top: ${obj.props.position.y}px;
  ${obj.children.map((v: any) => compileToStyleToken(v)).join('\n')}
}`);
        }
        case COMPONENT_TYPES.SHAPE.CIRCLE: {
          return (`.${obj.id} {
  position: absolute;
  width: ${obj.props.size.width}px;
  height: ${obj.props.size.height}px;
  background-color: ${obj.props.background?.fill};
  opacity: ${obj.props.background?.opacity};
  border: ${obj.props.border?.width}px solid ${obj.props.border?.fill}; 
  border-radius: 50%;
  box-shadow: ${obj.props.shadow?.offsetX}px ${obj.props.shadow?.offsetY}px ${obj.props.shadow?.blur}px ${obj.props.shadow?.fill};
  left: ${obj.props.position.x}px;
  top: ${obj.props.position.y}px;
  ${obj.children.map((v: any) => compileToStyleToken(v)).join('\n')}
}`);
        }
      }
      break;
    }

    case TYPES.TEXT: {
      switch (obj.name) {
        case COMPONENT_TYPES.TEXT.CUSTOM_TEXT: {
          return (`.${obj.id} {
  position: absolute;
  width: ${obj.props.size.width}px;
  height: ${obj.props.size.height}px;
  background: transparent;
  margin-left: ${obj.props.position.x}px;
  margin-top: ${obj.props.position.y}px;
  color: ${obj.props.text?.fill};
}`);
        }
        case COMPONENT_TYPES.TEXT.LABEL: {
          return (`.${obj.id} {
  position: absolute;
  width: ${obj.props.size.width}px;
  height: ${obj.props.size.height}px;
  background-color: ${obj.props.background?.fill};
  opacity: ${obj.props.background?.opacity};
  border: ${obj.props.border?.width}px solid ${obj.props.border?.fill}; 
  border-radius: ${obj.props.border?.radius}px;
  box-shadow: ${obj.props.shadow?.offsetX}px ${obj.props.shadow?.offsetY}px ${obj.props.shadow?.blur}px ${obj.props.shadow?.fill};
  left: ${obj.props.position.x}px;
  top: ${obj.props.position.y}px;
  color: ${obj.props.text?.fill};
}`);
        }
      }
      break;
    }
    case TYPES.INPUT: {
      switch (obj.name) {
        case COMPONENT_TYPES.INPUT.CUSTOM_INPUT: {
          return (`.${obj.id} {
 position: absolute;
 outline: none;
 width: ${obj.props.size.width}px;
 height: ${obj.props.size.height}px;
 background-color: ${obj.props.background?.fill};
 opacity: ${obj.props.background?.opacity};
 border: ${obj.props.border?.width}px solid ${obj.props.border?.fill}; 
 border-radius: ${obj.props.border?.radius}px;
 box-shadow: ${obj.props.shadow?.offsetX}px ${obj.props.shadow?.offsetY}px ${obj.props.shadow?.blur}px ${obj.props.shadow?.fill};
 left: ${obj.props.position.x}px;
 top: ${obj.props.position.y}px;
}`);
        }
      }
      break;
    }
    case TYPES.IMAGE: {
      switch (obj.name) {
        case COMPONENT_TYPES.IMAGE.CUSTOM_IMAGE: {
          return (`.${obj.id} {
  position: absolute;
  outline: none;
  border: none;
  width: ${obj.props.size.width}px;
  height: ${obj.props.size.height}px;
  left: ${obj.props.position.x}px;
  top: ${obj.props.position.y}px;
}`);
        }
      }
    }
  }
}

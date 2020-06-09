import { Compiler, compileToJson, parser } from './compile';
import { COMPONENT_TYPES, TYPES } from './contants';

export default function compileToHtml(code: string) {
  const jsonObject = compileToJson(code);
  let style = (`
* { box-sizing: border-box; margin: 0; padding: 0 }
html, body { height: 100%; width: 100% }
${compileToStyleToken(jsonObject)}`).replace(/\n(\n)*(\s)*(\n)*\n/g, '\n');
  let div = compileToElementToken(jsonObject).replace(/\n(\n)*(\s)*(\n)*\n/g, '\n');

  const html = (`<!DOCTYPE>
<html lang="zh">
<head>
<title>auto ui</title>
<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" /> 
</head>
<style>${style}</style>
<body>${div}</body> 
</html>`);

  return [html]
}

export class HtmlCompiler extends Compiler {
  compile(code: string): string[] {
    const jsonObject = compileToJson(code);
    let style = (`
* { box-sizing: border-box; margin: 0; padding: 0 }
html, body { height: 100%; width: 100% }
${compileToStyleToken(jsonObject)}`).replace(/\n(\n)*(\s)*(\n)*\n/g, '\n');
    let div = compileToElementToken(jsonObject).replace(/\n(\n)*(\s)*(\n)*\n/g, '\n');
    const html = (`<!DOCTYPE>
<html lang="zh">
<head><title>auto ui</title></head>
<style>${style}</style>
<body>${div}</body> 
</html>`);
    return [html];
  }
}


function compileToElementToken(obj: any): any {
  switch (obj.type) {
    case TYPES.WIDGET: {
      return (`<div id="${obj.id}">${obj.children.map((v: any) => compileToElementToken(v)).join('\n')}</div>`);
    }
    case TYPES.BUTTON: {
      return (`<button id="${obj.id}">${obj.props.text ? obj.props.text.text : ''}</button>`);
    }
    case TYPES.SHAPE: {
      return (`<div id="${obj.id}">${obj.children.map((v: any) => compileToElementToken(v)).join('\n')}</div>`);
    }
    case TYPES.TEXT: {
      return (`<div id="${obj.id}">${obj.props.text ? obj.props.text.text : ''}</div>`);
    }
    case TYPES.INPUT: {
      return (`<input id="${obj.id}" placeholder="some text"/>`);
    }
    case TYPES.IMAGE: {
      return (`<img id="${obj.id}" src="${obj.props.image ? obj.props.image.src : ''}" alt="none"/>`);
    }
  }
}

function compileToStyleToken(obj: any): any {

  switch (obj.type) {
    case TYPES.WIDGET: {
      switch (obj.name) {
        case COMPONENT_TYPES.WIDGET.PC_WIDGET: {
          return (`#${obj.id} {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: ${obj.props.background?.fill};
  opacity: ${obj.props.background?.opacity};
  border: ${obj.props.border?.width}px solid ${obj.props.border?.fill}; 
  border-radius: ${obj.props.border?.radius}px;
  box-shadow: ${obj.props.shadow?.offsetX}px ${obj.props.shadow?.offsetY}px ${obj.props.shadow?.blur}px ${obj.props.shadow?.fill};
}
${obj.children.map((v: any) => compileToStyleToken(v)).join('\n')}`);
        }
        case COMPONENT_TYPES.WIDGET.MOBILE_WIDGET: {
          return (`#${obj.id} {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: ${obj.props.background?.fill};
  opacity: ${obj.props.background?.opacity};
  border: ${obj.props.border?.width}px solid ${obj.props.border?.fill}; 
  border-radius: ${obj.props.border?.radius}px;
  box-shadow: ${obj.props.shadow?.offsetX}px ${obj.props.shadow?.offsetY}px ${obj.props.shadow?.blur}px ${obj.props.shadow?.fill};
}
${obj.children.map((v: any) => compileToStyleToken(v)).join('\n')}`);
        }
      }
      break;
    }

    case TYPES.BUTTON: {
      switch (obj.name) {
        case COMPONENT_TYPES.BUTTON.CUSTOM_BUTTON: {
          return (`#${obj.id} {
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
          return (`#${obj.id} {
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
}
${obj.children.map((v: any) => compileToStyleToken(v)).join('\n')}`);
        }
        case COMPONENT_TYPES.SHAPE.CIRCLE: {
          return (`#${obj.id} {
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
}
${obj.children.map((v: any) => compileToStyleToken(v)).join('\n')}`);
        }
      }
      break;
    }

    case TYPES.TEXT: {
      switch (obj.name) {
        case COMPONENT_TYPES.TEXT.CUSTOM_TEXT: {
          return (`#${obj.id} {
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
          return (`#${obj.id} {
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
          return (`#${obj.id} {
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
          return (`#${obj.id} {
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


const dslCode3 = `
WIDGET.pc_widget {
  position: -1px 27px;
  size: 957px 665px;
  style: {
    background: #ffffff 1;
    shadow: 0px 0px 10px black;
    border: 2px 4 white;
  } 
  children: [
    BUTTON.custom_button {
      position: 802px 571px;
      size: 100px 32px;
      text: 'Button' white;
      style: {
        background: #FF5370 1;
        shadow: 0px 0px 5px blue;
        border: 2px 2 white;
      } 
    },
    SHAPE.rect {
      position: 220px 137px;
      size: 334px 334px;
      style: {
        background: #ffffff 1;
        shadow: 0px 0px 10px #9b9b9b;
        border: 1px 5 #9b9b9b;
      } 
      children: [
        IMAGE.custom_image {
          position: 33px 26px;
          size: 259px 207px;
          image: 'http://localhost:9000/image/default_avatar.jpeg';
          style: {
          } 
        },
        BUTTON.custom_button {
          position: 215px 289px;
          size: 100px 32px;
          text: 'Button' white;
          style: {
            background: #FF5370 1;
            shadow: 0px 0px 5px blue;
            border: 2px 2 white;
          } 
        },
        TEXT.text {
          position: 33px 254px;
          size: 193px 12px;
          text: 'it is new date!' #9b9b9b;
          style: {
          } 
        }
      ]
    }
  ]
}
`;

console.log(compileToHtml(dslCode3));
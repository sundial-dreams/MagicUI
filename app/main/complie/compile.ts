export function compileToJson(code: string) {
  code = code.replace(/\n/g, '');
  parser.id_index = 0;
  return parser(code);
}

parser.id_index = 0;
export function parser(str: string): any {
  let childrenMatch = str.match(/children\s*:\s*\[(.+)/);
  const childrenToken = childrenMatch ? childrenMatch[1].trim().replace(/\]\s*\}$/, '').trim() : '';
  if (childrenMatch) {
    str = str.substring(0, childrenMatch.index);
  }

  const children = getChildrenToken(childrenToken);

  let nameMatch = str.match(/^[\w\d\.\s]+\s*{/);
  const [type, name] = nameMatch ? nameMatch[0].replace('{', '').trim().split('.') : ['', ''];
  let positionMatch = str.match(/position\s*:([^;]+);/);
  const [x, y] = positionMatch ? positionMatch[1].trim().split(' ').map(v => Number.parseInt(v)) : [0, 0];

  let sizeMatch = str.match(/size\s*:([^;]+);/);
  const [width, height] = sizeMatch ? sizeMatch[1].trim().split(' ').map(v => Number.parseInt(v)) : [0, 0];

  let backgroundMatch = str.match(/background\s*:([^;]+);/);
  const [fill, opacity] = backgroundMatch ? backgroundMatch[1].trim().split(' ') : ['', ''];

  let shadowMatch = str.match(/shadow\s*:([^;]+);/);
  let [offsetX, offsetY, blur, shadowFill] = shadowMatch ? shadowMatch[1].trim().split(' ').map((v, i) => {
    if (i === 3) return v;
    return Number.parseInt(v);
  }) : [0, 0, 0, ''];

  let borderMatch = str.match(/border\s*:([^;]+);/);
  const [borderWidth, radius, borderFill] = borderMatch ? borderMatch[1].trim().split(' ').map((v, i) => {
    if (i === 2) return v;
    return Number.parseInt(v);
  }) : [0, 0, ''];


  let textMatch = str.match(/text\s*:([^;]+);/);
  const textMatchRes = textMatch ? textMatch[1].trim() : '';
  let text = textMatchRes.match(/'(.+)'/);
  if (text) {
    text = (text[0] as any).replace(/^'/, '').replace(/'$/, '');
  }
  let textFill = textMatchRes.split(' ');
  textFill = (textFill[textFill.length - 1] as any).trim();

  let imageMatch = str.match(/image\s*:([^;]+);/);
  const src = imageMatch ? imageMatch[1].trim().replace(/^'/, '').replace(/'$/, '') : '';
  return {
    name,
    type,
    id: `${type}-${name}-${parser.id_index++}`,
    props: {
      position: { x, y },
      size: { width, height },
      ...(backgroundMatch ? { background: { fill, opacity: +opacity } } : {}),
      ...(shadowMatch ? {
        shadow: {
          offsetY,
          offsetX,
          blur,
          fill: shadowFill
        }
      } : {}),
      ...(borderMatch ? {
        border: {
          width: borderWidth,
          radius: radius,
          fill: borderFill
        }
      } : {}),
      ...(textMatch ? { text: { text, fill: textFill } } : {}),
      ...(imageMatch ? { image: { src } } : {})
    },
    children: children.map(str => parser(str))
  };
}

const test = 'rect.rect {position: 20px 20px;size: 102px 102px;style: {background: white 1;shadow: 0px 0px 0px undefined;border: 2px 5 #dddddd;};children:[rect.rect {position: 10px 10px;size:20px 20px;}, rect.rect {position: 10px 20px;size: 20px 22px;}]}';
// console.log(parser(test));
const dslCode = `
window.pc widget {
  position: 12.5px 100px;
  size: 650px 450px;
  style: {
    background: white 1;
    shadow: 0px 0px 10px black;
    border: 2px 4 undefined;
  } 
  children: [
    button.custom button {
      position: 437px 173px;
      size: 100px 32px;
      text: 'Button' undefined;
      style: {
        background: #FF5370 1;
        shadow: 0px 0px 5px blue;
        border: 2px 2 undefined;
      } 
    },
    label.label {
      position: 508px 16px;
      size: 80.037109375px 22px;
      text: 'Some label...' undefined;
      style: {
        background: yellow 0.75;
        shadow: 0px 0px 0px undefined;
        border: 2px 0 undefined;
      } 
    },
    image.custom image {
      position: 128.5px 73px;
      size: 93.99812654852393px 84.09727822805966px;
      style: {
      } 
    },
    rect.rect {
      position: 162.28036958243553px 210px;
      size: 191.1477354568238px 191.1477354568238px;
      style: {
        background: white 1;
        shadow: 0px 0px 0px undefined;
        border: 2px 5 #dddddd;
      } 
      children: [
        circle.circle {
          position: 54.7567548546275px 54px;
          size: 50px 50px;
          style: {
            background: white 1;
            shadow: 0px 0px 0px undefined;
            border: 2px 0 #ddd;
          } 
        },
        button.custom button {
          position: 59.53712443706303px 116.13460689328303px;
          size: 100px 32px;
          text: 'Button' undefined;
          style: {
            background: #FF5370 1;
            shadow: 0px 0px 5px blue;
            border: 2px 2 undefined;
          } 
        }
      ]
    }
  ]
}
`;

const dslCode2 = `
window.pc widget {
  position: 12.5px 20px;
  size: 650px 450px;
  style: {
    background: white 1;
    shadow: 0px 0px 10px black;
    border: 2px 4 white;
  }
  children: [
    rect.rect {
      position: 20px 20px;
      size: 100px 100px;
      style: {
        background: yellow 1;
        shadow: 0px 0px 10px black;
        border: 2px 4 #cccccc;
      }
    },
    shape.circle {
      position: 120px 20px;
      size: 20px 20px;
      style: {
        background: red 1;
        shadow: 0px 0px 10px black;
        border: 2px 4 #cccccc;
      }
    }  
  ]
}
`;

function getChildrenToken(childrenToken: string) {
  console.log('childrenToken', childrenToken);
  let count = 0;
  let child = '';
  const result = [];
  for (let i = 0; i < childrenToken.length; i++) {
    child += childrenToken[i];
    if (childrenToken[i] === '{') {
      count++;
    }
    if (childrenToken[i] === '}') {
      count--;
    }
    if ((childrenToken[i] === ',' && count === 0) || (count === 0 && i === childrenToken.length - 1)) {
      result.push(child.replace(/,$/, '').trim());
      child = '';
    }
  }
  return result;
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
// console.log(compileToJson(dslCode3));
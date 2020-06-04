
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
  const [x = 0, y = 0] = positionMatch ? positionMatch[1].trim().split(' ').map(v => Number.parseInt(v)) : [0, 0];

  let sizeMatch = str.match(/size\s*:([^;]+);/);
  const [width = 0, height = 0] = sizeMatch ? sizeMatch[1].trim().split(' ').map(v => Number.parseInt(v)) : [0, 0];

  let backgroundMatch = str.match(/background\s*:([^;]+);/);
  const [fill = 'white', opacity = 0] = backgroundMatch ? backgroundMatch[1].trim().split(' ') : ['', ''];

  let shadowMatch = str.match(/shadow\s*:([^;]+);/);
  let [offsetX = 0, offsetY = 0, blur = 0, shadowFill = 'white'] = shadowMatch ? shadowMatch[1].trim().split(' ').map((v, i) => {
    if (i === 3) return v;
    return Number.parseInt(v);
  }) : [0, 0, 0, ''];

  let borderMatch = str.match(/border\s*:([^;]+);/);
  const [borderWidth = 0, radius = 0, borderFill = 'white'] = borderMatch ? borderMatch[1].trim().split(' ').map((v, i) => {
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
    type: type.toLocaleUpperCase(),
    id: `${type.toLocaleUpperCase()}-${name}-${parser.id_index++}`,
    props: {
      position: { x , y },
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

function getChildrenToken(childrenToken: string) {
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


export interface ICompiler {
  compile(code: string): string | string[]
}

export class Compiler implements ICompiler {
  compile(code: string): string | string[] {
    return ''
  }
}

export class JsonCompiler extends Compiler {
  compile(code: string): string {
    code = code.replace(/\n/g, '');
    parser.id_index = 0;
    return parser(code);
  }
}
import Bridge from '../public/utils/bridge';
import { WidgetName } from '../public/utils/constants';

export function close() {
  Bridge.close(WidgetName.CODE_VIEWS);
}

export type TRawComponent = {
  id: string,
  type: string,
  name: string,
  props: any,
  children: TRawComponent[]
};

// @ts-ignore
export function jsonToDslCode(jsonObject: TRawComponent, tabIndent: number = 2) {
  const makeIndent = (i: number) => Array.from({ length: i }, () => ' ').join('');
  return `
${makeIndent(tabIndent - 2)}${jsonObject.type}.${jsonObject.name} {
${makeIndent(tabIndent)}position: ${jsonObject.props.position.x}px ${jsonObject.props.position.y}px;
${makeIndent(tabIndent)}size: ${jsonObject.props.size.width}px ${jsonObject.props.size.height}px;
${makeIndent(tabIndent)}${jsonObject.props.text ? `text: '${jsonObject.props.text.text}' ${jsonObject.props.text.fill};` : ''}
${makeIndent(tabIndent)}${jsonObject.props.image ? `image: '${jsonObject.props.image.src}';` : ''}
${makeIndent(tabIndent)}style: {
${makeIndent(tabIndent + 2)}${jsonObject.props.background ? `background: ${jsonObject.props.background.fill} ${jsonObject.props.background.opacity};` : ''}
${makeIndent(tabIndent + 2)}${jsonObject.props.shadow ? `shadow: ${jsonObject.props.shadow.offsetX}px ${jsonObject.props.shadow.offsetY}px ${jsonObject.props.shadow.blur}px ${jsonObject.props.shadow.fill};` : ''}
${makeIndent(tabIndent + 2)}${jsonObject.props.border ? `border: ${jsonObject.props.border.width}px ${jsonObject.props.border.radius} ${jsonObject.props.border.fill};` : ''}
${makeIndent(tabIndent)}} 
${makeIndent(tabIndent)}${jsonObject.children.length ? `children: [
${jsonObject.children.map(child => jsonToDslCode(child, tabIndent + 4))}
${makeIndent(tabIndent)}]` : ''}
${makeIndent(tabIndent - 2)}}`.replace(/\n(\n)*(\s)*(\n)*\n/g, '\n');
}

export function saveCodeFile(codeType: string, code: string) {
  return Bridge.saveFile('code', {
    codeType,
    code
  });
}
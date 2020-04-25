import {DragEvent} from 'react';

export function allowDrop(event: DragEvent) {
  event.preventDefault();
}

export function drag(id: string, event: DragEvent<any>) {
  event.dataTransfer?.setData('component_id', id);
}

export function drop(callback: Function, event: DragEvent<any>) {
  event.preventDefault();
  let componentId = event.dataTransfer?.getData('component_id');
  callback({
    id: componentId,
    position: {
      clientX: event.clientX,
      clientY: event.clientY
    }
  });
}
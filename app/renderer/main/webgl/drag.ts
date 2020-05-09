import { DragEvent } from 'react';

export function allowDrop(event: DragEvent) {
  event.preventDefault();
}

export function drag(type: string, name: string, event: DragEvent<any>) {
  event.dataTransfer?.setData('component', JSON.stringify({type, name}));
}

export function drop(callback: Function, event: DragEvent<any>) {
  event.preventDefault();
  const { type, name } = JSON.parse(event.dataTransfer?.getData('component'));
  callback({
    type,
    name,
    position: {
      clientX: event.clientX,
      clientY: event.clientY
    }
  });
}
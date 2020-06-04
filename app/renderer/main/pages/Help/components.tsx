import React, { useEffect, useRef } from 'react';
import marked from 'marked';

// @ts-ignore
import style from './components.scss';
import '~resources/style/markdown.global.scss';

export function Markdown(props: { text: string }) {
  const ref = useRef(null);
  useEffect(() => {
    const div = ref.current as unknown as HTMLElement;
    const renderer = new marked.Renderer();
    marked.setOptions({
      renderer,
      gfm: true,
      smartLists: true,
      breaks: true,
      sanitize: true
    })
    div.innerHTML = marked(props.text);
  }, []);

  return (
    <div className={style.markdown}>
      <div className={style.text} ref={ref}>

      </div>
    </div>
  )
}
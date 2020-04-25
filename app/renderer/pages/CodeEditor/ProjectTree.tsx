import React from 'react';

// @ts-ignore
import style from './ProjectTree.css'
import Fold, {FoldItem} from '../../components/fold';

export default function ProjectTree() {
  return (
    <div className={style.project_tree}>
      <div className={style.project_title}>
        <span>Auto UI</span>

      </div>
      <div className={style.project_content}>
        <Fold indent={0}>
          <Fold indent={5}>
            <FoldItem/>
          </Fold>
          <Fold indent={5}>
            <FoldItem/>
          </Fold>
        </Fold>
      </div>
      <div className={style.project_footer}>

      </div>
    </div>
  )
}
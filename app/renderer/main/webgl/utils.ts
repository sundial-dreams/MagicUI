import Konva from 'konva';

export default class WebGLEditorUtils {
  static addGuidesLineForLayer(layer: Konva.Layer, stage: Konva.Stage) {
    type DirectionType<T = any> = { vertical: T[], horizontal: T[] };
    type SnapType = { guide: number, offset: number, snap: string };
    type ResultType = { lineGuide: number, diff: number, snap: string, offset: number };
    type GuideType = ResultType & { orientation: 'V' | 'H' };

    const MIN_DISTANCE = 5;

    function getLineGuideStops(skipShape: Konva.Node): DirectionType {
      const vertical = [
        [0, stage.width() / 2, stage.width()]
      ];
      const horizontal = [
        [0, stage.height() / 2, stage.height()]
      ];
      stage.find('.object').each(guideItem => {
        if (guideItem === skipShape) return;
        const box = guideItem.getClientRect();
        vertical.push([
          box.x, box.x + box.width, box.x + box.width / 2
        ]);
        horizontal.push([
          box.y, box.y + box.height, box.y + box.height / 2
        ]);
      });
      return {
        vertical: vertical.flat(),
        horizontal: horizontal.flat()
      };
    }

    function getObjectSnappingEdges(node: Konva.Node): DirectionType<SnapType> {
      const box = node.getClientRect();
      return {
        vertical: <SnapType[]>[
          {
            guide: Math.round(box.x),
            offset: Math.round(node.x() - box.x),
            snap: 'start'
          },
          {
            guide: Math.round(box.x + box.width / 2),
            offset: Math.round(node.x() - box.x - box.width / 2),
            snap: 'center'
          },
          {
            guide: Math.round(box.x + box.width),
            offset: Math.round(node.x() - box.x - box.width),
            snap: 'end'
          }
        ],
        horizontal: <SnapType[]>[
          {
            guide: Math.round(box.y),
            offset: Math.round(node.y() - box.y),
            snap: 'start'
          },
          {
            guide: Math.round(box.y + box.height / 2),
            offset: Math.round(node.y() - box.y - box.height / 2),
            snap: 'center'
          },
          {
            guide: Math.round(box.y + box.height),
            offset: Math.round(node.y() - box.y - box.height),
            snap: 'end'
          }
        ]
      };
    }

    function getGuides(lineGuideStops: DirectionType, itemBounds: DirectionType<SnapType>): GuideType[] {
      const resultOfVertical: ResultType[] = [];
      const resultOfHorizontal: ResultType[] = [];
      lineGuideStops.vertical.forEach(lineGuide => {
        itemBounds.vertical.forEach(itemBound => {
          const diff = Math.abs(lineGuide - itemBound.guide);
          if (diff < MIN_DISTANCE) {
            resultOfVertical.push({
              lineGuide,
              diff,
              snap: itemBound.snap,
              offset: itemBound.offset
            });
          }
        });
      });

      lineGuideStops.horizontal.forEach(lineGuide => {
        itemBounds.horizontal.forEach(itemBound => {
          const diff = Math.abs(lineGuide - itemBound.guide);
          if (diff < MIN_DISTANCE) {
            resultOfHorizontal.push({
              lineGuide,
              diff,
              snap: itemBound.snap,
              offset: itemBound.offset
            });
          }
        });
      });

      const guides: GuideType[] = [];
      const minOfVertical = resultOfVertical.reduce((acc, cur) => {
        if (acc.diff > cur.diff) return cur;
        return acc;
      }, resultOfVertical[0]);

      const minOfHorizontal = resultOfHorizontal.reduce((acc, cur) => {
        if (acc.diff > cur.diff) return cur;
        return acc;
      }, resultOfHorizontal[0]);

      minOfVertical && guides.push({
        ...minOfVertical,
        orientation: 'V'
      });
      minOfHorizontal && guides.push({
        ...minOfHorizontal,
        orientation: 'H'
      });

      return guides;
    }

    function drawGuideLine(guides: GuideType[]) {
      guides.forEach(guide => {
        let points = guide.orientation === 'H' ?
          [-6000, guide.lineGuide, 6000, guide.lineGuide] :
          [guide.lineGuide, -6000, guide.lineGuide, 6000];

        const line = new Konva.Line({
          points,
          stroke: 'rgb(0, 161, 255)',
          strokeWidth: 1,
          name: '__guide_line',
          dash: [4, 6]
        });
        layer.add(line);
        layer.batchDraw();
      });
    }

    layer.on('dragmove', (event) => {
      layer.find('.__guide_line').each(child => child.destroy());
      const lineGuideStops = getLineGuideStops(event.target);
      const itemBounds = getObjectSnappingEdges(event.target);
      const guides = getGuides(lineGuideStops, itemBounds);
      if (!guides.length) return;

      drawGuideLine(guides);
      guides.forEach(guide => {
        switch (guide.orientation) {
          case 'V': {
            event.target.x(guide.lineGuide + guide.offset);
            break;
          }
          case 'H': {
            event.target.y(guide.lineGuide + guide.offset);
            break;
          }
        }
      });
    });

    layer.on('dragend', event => {
      layer.find('.__guide_line').each(child => child.destroy());
      layer.batchDraw();
    });
  }

  static addAnchorForGroup(layer: Konva.Layer, stage: Konva.Stage, group: Konva.Group) {
    addAnchor(group);

    function addAnchor(group: Konva.Group) {
      const content = group.children[0];
      const anchorConfigs = [
        {
          x: 0,
          y: 0,
          name: '__anchor_top_left'
        },
        {
          x: content.width(),
          y: 0,
          name: '__anchor_top_right'
        },
        {
          x: 0,
          y: content.height(),
          name: '__anchor_bottom_left'
        },
        {
          x: content.width(),
          y: content.height(),
          name: '__anchor_bottom_right'
        }
      ];

      for (let i = 0; i < anchorConfigs.length; i++) {
        const config = anchorConfigs[i];
        const anchor = new Konva.Circle({
          ...config,
          radius: 5,
          stroke: 'rgb(0, 161, 255)',
          fill: '#ddd',
          strokeWidth: 1,
          draggable: true,
          dragOnTop: false
        });

        anchor.on('dragmove', event => {
          update(anchor);
          layer.draw();
        });

        anchor.on('mousedown touchstart', event => {
          group.draggable(false);
          layer.draw();
        });
        anchor.on('dragend', event => {
          group.draggable(true);
          layer.draw();
        });
        anchor.on('mouseover', event => {
          console.log(anchor.draggable());
          document.body.style.cursor = [
            'se-resize',
            'ne-resize',
            'sw-resize',
            'nw-resize'
          ][i];
          anchor.strokeWidth(2);
          layer.draw();
        });
        anchor.on('mouseout', event => {
          document.body.style.cursor = 'default';
          anchor.strokeWidth(1);
          layer.draw();
        });
        group.add(anchor);
      }
    }

    function update(activeAnchor: Konva.Circle) {
      const group = activeAnchor.getParent();
      const topLeft = group.find('.__anchor_top_left')[0];
      const topRight = group.find('.__anchor_top_right')[0];
      const bottomLeft = group.find('.__anchor_bottom_left')[0];
      const bottomRight = group.find('.__anchor_bottom_right')[0];
      const child = group.children[0];

      const anchorX = activeAnchor.x();
      const anchorY = activeAnchor.y();

      switch (activeAnchor.name()) {
        case '__anchor_top_left': {
          topRight.y(anchorY);
          bottomLeft.x(anchorX);
          break;
        }
        case '__anchor_top_right': {
          topLeft.y(anchorY);
          bottomRight.x(anchorX);
          break;
        }
        case '__anchor_bottom_right': {
          bottomLeft.y(anchorY);
          topRight.x(anchorX);
          break;
        }
        case '__anchor_bottom_left': {
          bottomRight.y(anchorY);
          topLeft.x(anchorX);
          break;
        }
      }
      child.position(topLeft.position());
      const width = topRight.x() - topLeft.x();
      const height = bottomLeft.y() - topLeft.y();

      if (width && height) {
        child.width(width);
        child.height(height);
      }
    }
  }

  static checkInSomeGroup(layer: Konva.Layer, stage: Konva.Stage, group: Konva.Group) {
    type PointType = { x: number, y: number, w: number, h: number, id: string };

    function getAllGroupPoints() {
      const points: PointType[] = [];
      stage.find('.object').each(item => {
        const box = item.getClientRect();
        if (item === group) return;
        points.push({
          id: item.id(),
          x: box.x,
          y: box.y,
          h: box.height,
          w: box.width
        });
      });
      return points;
    }

    function getGroupPoint(node: Konva.Node) {
      const box = node.getClientRect();
      return {
        x: box.x,
        y: box.y,
        h: box.height,
        w: box.width
      };
    }

    const points = getAllGroupPoints();
    const groupPoint = getGroupPoint(group);
    const includePoints: PointType[] = [];
    points.forEach(point => {
      if (
        groupPoint.x >= point.x &&
        groupPoint.y >= point.y &&
        groupPoint.x + groupPoint.w <= point.x + point.w &&
        groupPoint.y + groupPoint.h <= point.y + point.h
      ) {
        includePoints.push(point);
      }
    });

    let minDistance = Number.MAX_SAFE_INTEGER;
    let id = '';

    const distance = (p0: { x: number, y: number }, p1: { x: number, y: number }) => {
      return Math.sqrt(Math.pow(p0.x - p1.x, 2) + Math.pow(p0.y - p1.y, 2));
    };

    includePoints.forEach(point => {
      const diff =
        distance(
          {x: groupPoint.x, y: groupPoint.y},
          {x: point.x, y: point.y}
        ) +
        distance(
          {x: groupPoint.x + groupPoint.w, y: groupPoint.y},
          {x: point.x + point.w, y: point.y}
        ) +
        distance(
          {x: groupPoint.x, y: groupPoint.y + groupPoint.h},
          {x: point.x, y: point.y + point.h}
        ) +
        distance(
          {x: groupPoint.x + groupPoint.w, y: groupPoint.y + groupPoint.h},
          {x: point.x + point.w, y: point.y + point.h}
        );
      if (diff < minDistance) {
        minDistance = diff;
        id = point.id;
      }
    });

    return id;
  }

}




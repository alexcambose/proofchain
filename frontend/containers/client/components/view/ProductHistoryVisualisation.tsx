import * as React from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  removeElements,
  isNode,
  Controls,
  MiniMap,
} from 'react-flow-renderer';
import dagre from 'dagre';
import { useEffect, useMemo, useState } from 'react';
import Edge from './visualization/Edge';
interface IProductHistoryVisualizationProps {
  history: any[];
}
const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

// In order to keep this example simple the node width and height are hardcoded.
// In a real world app you would use the correct width and height values of
// const nodes = useStoreState(state => state.nodes) and then node.__rf.width, node.__rf.height

const nodeWidth = 172;
const nodeHeight = 36;
const getLayoutedElements = (elements, direction = 'TB') => {
  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction, ranksep: 50, nodesep: 10 });

  elements.forEach((el) => {
    if (isNode(el)) {
      dagreGraph.setNode(el.id, { width: nodeWidth, height: nodeHeight });
    } else {
      dagreGraph.setEdge(el.source, el.target);
    }
  });

  dagre.layout(dagreGraph);

  return elements.map((el) => {
    if (isNode(el)) {
      const nodeWithPosition = dagreGraph.node(el.id);
      // @ts-ignore
      el.targetPosition = isHorizontal ? 'left' : 'top';
      // @ts-ignore
      el.sourcePosition = isHorizontal ? 'right' : 'bottom';

      // unfortunately we need this little hack to pass a slighltiy different position
      // to notify react flow about the change. More over we are shifting the dagre node position
      // (anchor=center center) to the top left so it matches the react flow node anchor point (top left).
      el.position = {
        x: nodeWithPosition.x - nodeWidth / 2 + Math.random() / 1000,
        y: nodeWithPosition.y - nodeHeight / 2,
      };
    }

    return el;
  });
};
const position = { x: 0, y: 0 };
const edgeType = {
  custom: Edge,
};

const generateElements = (elements, history, parentNode = null) => {
  let newElement = {};
  if (history.type === 'MATERIAL') {
    newElement = {
      id: Math.floor(Math.random() * 10000).toString(),
      type: 'input',
      data: { label: history.material.name },
      position,
    };
  } else if (history.type === 'BATCH') {
    newElement = {
      id: Math.floor(Math.random() * 10000).toString(),
      type: 'input',
      data: { label: 'a' },
      position,
    };
  } else {
    console.log(history);
  }
  if (parentNode && parentNode.id && newElement.id) {
    //add edge
    elements.push({
      id: Math.floor(Math.random() * 10000).toString(),
      source: parentNode.id,
      target: newElement.id,
      type: edgeType,
      animated: false,
    });
  }
  console.log(parentNode);
  elements.push(newElement);
  if (history.children) {
    for (let historyItem of history.children) {
      generateElements(elements, historyItem, newElement);
    }
  }
};
const ProductHistoryVisualization: React.FunctionComponent<IProductHistoryVisualizationProps> = ({
  history,
}) => {
  const elements = useMemo(() => {
    let data = [];
    generateElements(data, history);
    console.log(history, data);
    return data;
  }, [history]);
  return (
    <div style={{ height: 500, border: '1px solid black' }}>
      <ReactFlow
        nodesConnectable={false}
        elements={getLayoutedElements(elements)}
      >
        <MiniMap />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default ProductHistoryVisualization;

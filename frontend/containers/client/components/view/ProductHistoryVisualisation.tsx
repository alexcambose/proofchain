import TransactionLink from '@components/TransactionLink';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { styled } from 'baseui';
import dagre from 'dagre';
import * as React from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import ReactFlow, { Controls, isNode, MiniMap } from 'react-flow-renderer';
interface IProductHistoryVisualizationProps {
  history: any[];
  isLoading?: boolean;
}
const SmallLabel = styled('div', ({ $theme }) => ({
  ...$theme.typography.ParagraphXSmall,
  marginTop: '0 !important',
  marginBottom: '0 !important',
  fontSize: '70%',
  lineHeight: '10px',
}));
const MediumLabel = styled('div', ({ $theme }) => ({
  ...$theme.typography.ParagraphXSmall,
  lineHeight: '10px',
}));
const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

// In order to keep this example simple the node width and height are hardcoded.
// In a real world app you would use the correct width and height values of
// const nodes = useStoreState(state => state.nodes) and then node.__rf.width, node.__rf.height

const nodeWidth = 110;
const nodeHeight = 50;
const getLayoutedElements = (elements, direction = 'TB') => {
  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction, ranksep: 60, nodesep: 10 });

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

const generateElements = (elements, history, parentNode = null) => {
  let newElement: any = {};
  let edgeElement: any = {};
  if (history?.type === 'MATERIAL') {
    newElement = {
      id: history.materialInstance.uuid,
      type: 'default',

      data: {
        historyElement: history,
        onClick: history.onClick,
        label: (
          <>
            <MediumLabel>{history.material.name}</MediumLabel>
            <SmallLabel>{history.materialInstance.uuid}</SmallLabel>
          </>
        ),
      },
      style: {
        background: '#e3faff',
        border: '1px solid #025cc2',
      },
      position,
    };
  } else if (history?.type === 'BATCH') {
    newElement = {
      id: history.createEvent.event.transactionHash,
      type: 'default',
      style: {
        background: '#f5b235',
        border: '1px solid #ba9654',
      },
      data: {
        historyElement: history,
        onClick: history.onClick,

        label: (
          <>
            <FontAwesomeIcon icon="box" />
            <SmallLabel>{history.batchInstance.code}</SmallLabel>
          </>
        ),
      },
      position,
    };
  }

  if (!parentNode) {
    // @ts-ignore
    newElement.type = 'input';
    newElement.style.background = '#7d12ff';
    newElement.style.color = '#fff';
  }
  if (history?.children?.length) {
    for (let historyItem of history.children) {
      generateElements(elements, historyItem, newElement);
    }
  } else {
    //@ts-ignore
    newElement.type = 'output';
  }
  if (parentNode && parentNode.id && newElement.id) {
    //add edge
    edgeElement = {
      id: 'e' + parentNode.id + newElement.id,
      source: parentNode.id,
      target: newElement.id,
      style: {
        background: 'transparent',
      },
      animated: false,
      data: {},
    };
    let hash = null;

    if (parentNode.data.historyElement.type === 'MATERIAL') {
      hash = parentNode.data.historyElement.mintEvent.event.transactionHash;
    } else if (parentNode.data.historyElement.type === 'BATCH') {
      hash = parentNode.data.historyElement.createEvent.event.transactionHash;
    }
    edgeElement.label = (
      <>
        <TransactionLink noLink maxLength={5}>
          {hash}
        </TransactionLink>
      </>
    );
    edgeElement.data.onClick = () => history.onHashClick(hash);
    elements.push(edgeElement);
  }

  elements.push(newElement);
};
const ProductHistoryVisualization: React.FunctionComponent<IProductHistoryVisualizationProps> =
  ({ history, isLoading }) => {
    const [rfInstance, setRfInstance] = useState(null);
    const onLoad = useCallback((instance) => {
      setRfInstance(instance);
    }, []);

    const elements = useMemo(() => {
      let data = [];
      generateElements(data, history);
      rfInstance &&
        rfInstance.fitView({ padding: 0.2, includeHiddenNodes: true });

      console.log('fit');
      return data;
    }, [history, rfInstance]);
    useEffect(() => {
      setTimeout(() => {
        rfInstance &&
          rfInstance.fitView({ padding: 0.2, includeHiddenNodes: true });
        console.log('fit');
      }, 500);
    }, []);
    const onElementClick = (e, element) => {
      element?.data?.onClick &&
        element.data.onClick(element.data.historyElement);
    };

    return (
      <div style={{ height: '50vh', minHeight: 400 }}>
        <ReactFlow
          onElementClick={onElementClick}
          nodesConnectable={false}
          onLoad={onLoad}
          elements={getLayoutedElements(elements)}
        >
          {!isLoading && (
            <>
              <MiniMap
                style={{ opacity: 0.8, width: 150, height: 100 }}
                //@ts-ignore
                nodeStrokeColor={(n) => {
                  return n.style.background;
                }}
                //@ts-ignore
                nodeColor={(n) => {
                  return n.style.background;
                }}
              />
              <Controls />
            </>
          )}
        </ReactFlow>
      </div>
    );
  };

export default ProductHistoryVisualization;

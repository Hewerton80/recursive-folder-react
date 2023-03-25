import { Fragment, useState, useCallback, useMemo, useEffect } from "react";
import { GlobalStyle } from "./global";
import * as Styled from "./App.styles";
import classnames from "classnames";
import { gerarCaracteresAleatorios } from "./util/getRandom";

interface IDynamicNode {
  id: string;
  nodes?: IDynamicNode[];
  expanded?: boolean;
}

const getRandomNode = () => ({
  id: gerarCaracteresAleatorios(),
  expanded: false,
});

const nodes: IDynamicNode[] = [
  getRandomNode(),
  getRandomNode(),
  {
    ...getRandomNode(),
    nodes: [
      getRandomNode(),
      {
        ...getRandomNode(),
        nodes: [
          {
            ...getRandomNode(),
            nodes: [{ ...getRandomNode(), nodes: [getRandomNode()] }],
          },
        ],
      },
    ],
  },
  getRandomNode(),
];

function App() {
  const [dynamicNodes, setDynamicNodes] = useState<IDynamicNode[]>([]);

  useEffect(() => {
    setDynamicNodes(nodes);
  }, []);

  const handleExpand = useCallback(
    (indexsWay: number[]) => {
      console.log("indexsWay", indexsWay);
      let newDynamics = [...dynamicNodes];
      let tmpDynamicNodes = newDynamics;
      for (let i = 0; i < indexsWay.length - 1; i++) {
        tmpDynamicNodes = tmpDynamicNodes[indexsWay[i]].nodes!;
      }
      const isExanded =
        tmpDynamicNodes?.[indexsWay?.[indexsWay.length - 1]]?.expanded;
      tmpDynamicNodes[indexsWay[indexsWay.length - 1]].expanded = !isExanded;
      setDynamicNodes(newDynamics);
    },
    [dynamicNodes]
  );

  const findIndexsWay = (
    tmpDynamic: IDynamicNode[],
    nodeId: string,
    indexsWay: number[]
  ) => {
    for (let index = 0; index < tmpDynamic.length; index++) {
      const currentNodeInLoop = tmpDynamic[index];
      if (currentNodeInLoop.id === nodeId) {
        indexsWay.push(index);
        handleExpand(indexsWay);
        return;
      } else if (currentNodeInLoop?.nodes) {
        indexsWay.push(index);
        findIndexsWay(currentNodeInLoop?.nodes!, nodeId, indexsWay);
      }
    }
  };

  const getNodes = useCallback(
    (nodesArg: IDynamicNode[]) => {
      return nodesArg.map((node) => {
        const hasChildren = Number(node?.nodes?.length) > 0;
        const isExpanded = !!node?.expanded && hasChildren;
        return (
          <Fragment key={String(node.id)}>
            <Styled.NodeChild>
              <Styled.NodeContainer>
                <Styled.Node
                  className={classnames(isExpanded && "node--expanded")}
                >
                  {hasChildren && (
                    <span
                      onClick={() => findIndexsWay(dynamicNodes, node.id, [])}
                      className="node-toggle"
                    >
                      <p> {">"}</p>
                    </span>
                  )}
                  {node.id}
                </Styled.Node>
                {isExpanded && (
                  <Styled.NodeChildren>
                    {getNodes(node?.nodes!)}
                  </Styled.NodeChildren>
                )}
              </Styled.NodeContainer>
            </Styled.NodeChild>
          </Fragment>
        );
      });
    },
    [dynamicNodes]
  );

  const nodeMemp = useMemo(() => getNodes(dynamicNodes), [dynamicNodes]);

  return (
    <>
      <GlobalStyle />
      <Styled.Container>
        <div className="node-list">{nodeMemp}</div>
      </Styled.Container>
    </>
  );
}

export default App;

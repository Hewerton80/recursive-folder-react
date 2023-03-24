import { Fragment, useState, useCallback, useMemo, useEffect } from "react";
import { GlobalStyle } from "./global";
import * as Styled from "./App.styles";
import { getRange } from "./util/getRange";
import classnames from "classnames";
import { gerarCaracteresAleatorios } from "./util/getRandom";

interface IDynamicNode {
  id: string;
  nodes?: IDynamicNode[];
  expanded?: boolean;
}

const nodes: IDynamicNode[] = [
  { id: gerarCaracteresAleatorios() },
  { id: gerarCaracteresAleatorios() },
  {
    id: gerarCaracteresAleatorios(),
    nodes: [
      { id: gerarCaracteresAleatorios() },
      {
        id: gerarCaracteresAleatorios(),
        nodes: [
          {
            id: gerarCaracteresAleatorios(),
            nodes: [{ id: gerarCaracteresAleatorios() }],
          },
        ],
      },
    ],
  },
  { id: gerarCaracteresAleatorios() },
];

function App() {
  const [dynamic, setDynamic] = useState<IDynamicNode[]>([]);

  useEffect(() => {
    setDynamic(
      nodes.map((node) => ({
        ...node,
        expanded: true,
      }))
    );
  }, []);

  // const findNode = useCallback((nodeId: string) => {
  //   for (let index = 0; index < dynamic.length; index++) {
  //     if(dynamic[index].id ===  nodeId){
  //       return dynamic[index].id
  //     }
  //     if(Number(dynamic[index].nodes?.length) > 0){
  //       findNode(dynamic[index].id)
  //     }
  //   }
  // }, [dynamic]);

  const handleExpand = useCallback(
    ([...tmpDynamic]: IDynamicNode[], nodeId: string, refs: number[]) => {
      for (let index = 0; index < tmpDynamic.length; index++) {
        console.log("tmpDynamic[index]?.nodes", tmpDynamic[index]);
        if (tmpDynamic[index].id === nodeId) {
          refs.push(index);
          break;
          // tmpDynamic[index].expanded = !tmpDynamic[index].expanded;
          // setDynamic(tmpDynamic);
          // return;
        }
        if (tmpDynamic[index]?.nodes) {

          refs.push(index);
     
          handleExpand(tmpDynamic[index]?.nodes!, tmpDynamic[index].id, refs);
        }
      }

      // let refs: number,refs[] = [];
      // const findIndex = (node: IDynamicNode, index: number) => {
      //   refs.push(index);
      //   if (node.id === nodeId) {
      //     return true;
      //   } else if (Number(node?.nodes?.length) > 0) {
      //     node?.nodes?.forEach((currentNode, j) => {
      //       findIndex(currentNode, j);
      //     });
      //   }
      //   return false
      // };
      // setDynamic(([...currentDynamicsNodes]) => {
      //   for (let index = 0; index < currentDynamicsNodes.length; index++) {
      //     refs = [];
      //     const found = findIndex(currentDynamicsNodes[index], index);
      //     if (found) {
      //       console.log("refs", refs);
      //       break;
      //     }
      //   }
      //   return currentDynamicsNodes;
      // });
    },
    [dynamic]
  );

  const getNodes = useCallback((nodesArg: IDynamicNode[]) => {
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
                    onClick={() => handleExpand(nodesArg, node.id,[])}
                    className="node-toggle"
                  >
                    {">"}
                  </span>
                )}
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
  }, []);

  const nodeMemp = useMemo(() => getNodes(dynamic), [dynamic]);

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

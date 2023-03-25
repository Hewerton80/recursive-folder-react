import { useState, useMemo, useEffect, useCallback } from "react";
import { GlobalStyle } from "./global";
import * as Styled from "./App.styles";
import { generateId } from "./util/getRandom";
import Node from "./components/NodeList/Node";
import NodeList from "./components/NodeList";

interface IDynamicNode {
  id: string;
  nodes?: IDynamicNode[];
  expanded?: boolean;
}

const getRandomNode = () => ({
  id: generateId(),
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

  /* callback para monitorar a lista de nodes */
  const onChangeList = useCallback((dynamicNodeList: IDynamicNode[]) => {
    console.log("dynamicNodeList", dynamicNodeList);
  }, []);

  useEffect(() => {
    setDynamicNodes(nodes);
  }, []);

  return <NodeList dynamicNodes={dynamicNodes} onChangeList={onChangeList} />;
}

export default App;

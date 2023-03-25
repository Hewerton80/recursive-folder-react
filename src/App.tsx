import { useState, useMemo, useEffect } from "react";
import { GlobalStyle } from "./global";
import * as Styled from "./App.styles";
import { generateId } from "./util/getRandom";
import Node from './components/NodeList/Node'
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

  useEffect(() => {
    setDynamicNodes(nodes);
  }, []);

  return (<NodeList dynamicNodes={dynamicNodes} />);
}

export default App;

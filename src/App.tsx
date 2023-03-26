import { useState, useEffect, useCallback } from "react";
import NodeList from "./components/NodeList";
import { IDynamicNode } from "./types/IDynamicNode";
import { mockDynamicNodes } from './mockDynamicNodes'


function App() {
  const [dynamicNodes, setDynamicNodes] = useState<IDynamicNode[]>([]);

  /* callback para monitorar a lista de nodes */
  const onChangeList = useCallback((dynamicNodeList: IDynamicNode[]) => {
    console.log("dynamicNodeList", dynamicNodeList);
  }, []);

  useEffect(() => {
    setDynamicNodes(mockDynamicNodes);
  }, []);

  return <NodeList dynamicNodes={dynamicNodes} onChangeList={onChangeList} />;
}

export default App;

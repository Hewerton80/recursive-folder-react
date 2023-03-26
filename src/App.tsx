import { useState, useEffect, useCallback } from "react";
import NodeList from "./components/NodeList";
import { IDynamicNode } from "./types/IDynamicNode";
import { mockDynamicNodes } from "./mockDynamicNodes";
import ModalRight from "./components/ModalRight";

function App() {
  const [dynamicNodes, setDynamicNodes] = useState<IDynamicNode[]>([]);
  const [showModalRight, setShowModalRight] = useState(false)
  const [nodeSelectedInfo, setNodeSelectedInfo] = useState<IDynamicNode>()

  /* callback para monitorar a lista de nodes */
  const onChangeList = useCallback((dynamicNodeList: IDynamicNode[]) => {
  }, []);

  const onSelectedNode = useCallback((nodeSelected: IDynamicNode) => {
    if(!nodeSelected){
      setShowModalRight(false)
    } else {
      setNodeSelectedInfo(nodeSelected)
      setShowModalRight(true)
    }
  }, [])

  useEffect(() => {
    setDynamicNodes(mockDynamicNodes);
  }, []);

  return (
    <>
      <NodeList dynamicNodes={dynamicNodes} onChangeList={onChangeList} onSelectedNode={onSelectedNode} />;
      <ModalRight show={showModalRight}>
        <label>{nodeSelectedInfo?.id}</label>
        <label>{nodeSelectedInfo?.title}</label>
        <label>{nodeSelectedInfo?.subTitle}</label>
        <label>{nodeSelectedInfo?.description}</label>
      </ModalRight>
    </>
  );
}

export default App;

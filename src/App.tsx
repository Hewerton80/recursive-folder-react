import { useState, useEffect, useCallback } from "react";
import NodeList from "./components/NodeList";
import { IDynamicNode, INode } from "./types/IDynamicNode";
import { mockDynamicNodes, mockNodes } from "./mockDynamicNodes";
import ModalRight from "./components/ModalRight";
import { flatten } from "lodash";

function App() {
  const [nodes, setNodes] = useState<INode[]>([]);
  const [dynamicNodes, setDynamicNodes] = useState<IDynamicNode[]>([]);
  const [showModalRight, setShowModalRight] = useState(false);
  const [nodeSelectedInfo, setNodeSelectedInfo] = useState<IDynamicNode>();

  /* callback para monitorar a lista de nodes */
  const onChangeList = useCallback((dynamicNodeList: IDynamicNode[]) => {}, []);

  const onSelectedNode = useCallback((nodeSelected: IDynamicNode) => {
    if (!nodeSelected) {
      setShowModalRight(false);
    } else {
      setNodeSelectedInfo(nodeSelected);
      setShowModalRight(true);
    }
  }, []);

  const  handleMapNodeToDynamicNode = useCallback((nodes: IDynamicNode[]) => {
    const nodeMap: any = {};
    const roots: IDynamicNode[] = [];
    // Criar um mapa de pastas usando o ID como chave
    nodes.forEach((node) => {
      node.nodes = [];
      nodeMap[node.id] = node;
    });
    // Adicionar cada pasta filho à pasta pai correspondente
    nodes.forEach((node) => {
      if (node.fatherId) {
        const parentNode = nodeMap[node.fatherId];
        parentNode.nodes.push(node);
      } else {
        roots.push(node);
      }
    });
    console.log('roots', roots)
    return roots;
  }, [])

  
  useEffect(() => {
    setDynamicNodes(handleMapNodeToDynamicNode(mockNodes));
    setNodes(mockNodes);
  }, [mockNodes, handleMapNodeToDynamicNode]);

  return (
    <>
      <NodeList
        dynamicNodes={dynamicNodes}
        onChangeList={onChangeList}
        onSelectedNode={onSelectedNode}
      />
      ;
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

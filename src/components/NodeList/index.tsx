import { useCallback, useEffect, useMemo, useState } from "react";
import { GlobalStyle } from "../../global";
import { IDynamicNode } from "../../types/IDynamicNode";
import Node from "./Node";
import * as Styled from "../../App.styles";

interface INodeListProps {
  dynamicNodes: IDynamicNode[];

  // callback para monitorar todas as alterações na lista de nodes
  onChangeList?: (dynamicNodeList: IDynamicNode[]) => void;
}

export default function NodeList({
  dynamicNodes,
  onChangeList,
}: INodeListProps) {
  const [dynamicNodeList, setDynamicNodeList] = useState<IDynamicNode[]>([]);

  useEffect(() => {
    onChangeList?.(dynamicNodeList);
  }, [dynamicNodeList, onChangeList]);

  const onChangeNodeChild = useCallback((nodeChanged: IDynamicNode) => {
    setDynamicNodeList(([...currentDynamicNodeList]) => {
      const indexChildChanged = currentDynamicNodeList?.findIndex(
        (child) => child.id === nodeChanged.id
      );
      currentDynamicNodeList[indexChildChanged] = nodeChanged;
      return currentDynamicNodeList;
    });
  }, []);

  const onRequestRemoveChild = useCallback(
    (nodeRequestToRemove: IDynamicNode) => {
      setDynamicNodeList(([ ...currentDynamicNodeList ]) => {
        if (currentDynamicNodeList?.length > 0) {
          currentDynamicNodeList = currentDynamicNodeList?.filter(
            (child) => child.id !== nodeRequestToRemove.id
          );
        }
        return currentDynamicNodeList;
      });
    },
    []
  );

  const nodeMemp = useMemo(() => {
    return dynamicNodeList?.map((node) => (
      <Node
        dynamicNodeData={node}
        key={node.id}
        onChangeNodeChild={onChangeNodeChild}
        onRequestRemoveChild={onRequestRemoveChild}
      />
    ));
  }, [dynamicNodeList, onRequestRemoveChild, onChangeNodeChild]);

  useEffect(() => {
    setDynamicNodeList(dynamicNodes);
  }, [dynamicNodes]);

  return (
    <>
      <GlobalStyle />
      <Styled.Container>
        <div className="node-list">{nodeMemp}</div>
      </Styled.Container>
    </>
  );
}

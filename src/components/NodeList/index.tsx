import { useCallback, useEffect, useMemo, useState } from "react";
import { GlobalStyle } from "../../global";
import { IDynamicNode } from "../../types/IDynamicNode";
import Node from "./Node";
import * as Styled from "../../App.styles";

interface INodeListProps {
  dynamicNodes: IDynamicNode[];
}

export default function NodeList({ dynamicNodes }: INodeListProps) {
  const [dynamicNodeList, setDynamicNodeList] = useState<IDynamicNode[]>([]);

  useEffect(
    () => console.log("dynamicNodeList", dynamicNodeList),
    [dynamicNodeList]
  );

  const onChangeNodeChildren = useCallback((nodeChanged: IDynamicNode) => {
    setDynamicNodeList(([...currentDynamicNodeList]) => {
      const indexChildChanged = currentDynamicNodeList?.findIndex(
        (child) => child.id === nodeChanged.id
      );
      currentDynamicNodeList[indexChildChanged] = nodeChanged;
      return currentDynamicNodeList;
    });
  }, []);

  const nodeMemp = useMemo(() => {
    return dynamicNodeList?.map((node) => (
      <Node
        dynamicNodeData={node}
        key={node.id}
        onChangeNodeChildren={onChangeNodeChildren}
      />
    ));
  }, [dynamicNodeList]);

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

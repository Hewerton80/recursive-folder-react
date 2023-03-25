import { IDynamicNode } from "../../../types/IDynamicNode";
import * as Styled from "../../../App.styles";
import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import classNames from "classnames";
import { generateId } from "../../../util/getRandom";

interface INodeProps {
  dynamicNodeData: IDynamicNode;
  onChangeNodeChildren?: (nodeChanged: IDynamicNode) => void;
}

export default function Node({ dynamicNodeData, onChangeNodeChildren }: INodeProps) {

  const [dynamicNode, setDynamicNode] = useState<IDynamicNode>(dynamicNodeData);

  /* Toda vez que tiver uma alteração no filho vai cair aqui e atualizar o filho desse node  */
  const handleNodeChanged = useCallback((nodeChanged: IDynamicNode) => {
    setDynamicNode(({...currentDynamicNode}) => {
      const indexNodeChildChanged = currentDynamicNode?.nodes?.findIndex(child => child.id === nodeChanged.id)
      currentDynamicNode.nodes![indexNodeChildChanged!] = nodeChanged
      return currentDynamicNode
    } )
  }, [onChangeNodeChildren])

  const HandleGetNodes = useCallback((nodesArg: IDynamicNode[]) => {
    return nodesArg.map((nodeArg) => <Node dynamicNodeData={nodeArg} key={nodeArg.id} onChangeNodeChildren={handleNodeChanged} />);
  }, []);

  const handleAddChildNode = useCallback(() => {
    setDynamicNode(({ ...currentDynamicNode }) => {
      currentDynamicNode.expanded = true
      if(!currentDynamicNode?.nodes?.length){
        currentDynamicNode.nodes = []
      }
      currentDynamicNode.nodes  = [...currentDynamicNode.nodes, { id: `__${generateId()}__`, expanded: false } ]
      return currentDynamicNode
    })

  }, []);

  const NodeElement = useMemo(() => {
    const hasChildren = Number(dynamicNode?.nodes?.length) > 0;
    const isExpanded = dynamicNode?.expanded && hasChildren;

    return (
      <Fragment key={String(dynamicNode.id)}>
        <Styled.NodeChild>
          <Styled.NodeContainer>
            <Styled.Node className={classNames(isExpanded && "node--expanded")}>
              {hasChildren && (
                <span
                  onClick={() =>
                    setDynamicNode(({ ...currentDynamicNode }) => {
                      currentDynamicNode.expanded = !currentDynamicNode?.expanded;
                      return currentDynamicNode;
                    })
                  }
                  className="node-toggle"
                >
                  <p> {">"}</p>
                </span>
              )}
              {dynamicNode.id}
              <span className="add-node" onClick={handleAddChildNode}>
                +
              </span>
            </Styled.Node>
            {isExpanded && (
              <Styled.NodeChildren>
                {HandleGetNodes(dynamicNode?.nodes!)}
              </Styled.NodeChildren>
            )}
          </Styled.NodeContainer>
        </Styled.NodeChild>
      </Fragment>
    );
  }, [dynamicNode, HandleGetNodes]);

  /* Toda vez que esse node sofre alguma alteração vai enviar seus dados para o pai  */
  useEffect(() => {
    onChangeNodeChildren?.(dynamicNode)
  }, [onChangeNodeChildren, dynamicNode])

  return NodeElement;
}

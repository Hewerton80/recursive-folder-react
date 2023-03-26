import { IDynamicNode } from "../../../types/IDynamicNode";
import * as Styled from "../../../App.styles";
import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import classNames from "classnames";
import { generateId } from "../../../util/getRandom";

interface INodeProps {
  dynamicNodeData: IDynamicNode;
  enableAddNode?: boolean;

  /* callback enviar as alterações do node */
  onChangeNodeChild?: (nodeChanged: IDynamicNode) => void;
  onRequestRemoveChild?: (nodeRequestToRemove: IDynamicNode) => void;
}

export default function Node({
  dynamicNodeData,
  onChangeNodeChild,
  onRequestRemoveChild,
}: INodeProps) {
  const [dynamicNode, setDynamicNode] = useState<IDynamicNode>(dynamicNodeData);

  /* Toda vez que tiver uma alteração no filho vai cair aqui e atualizar o filho desse node  */
  const handleNodeChange = useCallback((nodeChanged: IDynamicNode) => {
    setDynamicNode(({ ...currentDynamicNode }) => {
      const indexNodeChildChanged = currentDynamicNode?.nodes?.findIndex(
        (child) => child.id === nodeChanged.id
      );
      currentDynamicNode.nodes![indexNodeChildChanged!] = nodeChanged;
      return currentDynamicNode;
    });
  }, []);

  /* Toda vez que um node filho pedir para ser removido vai cair aqui para removelo deste node   */
  const handleNodeRemove = useCallback((nodeRequestToRemove: IDynamicNode) => {
    setDynamicNode(({ ...currentDynamicNode }) => {
      currentDynamicNode.nodes = currentDynamicNode.nodes?.filter(child => child.id !== nodeRequestToRemove.id)
      if(!currentDynamicNode?.nodes?.length){
        currentDynamicNode.expanded = false
      }
      return currentDynamicNode;
    });
  }, []);

  const HandleGetNodes = useCallback((nodesArg: IDynamicNode[]) => {
    return nodesArg.map((nodeArg) => (
      <Node
        dynamicNodeData={nodeArg}
        key={nodeArg.id}
        onChangeNodeChild={handleNodeChange}
        onRequestRemoveChild={handleNodeRemove}
      />
    ));
  }, [handleNodeChange, handleNodeRemove]);

  const handleAddChildNode = useCallback(() => {
    setDynamicNode(({ ...currentDynamicNode }) => {
      currentDynamicNode.expanded = true;
      if (!currentDynamicNode?.nodes?.length) {
        currentDynamicNode.nodes = [];
      }
      currentDynamicNode.nodes = [
        ...currentDynamicNode.nodes,
        { id: `__${generateId()}__`, expanded: false },
      ];
      return currentDynamicNode;
    });
  }, []);

  const handleRemoveChild = useCallback((node: IDynamicNode) => {
    onRequestRemoveChild?.(node)
  }, [onRequestRemoveChild])

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
                      currentDynamicNode.expanded =
                        !currentDynamicNode?.expanded;
                      return currentDynamicNode;
                    })
                  }
                  className="node-toggle"
                >
                  <p> {">"}</p>
                </span>
              )}
              <div className="content">
                <p className="title">{dynamicNode?.title}</p>
                <p className="sub-title">{dynamicNode?.subTitle}</p>
                <p className="description">{dynamicNode?.description}</p>
              </div>
              <div className="actions">
                <span className="remove-node" onClick={() => handleRemoveChild(dynamicNode)}>
                  -
                </span>
                <span className="add-node" onClick={handleAddChildNode}>
                  +
                </span>
              </div>
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
  }, [dynamicNode, HandleGetNodes, handleAddChildNode]);

  /* Toda vez que esse node sofre alguma alteração vai enviar seus dados para o pai  */
  useEffect(() => {
    onChangeNodeChild?.(dynamicNode);
  }, [onChangeNodeChild, dynamicNode]);

  return NodeElement;
}

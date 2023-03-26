import styled from "styled-components";
import classnames from "classnames";

export const Container = styled.div`
  display: flex;
  padding: 32px;
  .node-list {
    display: flex;
    flex-direction: column;
  }
`;

export const NodeContainer = styled.div.attrs(() => ({
  className: "node-container",
}))`
  position: relative;
  margin: 0 0 16px 16px;
  &::before {
    position: absolute;
    left: -23px;
    top: -6px;
    border-left: 2px solid #8d8d8d;
    color: #0f62fe;
    content: "";
    display: block;
    height: 18px;
    width: 0;
  }
`;

export const NodeChild = styled.div.attrs(() => ({
  className: "node-child",
}))`
  &::before {
    position: absolute;
    height: 0px;
    left: -23px;
    padding: 10px;
    top: -16px;
  }
  &:not(:last-child) > .node-container::after {
    border-left: 2px solid #8d8d8d;
    content: "";
    display: block;
    height: 100%;
    left: -23px;
    position: absolute;
    top: 12px;
    width: 0;
  }
`;

export const NodeChildren = styled.div.attrs(() => ({
  className: "node-children",
}))`
  margin-left: 28px;
  margin-top: 1rem;
`;

export const Node = styled.div.attrs((props) => ({
  className: classnames("node", props?.className),
  ...props,
}))`
  display: flex;
  background-color: #fff;
  border: 1px solid #8d8d8d;
  display: flex;
  height: 90px;
  outline: none;
  position: relative;
  width: 460px;
  &::before {
    position: absolute;
    top: 0;
    left: -24px;
    border-bottom: 2px solid #8d8d8d;
    border-bottom-left-radius: 50%;
    border-left: 2px solid #8d8d8d;
    content: "";
    display: block;
    height: 47px;
    padding: 0;
    width: 22px;
  }
  &.node--expanded {
    &::after {
      content: "";
      position: absolute;
      left: 20px;
      bottom: -30px;
      border-left: 2px solid #8d8d8d;
      display: block;
      height: 9px;
      padding: 10px;
      width: 0;
    }
    & > span p {
      transform: rotate(90deg);
    }
  }
  .node-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: 1px solid #8d8d8d;
    cursor: pointer;
    height: 100%;
    width: 36px;
    color: #0f62fe;
  }
  .content {
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: start;
  }
  .content .title {
    font-weight: bold;
    font-size: 14px;
  }
  .content .sub-title {
    color: #6b6b6b;
    font-size: 12px;
    margin-bottom: auto;

  }
  .content .description {
    color: #6b6b6b;
    font-size: 12px;
    margin-bottom: auto;

  }
  .actions {
    cursor: pointer;
    position: absolute;
    top: -5px;
    right: 5px;
    font-size: 20px;
    display: flex;
    gap: 4px;
    margin-top: 10px;
  }
  .add-node, .remove-node {
    background-color: #f2f2f2;
    background-color: #f2f2f2;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 8px;
    border-radius: 50%;
    transition: ease 0.5s;
  }
  .add-node:hover, .remove-node:hover {
    background-color: #999;
    opacity: 0.5;
  }
`;

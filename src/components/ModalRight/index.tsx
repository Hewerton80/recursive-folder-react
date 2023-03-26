import { ReactNode } from "react";
import * as Styled from "./ModalRight.styles";

interface IModalRightProps {
  children?: ReactNode;
  show?: boolean;
}

export default function ModalRight({
  children,
  show = false,
}: IModalRightProps) {
  return !show ? null : (
    <Styled.Container>
      <Styled.Content>{children}</Styled.Content>
    </Styled.Container>
  );
}

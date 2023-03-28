import { IDynamicNode, INode } from "./types/IDynamicNode";
import { generateId } from "./util/getRandom";

export const mockDynamicNodes: IDynamicNode[] = [
  {
    id: generateId(),
    expanded: false,
    title: "Você trabalha com programação?",
    subTitle: "Sim / Não",
    description: "",
    nodes: [
      {
        id: generateId(),
        expanded: false,
        title: "Quais tecnológias você mais gosta?",
        subTitle: "React / Angular / Node / Java / Aws / GCP",
        description: "Se a resposta for: Sim",
      },
      {
        id: generateId(),
        expanded: false,
        title: "Em que area você trabalha?",
        subTitle: "",
        description: "Se a resposta for: Não",
        nodes: [
          {
            id: generateId(),
            expanded: false,
            title: "Você gostaria de trabalhar com TI?",
            subTitle: "Sim / Não",
            description: "Se a resposta for: qualquer coisa",
          },
          {
            id: generateId(),
            expanded: false,
            title: "Quanto você gostaria de ganhar com TI?",
            subTitle: "Sim / Não",
            description: "Se a resposta for: qualquer coisa",
          },
        ]
      },
    ],
  },
  {
    id: generateId(),
    expanded: false,
    title: "Quanto você ganha hoje na sua aréa?",
    subTitle: "De R$ 1000,00 a R$ 1999,00 / De R$ 2000,00 a R$ 2999,00 / Acima de R$ 3000,00 ",
    description: "",
  }
]

export const mockNodes: INode[] = [
  {
    id: '1',
    title: "root 1",
    subTitle: "Sim / Não",
    description: "",
    fatherId: '',
  },
  {
    id: '2',
    title: "root 2",
    subTitle: "De R$ 1000,00 a R$ 1999,00 / De R$ 2000,00 a R$ 2999,00 / Acima de R$ 3000,00 ",
    description: "",
    fatherId: '',
  },
  {
    id: '11',
    title: "child 1 -> 1",
    subTitle: "React / Angular / Node / Java / Aws / GCP",
    description: "Se a resposta for: Sim",
    fatherId: '1',
  },
  {
    id: '12',
    title: "child 1 -> 2",
    subTitle: "",
    description: "Se a resposta for: Não",
    fatherId: '1',

  },
  {
    id: '111',
    title: "child 1 -> 1 -> 1",
    subTitle: "Sim / Não",
    description: "Se a resposta for: qualquer coisa",
    fatherId: '11',
  },
  {
    id: '112',
    title: "child 1 -> 1 -> 2",
    subTitle: "Sim / Não",
    description: "Se a resposta for: qualquer coisa",
    fatherId: '11',
  },
]
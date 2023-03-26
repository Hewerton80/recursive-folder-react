import { IDynamicNode } from "./types/IDynamicNode";
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
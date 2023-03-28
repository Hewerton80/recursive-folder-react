export interface INode {
    id: string;
    title?: string;
    subTitle?: string;
    description?: string;
    fatherId?: string
}

export interface IDynamicNode extends INode {
    expanded?: boolean;
    nodes?: IDynamicNode[];
}


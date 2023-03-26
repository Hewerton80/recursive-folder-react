export interface IDynamicNode {
    id: string;
    title?: string;
    subTitle?: string;
    description?: string;
    expanded?: boolean;
    nodes?: IDynamicNode[];
}

export interface IDynamicNode {
    id: string;
    nodes?: IDynamicNode[];
    expanded?: boolean;
}

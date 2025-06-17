export interface RawNode {
    name: string;
    text: string;
    links: string[];
}

export interface GraphNode {
    id: string;
    name: string;
    text: string;
    group?: number;
}

export interface GraphLink {
    source: string;
    target: string;
}
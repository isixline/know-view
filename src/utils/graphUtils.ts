import Graph from 'graphology';
import louvain from 'graphology-communities-louvain';

export interface RawNode {
    name: string;
    text: string;
    links: string[];
}

export interface GraphNode {
    id: string;
    text: string;
    group?: number;
}

export interface GraphLink {
    source: string;
    target: string;
}

export function computeGraphWithCommunities(rawNodes: RawNode[]): {
    nodes: GraphNode[];
    links: GraphLink[];
} {
    const graph = new Graph({ multi: true });

    // 添加节点
    rawNodes.forEach((node) => {
        graph.addNode(node.name, { text: node.text });
    });

    // 添加边
    rawNodes.forEach((node) => {
        node.links.forEach((targetName) => {
            if (graph.hasNode(node.name) && graph.hasNode(targetName)) {
                graph.addEdge(node.name, targetName);
            }
        });
    });

    // 自动分组
    const communities = louvain(graph);

    const nodes: GraphNode[] = graph.nodes().map((id) => ({
        id,
        text: graph.getNodeAttribute(id, 'text'),
        group: communities[id],
    }));

    const links: GraphLink[] = graph.edges().map((edge) => ({
        source: graph.source(edge),
        target: graph.target(edge),
    }));

    return {
        nodes,
        links,
    };
}

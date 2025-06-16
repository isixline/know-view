import Graph from 'graphology';
import louvain from 'graphology-communities-louvain';

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

function mergeSmallGroups(
    communities: Record<string, number>,
    minGroupSize: number,
    mergedGroupId: number = -1
  ): Record<string, number> {
    const groupCounts: Record<number, number> = {};
  
    // 统计每个 group 的数量
    Object.values(communities).forEach((groupId) => {
      groupCounts[groupId] = (groupCounts[groupId] || 0) + 1;
    });
  
    // 返回新 group 映射，合并小组
    const newCommunities: Record<string, number> = {};
    for (const nodeId in communities) {
      const originalGroup = communities[nodeId];
      newCommunities[nodeId] =
        groupCounts[originalGroup] >= minGroupSize ? originalGroup : mergedGroupId;
    }
  
    return newCommunities;
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
  
    // Louvain 社区发现
    const rawCommunities = louvain(graph);
    const communities = mergeSmallGroups(rawCommunities, 5); 
  
    const nodes: GraphNode[] = graph.nodes().map((id) => ({
      id,
      name: id,
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
  

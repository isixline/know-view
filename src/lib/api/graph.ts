import { fetcher } from './fetcher'
import { RawNode, GraphData } from '@/types/graph'
import { computeGraphWithCommunities } from '@/utils/graphUtils'

interface TechGraph {
    nodes: RawNode[]
}


export async function getTechGraph(): Promise<GraphData> {
    return fetcher<TechGraph>('http://127.0.0.1:5005/nodes/tech')
        .then((data) => {
            const result = computeGraphWithCommunities(data.nodes);
            result.nodes.forEach((node) => {
                node.name = node.name.replace(/^🛠️ /, "");
            });
            return result;
        })
}

export async function getIdeaGraph(): Promise<GraphData> {
    return fetcher<TechGraph>('http://127.0.0.1:5005/nodes/idea')
        .then((data) => {
            const result = computeGraphWithCommunities(data.nodes);
            return result;
        })
}
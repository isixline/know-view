"use client";

import { getIdeaGraph } from "@/lib/api/graph";
import Graph3D from "@/components/Graph3D";

export default function AutoLayoutForceGraph3D() {
    return (
        <Graph3D fetchData={getIdeaGraph} />
    );
}

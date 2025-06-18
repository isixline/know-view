'use client'

import { getTechGraph } from "@/lib/api/graph";
import Graph2D from "@/components/Graph2D";

export default function Page() {
    return (
        <Graph2D fetchData={getTechGraph} />
    );
}

"use client";

import { getIdeaGraph } from "@/lib/api/graph";
import Graph2D from "@/components/Graph2D";
import { matchIdea } from "@/lib/api/matcher";

export default function Page() {
    return (
        <Graph2D fetchData={getIdeaGraph} matchData={matchIdea} />
    );
}

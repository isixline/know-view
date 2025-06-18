"use client";

import { getTechGraph } from "@/lib/api/graph";
import Graph3D from "@/components/Graph3D";

export default function Page() {
    return (
        <Graph3D fetchData={getTechGraph} isTextNode/>
    );
}

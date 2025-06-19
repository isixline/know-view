import { fetcher } from './fetcher'
import { MatchedItem } from '@/types/matcher'

interface MatchedResult {
    results: MatchedItem[];
}

export async function matchIdea(query: string): Promise<MatchedItem[]> {
    return fetcher<MatchedResult>('http://127.0.0.1:5005/nodes/tech',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query: query }),
        }).then((data) => {
            return data.results
        })
}
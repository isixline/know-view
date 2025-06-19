export function truncateText(text: string, n: number): string {
    if (text.length <= n) {
        return text;
    } else {
        return text.slice(0, n) + '...';
    }
}

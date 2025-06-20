export async function fetcher<T>(url: string, options?: RequestInit): Promise<T> {
    const res = await fetch(url, options)
    if (!res.ok) {
      throw new Error(`API error: ${res.status}`)
    }
    return res.json()
  }
  
import type { Author, CreateAuthorInput } from "../types/Authors"

const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL ||
    "http://localhost:5000"

type ApiBook = {
    id?: number
    title?: string
    year?: number
    isbn?: string
    authorId?: number
}

type ApiAuthor = {
    id?: number
    name?: string
    bio?: string
    birthYear?: number
    country?: string
    books?: (ApiBook | null)[]
}

type AuthorsResponse = {
    value?: ApiAuthor[]
    count?: number
}

const mapAuthor = (payload: ApiAuthor, fallback?: Partial<Author>): Author => {
    const books = Array.isArray(payload?.books)
        ? payload.books
            .filter((book): book is ApiBook => Boolean(book))
            .map((b) => ({
                id: Number(b.id ?? 0),
                title: String(b.title ?? ""),
                year: Number(b.year ?? new Date().getFullYear()),
                isbn: String(b.isbn ?? ""),
                authorId: Number(b.authorId ?? payload.id ?? 0),
            }))
        : undefined

    return {
        id: Number(payload?.id) || 0,
        name: String(payload?.name ?? fallback?.name ?? "Unknown Author"),
        bio: fallback?.bio ?? null,
        birthYear: fallback?.birthYear ?? null,
        country: fallback?.country ?? null,
        books,
    }
}

export const authorsService = {
    async getAllAuthors(): Promise<Author[]> {
        try {
            const response = await fetch(`${API_BASE_URL}/authors`)
            if (!response.ok) {
                throw new Error(`Failed to fetch authors (${response.status})`)
            }
            const data = (await response.json()) as AuthorsResponse | ApiAuthor[]
            const items: ApiAuthor[] = Array.isArray((data as AuthorsResponse).value)
                ? ((data as AuthorsResponse).value as ApiAuthor[])
                : Array.isArray(data)
                    ? (data as ApiAuthor[])
                    : []
            return items.map((item) => mapAuthor(item))
        } catch (error) {
            console.error("Error fetching authors:", error)
            throw new Error("Failed to fetch authors")
        }
    },

    async createAuthor(author: CreateAuthorInput): Promise<Author> {
        try {
            const response = await fetch(`${API_BASE_URL}/authors`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: author.name }),
            })

            if (!response.ok) {
                const message = await response.text()
                throw new Error(
                    `Failed to create author (${response.status}): ${message}`
                )
            }

            const payload = await response.json()
            return mapAuthor(payload, author)
        } catch (error) {
            console.error("Error creating author:", error)
            throw new Error(
                    error instanceof Error
                        ? error.message
                        : "Failed to create author"
            )
        }
    },
}
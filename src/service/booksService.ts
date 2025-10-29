import type { Book, CreateBookInput } from "../types/Book"

const API_BASE_URL =
	import.meta.env.VITE_API_BASE_URL ||
	"http://localhost:5000"

type ApiBook = {
	id?: number
	title?: string
	year?: number
	isbn?: string
	authorId?: number
	author?: {
		id?: number
		name?: string
	}
	categories?: string[]
}

type BooksResponse = {
	value?: ApiBook[]
	count?: number
}

const mapBook = (payload: ApiBook, fallback?: Partial<Book>): Book => ({
	id: Number(payload.id ?? fallback?.id ?? 0),
	title: String(payload.title ?? fallback?.title ?? ""),
	authorId: Number(payload.authorId ?? fallback?.authorId ?? 0),
	authorName: payload.author?.name ?? fallback?.authorName ?? null,
	isbn: String(payload.isbn ?? fallback?.isbn ?? ""),
	publishedYear: Number(payload.year ?? fallback?.publishedYear ?? new Date().getFullYear()),
	description: fallback?.description ?? null,
	coverUrl: fallback?.coverUrl ?? null,
	categories: Array.isArray(payload.categories) ? payload.categories : fallback?.categories,
})

export const booksService = {
	async getAllBooks(): Promise<Book[]> {
		try {
			const response = await fetch(`${API_BASE_URL}/books`)
			if (!response.ok) {
				throw new Error(`Failed to fetch books (${response.status})`)
			}

			const data = (await response.json()) as BooksResponse | ApiBook[]
			const items: ApiBook[] = Array.isArray((data as BooksResponse).value)
				? ((data as BooksResponse).value as ApiBook[])
				: Array.isArray(data)
					? (data as ApiBook[])
					: []

			return items.map((item) => mapBook(item))
		} catch (error) {
			console.error("Error fetching books:", error)
			throw new Error("Failed to fetch books")
		}
	},

	async createBook(input: CreateBookInput): Promise<Book> {
		try {
			const response = await fetch(`${API_BASE_URL}/books`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					title: input.title,
					year: input.publishedYear,
					authorId: input.authorId,
					isbn: input.isbn,
				}),
			})

			if (!response.ok) {
				const message = await response.text()
				throw new Error(`Failed to create book (${response.status}): ${message}`)
			}

			const payload = (await response.json()) as ApiBook
			return mapBook(payload, input)
		} catch (error) {
			console.error("Error creating book:", error)
			throw new Error(
				error instanceof Error ? error.message : "Failed to create book"
			)
		}
	},

	async importByIsbn(isbn: string): Promise<Book> {
		try {
			const response = await fetch(`${API_BASE_URL}/books/import/isbn/${isbn}`, {
				method: "POST",
			})

			if (!response.ok) {
				const message = await response.text()
				throw new Error(`Import failed (${response.status}): ${message}`)
			}

			const payload = (await response.json()) as ApiBook
			return mapBook(payload)
		} catch (error) {
			console.error("Error importing book by ISBN:", error)
			throw new Error(
				error instanceof Error ? error.message : "Failed to import book"
			)
		}
	},
}

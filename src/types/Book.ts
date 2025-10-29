export type Book = {
	id: number
	title: string
	authorId: number
	authorName?: string | null
	isbn: string
	publishedYear: number
	description?: string | null
	coverUrl?: string | null
	categories?: string[]
}

export type BookSummary = {
	id: number
	title: string
	year: number
	isbn: string
	authorId: number
}

export type CreateBookInput = {
	title: string
	authorId: number
	isbn: string
	publishedYear: number
	description?: string | null
	coverUrl?: string | null
}

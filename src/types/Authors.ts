import type { BookSummary } from "./Book"

export type Author = {
	id: number
	name: string
	bio?: string | null
	birthYear?: number | null
	country?: string | null
	books?: BookSummary[]
}

export type CreateAuthorInput = {
	name: string
	bio?: string | null
	birthYear?: number | null
	country?: string | null
}

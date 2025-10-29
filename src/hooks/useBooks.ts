import { useCallback, useEffect, useState } from "react"
import { booksService } from "../service/booksService"
import type { Book, CreateBookInput } from "../types/Book"

export const useBooks = () => {
	const [books, setBooks] = useState<Book[]>([])
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

	const fetchBooks = useCallback(async () => {
		setLoading(true)
		try {
			const result = await booksService.getAllBooks()
			setBooks(result)
			setError(null)
		} catch (err) {
			const message = err instanceof Error ? err.message : "Failed to load books"
			setError(message)
		} finally {
			setLoading(false)
		}
	}, [])

	useEffect(() => {
		void fetchBooks()
	}, [fetchBooks])

	const createBook = useCallback(async (input: CreateBookInput) => {
		const created = await booksService.createBook(input)
		const enriched: Book = {
			...created,
			description: input.description ?? created.description ?? null,
			coverUrl: input.coverUrl ?? created.coverUrl ?? null,
		}
		setBooks((prev) => [...prev, enriched])
		return enriched
	}, [])

	const importBookByIsbn = useCallback(async (isbn: string) => {
		const imported = await booksService.importByIsbn(isbn)
		setBooks((prev) => {
			const index = prev.findIndex((book) => book.id === imported.id)
			if (index === -1) {
				return [...prev, imported]
			}
			const current = prev[index]
			const merged: Book = {
				...current,
				...imported,
				description: imported.description ?? current.description ?? null,
				coverUrl: imported.coverUrl ?? current.coverUrl ?? null,
			}
			const copy = [...prev]
			copy[index] = merged
			return copy
		})
		return imported
	}, [])

	return {
		books,
		loading,
		error,
		refresh: fetchBooks,
		createBook,
		importBookByIsbn,
	}
}

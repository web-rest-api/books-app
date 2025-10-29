import { useCallback, useEffect, useState } from "react"
import { authorsService } from "../service/authorService"
import type { Author, CreateAuthorInput } from "../types/Authors"

export const useAuthors = () => {
	const [authors, setAuthors] = useState<Author[]>([])
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

	const fetchAuthors = useCallback(async () => {
		setLoading(true)
		try {
			const result = await authorsService.getAllAuthors()
			setAuthors(result)
			setError(null)
		} catch (err) {
			const message = err instanceof Error ? err.message : "Failed to load authors"
			setError(message)
		} finally {
			setLoading(false)
		}
	}, [])

	useEffect(() => {
		void fetchAuthors()
	}, [fetchAuthors])

	const createAuthor = useCallback(
		async (input: CreateAuthorInput) => {
			const created = await authorsService.createAuthor(input)
			const enriched: Author = {
				...created,
				bio: input.bio ?? created.bio ?? null,
				birthYear: input.birthYear ?? created.birthYear ?? null,
				country: input.country ?? created.country ?? null,
			}
			setAuthors((prev) => [...prev, enriched])
			return enriched
		},
		[]
	)

	return {
		authors,
		loading,
		error,
		refresh: fetchAuthors,
		createAuthor,
	}
}

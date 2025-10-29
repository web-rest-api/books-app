const GOOGLE_BOOKS_API = "https://www.googleapis.com/books/v1/volumes"

export type GoogleBookSuggestion = {
	title: string
	authors: string[]
	author: string | null
	description: string | null
	publishedYear: number | null
	publishedDate: string | null
	coverUrl: string | null
	thumbnail: string | null
	isbn13: string | null
	isbn: string | null
}

type GoogleVolume = {
	volumeInfo?: {
		title?: string
		authors?: string[]
		description?: string
		publishedDate?: string
		imageLinks?: { thumbnail?: string; smallThumbnail?: string }
		industryIdentifiers?: { type?: string; identifier?: string }[]
	}
}

export const searchBooksByTitle = async (
	title: string
): Promise<GoogleBookSuggestion[]> => {
	try {
		if (!title || title.trim().length < 1) return []

		const params = new URLSearchParams({
			q: `intitle:${title}`,
			country: "US",
			maxResults: "20",
			printType: "books",
			projection: "lite",
		})

		// Optional API key support
		const key = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY
		if (key) params.set("key", String(key))

		const response = await fetch(`${GOOGLE_BOOKS_API}?${params.toString()}`)

		if (!response.ok) {
			throw new Error(`Google Books request failed: ${response.status}`)
		}

		const data = await response.json()
		if (!data.items || data.items.length === 0) {
			return []
		}

		return (data.items as GoogleVolume[])
			.map(transformGoogleBook)
			.filter(Boolean) as GoogleBookSuggestion[]
	} catch (error) {
		console.error("Error fetching books from Google Books API:", error)
		return []
	}
}

function transformGoogleBook(item: GoogleVolume): GoogleBookSuggestion | null {
	const info = item?.volumeInfo
	if (!info) return null

	// Prefer ISBN_13 if available
	const isbn13 = (info.industryIdentifiers || [])
		.find((id) => id?.type === "ISBN_13")?.identifier || null
	const otherIsbn = (info.industryIdentifiers || [])
		.find((id) => id?.type && id.type !== "ISBN_13")?.identifier || null

	const pubDate = info.publishedDate // e.g., "2003-05-01" or "2003"
	let publishedYear: number | null = null
	if (typeof pubDate === "string" && pubDate.length >= 4) {
		const year = parseInt(pubDate.slice(0, 4))
		publishedYear = Number.isFinite(year) ? year : null
	}

	// Prefer larger thumbnails if available
	let coverUrl: string | null = info.imageLinks?.thumbnail || info.imageLinks?.smallThumbnail || null
	if (coverUrl && coverUrl.startsWith("http:")) {
		coverUrl = coverUrl.replace("http:", "https:")
	}

	return {
		title: info.title || "",
		authors: Array.isArray(info.authors) ? info.authors : [],
		author: Array.isArray(info.authors) ? info.authors[0] ?? null : null,
		description: info.description ?? null,
		publishedYear,
		publishedDate: typeof pubDate === "string" ? pubDate : null,
		coverUrl,
		thumbnail: coverUrl,
		isbn13,
		isbn: isbn13 ?? otherIsbn,
	}
}
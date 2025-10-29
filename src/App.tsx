import { useCallback, useMemo, useState } from "react"
import { BookOpen } from "lucide-react"
import BookCard from "./components/BookCard"
import AuthorCard from "./components/AuthorCard"
import SearchBar from "./components/SearchBar"
import AddAuthorForm from "./components/tabs/AddAuthorForm"
import AddBookForm from "./components/tabs/AddBookForm"

import NavigationTabs from "./components/NavogationTabs"
import { useAuthors } from "./hooks/useAuthors"
import { useBooks } from "./hooks/useBooks"
import type { CreateAuthorInput } from "./types/Authors"
import type { CreateBookInput } from "./types/Book"

const App = () => {
	// State
	const [activeTab, setActiveTab] = useState("books")
	const [searchTerm, setSearchTerm] = useState("")

	const {
		authors,
		loading: authorsLoading,
		error: authorsError,
		refresh: refreshAuthors,
		createAuthor,
	} = useAuthors()
	const {
		books,
		loading: booksLoading,
		error: booksError,
		refresh: refreshBooks,
		createBook,
	} = useBooks()

	const handleAddAuthor = async (author: CreateAuthorInput) => {
		try {
			await createAuthor(author)
			setActiveTab("authors")
		} catch (error) {
			console.error("Failed to add author", error)
			alert(
				error instanceof Error
					? error.message
					: "Something went wrong while adding the author."
			)
		}
	}

	const handleAddBook = async (book: CreateBookInput) => {
		try {
			await createBook(book)
			setActiveTab("books")
		} catch (error) {
			console.error("Failed to add book", error)
			alert(
				error instanceof Error
					? error.message
					: "Something went wrong while adding the book."
			)
		}
	}

	const getAuthorById = useCallback(
		(authorId: number) => authors.find((author) => author.id === authorId),
		[authors]
	)

	const getBookCountByAuthor = useCallback(
		(authorId: number) => books.filter((book) => book.authorId === authorId).length,
		[books]
	)

	const normalizedSearch = searchTerm.trim().toLowerCase()

	const filteredBooks = useMemo(() => {
		if (!normalizedSearch) return books
		return books.filter((book) => {
			const author = authors.find((item) => item.id === book.authorId)
			return (
				book.title.toLowerCase().includes(normalizedSearch) ||
				author?.name.toLowerCase().includes(normalizedSearch) ||
				book.isbn.toLowerCase().includes(normalizedSearch)
			)
		})
	}, [books, authors, normalizedSearch])

	const filteredAuthors = useMemo(() => {
		if (!normalizedSearch) return authors
		return authors.filter((author) =>
			author.name.toLowerCase().includes(normalizedSearch)
		)
	}, [authors, normalizedSearch])

	return (
		<div className="min-h-screen bg-gray-100">
			{/* Header */}
			<header className="bg-indigo-600 text-white shadow-lg">
				<div className="container mx-auto px-4 py-6">
					<div className="flex items-center gap-3 mb-4">
						<BookOpen className="w-8 h-8" />
						<h1 className="text-3xl font-bold">Books & Authors Library</h1>
					</div>
					<SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
				</div>
			</header>

			{/* Navigation Tabs */}
			<NavigationTabs
				activeTab={activeTab}
				setActiveTab={setActiveTab}
				booksCount={filteredBooks.length}
				authorsCount={filteredAuthors.length}
			/>

			{/* Main Content */}
			<main className="container mx-auto px-4 py-8">
				{activeTab === "books" && (
					<div className="space-y-4 flex flex-col flex-wrap">
						{booksLoading ? (
							<div className="text-center py-12 text-gray-500">Loading books…</div>
						) : booksError ? (
							<div className="text-center py-12 text-gray-500 space-y-4">
								<p>Failed to load books.</p>
								<button
									onClick={() => void refreshBooks()}
									className="px-4 py-2 bg-blue-600 text-white rounded"
								>
									Try again
								</button>
							</div>
						) : filteredBooks.length > 0 ? (
							filteredBooks.map((book) => (
								<BookCard
									key={book.id}
									book={book}
									author={getAuthorById(book.authorId)}
								/>
							))
						) : (
							<div className="text-center py-12 text-gray-500">
								No books found matching your search.
							</div>
						)}
					</div>
				)}

				{activeTab === "authors" && (
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{authorsLoading ? (
							<div className="col-span-2 text-center py-12 text-gray-500">
								Loading authors…
							</div>
						) : authorsError ? (
							<div className="col-span-2 text-center py-12 text-gray-500 space-y-4">
								<p>Failed to load authors.</p>
								<button
									onClick={() => void refreshAuthors()}
									className="px-4 py-2 bg-blue-600 text-white rounded"
								>
									Try again
								</button>
							</div>
						) : filteredAuthors.length > 0 ? (
							filteredAuthors.map((author) => (
								<AuthorCard
									key={author.id}
									author={author}
									bookCount={getBookCountByAuthor(author.id)}
								/>
							))
						) : (
							<div className="col-span-2 text-center py-12 text-gray-500">
								No authors found matching your search.
							</div>
						)}
					</div>
				)}

				{activeTab === "add-author" && (
					<AddAuthorForm
						onSubmit={handleAddAuthor}
						onCancel={() => setActiveTab("authors")}
					/>
				)}

				{activeTab === "add-book" && (
					<AddBookForm authors={authors} onSubmit={handleAddBook} />
				)}
			</main>
		</div>
	)
}

export default App

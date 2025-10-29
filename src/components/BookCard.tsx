import type { Author } from "../types/Authors"
import type { Book } from "../types/Book"

interface BookCardProps {
	book: Book
	author?: Author
}

const BookCard = ({ book, author }: BookCardProps) => {
	const coverUrl = book.coverUrl ??
		(book.isbn ? `https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg` : null)
	const description = book.description ?? "No description available."
	const authorName = author?.name ?? book.authorName ?? "Unknown author"

	return (
		<div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
			<div className="flex">
				<div className="w-32 flex-shrink-0">
					{coverUrl ? (
						<img
							src={coverUrl}
							alt={book.title}
							className="w-full h-48 object-cover"
							loading="lazy"
						/>
					) : (
						<div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500 text-xs">
							No cover
						</div>
					)}
				</div>
				<div className="p-4 flex-1">
					<h3 className="text-xl font-bold text-gray-800 mb-2">{book.title}</h3>
					<p className="text-sm text-gray-600 mb-2">by {authorName}</p>
					<p className="text-sm text-gray-500 mb-3">{description}</p>
					<div className="flex gap-4 text-xs text-gray-500">
						<span>Published: {book.publishedYear}</span>
						<span>ISBN: {book.isbn}</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default BookCard

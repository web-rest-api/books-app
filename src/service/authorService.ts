import { staticAuthors } from "../mockData/staticData";
import type { Author } from "../types/Authors";

const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export const authorsService = {
    // Get all authors
    getAllAuthors: async (): Promise<Author[]> => {
        try {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve([...staticAuthors]);
                }, 500)
            })
        } catch (error) {
            console.error("Error fetching authors:", error);
            throw new Error("Failed to fetch authors");
        }
    },
    // Create a new author
    createAuthor: async (author: Omit<Author, "id">): Promise<Author> => {
        try {
            return new Promise((resolve) => {
                setTimeout(() => {
                    const newAuthor = {
                        ...author,
                        id: staticAuthors.length + 1,
                    }
                    resolve(newAuthor);
                }, 1000)
            })
        } catch (error) {
            console.error("Error creating author:", error);
            throw new Error("Failed to create author");
        }
}
}
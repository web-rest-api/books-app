import { authorsService } from "../service/authorService";
import type { Author } from "../types/Authors";
import * as React from "react";

// In component:
const fetchAuthors = async () => {
  try {
    const authors = await authorsService.getAllAuthors()
    setAuthors(authors)
  } catch (error) {
    setError("Failed to load authors")
  }
}
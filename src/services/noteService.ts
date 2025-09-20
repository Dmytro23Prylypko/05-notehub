import axios from "axios";
import type { Note } from "../types/note";

axios.defaults.baseURL = "https://notehub-public.goit.study/api";
axios.defaults.headers.common["Authorization"] = `Bearer ${
  import.meta.env.VITE_NOTEHUB_TOKEN
  }`;

interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes: (page: number, searchQuery: string) => Promise<NotesResponse> = async (page, searchQuery) => {
  const response = await axios.get<NotesResponse>(`/notes?page=${page}&search=${searchQuery}&perPage=12`);
  return response.data;
};

export const createNote: (newNote: Note) => Promise<Note> = async (newNote) => {
  const response = await axios.post<Note>("/notes", newNote);
  return response.data;
};

export const deleteNote: (noteId: string) => Promise<Note> = async (noteId) => {
  const response = await axios.delete<Note>(`/notes/${noteId}`);
  return response.data;
};

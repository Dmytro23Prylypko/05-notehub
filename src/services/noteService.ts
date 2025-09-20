import axios from "axios";
import type { Note, TagType } from "../types/note";

axios.defaults.baseURL = "https://notehub-public.goit.study/api";
axios.defaults.headers.common["Authorization"] = `Bearer ${
  import.meta.env.VITE_NOTEHUB_TOKEN
}`;

interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes: (
  page: number,
  searchQuery: string
) => Promise<NotesResponse> = async (page, searchQuery) => {
  const params: Record<string, string | number> = {
    page,
    perPage: 12,
  };
  if (searchQuery.trim() !== "") {
    params.search = searchQuery;
  }

  const response = await axios.get<NotesResponse>(
    `/notes`, { params }
  );
  return response.data;
};

export const createNote: (
  title: string,
  content: string,
  tag: TagType
) => Promise<Note> = async (title, content, tag) => {
  const response = await axios.post<Note>("/notes", {
    title,
    content,
    tag,
  });
  return response.data;
};

export const deleteNote: (noteId: string) => Promise<Note> = async (noteId) => {
  const response = await axios.delete<Note>(`/notes/${noteId}`);
  return response.data;
};

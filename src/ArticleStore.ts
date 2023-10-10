import { create } from "zustand";

export interface ArticleQurey {
  date?: string;
  writerName?: string;
  categoryId?: number;
  title?: string | "";
}

interface ArticleQueryStore {
  ArticleQuery: ArticleQurey;
  onSelectDate: (date: string) => void;
  onSelectWriter: (writerName: string) => void;
  onSelectCategory: (categoryId: number) => void;
  onSearch: (title: string | "") => void;
}

const useArticleQueryStore = create<ArticleQueryStore>((set) => ({
  ArticleQuery: {},
  onSelectDate: (date: string) =>
    set((store) => ({ ArticleQuery: { ...store.ArticleQuery, date } })),
  onSelectWriter: (writerName: string) =>
    set((store) => ({ ArticleQuery: { ...store.ArticleQuery, writerName } })),
  onSelectCategory: (categoryId: number) =>
    set((store) => ({
      ArticleQuery: { ...store.ArticleQuery, categoryId },
    })),
  onSearch: (title: string) =>
    set((store) => ({
      ArticleQuery: { ...store.ArticleQuery, title },
    })),
}));

export default useArticleQueryStore;

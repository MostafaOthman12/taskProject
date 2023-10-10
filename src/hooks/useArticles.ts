import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import { Article } from "../entities/Article";
import { ArticleQurey } from "../ArticleStore";

export const apiClient = new APIClient<Article[]>(`/Article/GetAllArticles`);

const useArticles = (articleQuery: ArticleQurey) =>
  useQuery<Article[], Error>(["Articles", articleQuery], {
    queryFn: () =>
      apiClient.getAll().then((res) => {
        console.log(res);
        return articleQuery
          ? res.filter(
              (article) =>
                (article.categoryId === articleQuery.categoryId ||
                  !articleQuery.categoryId) &&
                (article.writeName === articleQuery.writerName ||
                  !articleQuery.writerName) &&
                (articleQuery.title
                  ? article.title.includes(articleQuery.title)
                  : true)
            )
          : res;
      }),
  });

export default useArticles;

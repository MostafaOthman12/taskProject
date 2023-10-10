import { SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import useArticles from "../hooks/useArticles";
import ArticleCard from "./ArticleCard";
import useArticleQueryStore from "../ArticleStore";
interface Props {
  sortState: number;
}

const ArticleGrid = ({ sortState }: Props) => {
  const articleQuery = useArticleQueryStore((s) => s.ArticleQuery);
  const { data, error, isLoading } = useArticles(articleQuery);

  const articles = sortState
    ? data?.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA.getTime() - dateB.getTime();
      })
    : data?.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB.getTime() - dateA.getTime();
      });
  if (isLoading)
    return (
      <SimpleGrid>
        <Spinner />
      </SimpleGrid>
    );
  return (
    <SimpleGrid
      padding={7}
      columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
      spacing={4}
    >
      {error ? (
        <Text>{error.message}</Text>
      ) : (
        <>
          {articles?.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </>
      )}
    </SimpleGrid>
  );
};
export default ArticleGrid;

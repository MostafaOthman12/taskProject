import { Heading } from "@chakra-ui/react";
import useArticleQueryStore from "../ArticleStore";
import useCategories from "../hooks/useCategoris";

export const ArticleHeading = () => {
  const categoryId = useArticleQueryStore((s) => s.ArticleQuery.categoryId);
  const { data, isLoading } = useCategories();

  const categoryName = data?.find((cat) => cat.id === categoryId)?.name || "";

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <Heading marginY={5}>{categoryName} Articles</Heading>;
};

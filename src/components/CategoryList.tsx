import {
  Button,
  Heading,
  HStack,
  List,
  ListItem,
  Spinner,
} from "@chakra-ui/react";
import useCategories from "../hooks/useCategoris";
import useArticleQueryStore from "../ArticleStore";

export const CategoryList = () => {
  const categoryId = useArticleQueryStore((s) => s.ArticleQuery.categoryId);
  const setGenere = useArticleQueryStore((s) => s.onSelectCategory);
  const { data, isLoading } = useCategories();
  if (isLoading) return <Spinner />;
  return (
    <>
      <Heading fontSize={"2xl"} marginBottom={3}>
        Category
      </Heading>
      <List>
        {data?.map((category) => (
          <ListItem key={category.id} paddingY={"5px"}>
            <HStack>
              <Button
                onClick={() => setGenere(category.id)}
                variant="link"
                fontSize="lg"
                fontWeight={categoryId == category.id ? "Bold" : ""}
              >
                {category.name}
              </Button>
            </HStack>
          </ListItem>
        ))}
      </List>
    </>
  );
};

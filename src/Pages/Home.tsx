import { Box, Button, Grid, GridItem, HStack, Show } from "@chakra-ui/react";
import ArticleGrid from "../components/ArticleGrid";
import { CategoryList } from "../components/CategoryList";
import { ArticleHeading } from "../components/ArticleHeading";
import { SortSelector } from "../components/SortSelector";
import { useState } from "react";

const Home = () => {
  const [sortState, setSortState] = useState<number>(0);

  return (
    <Grid
      templateAreas={{
        base: `"main"`,
        lg: `"aside main"`,
      }}
    >
      <Show above="lg">
        <GridItem area={"aside"} paddingX={"10px"} alignItems={"flex-start"}>
          <CategoryList />
        </GridItem>
      </Show>
      <GridItem area={"main"}>
        <Box paddingX={6}>
          <ArticleHeading />
          <HStack>
            <Button onClick={() => setSortState(sortState == 0 ? 1 : 0)}>
              Date
            </Button>
            <SortSelector />
          </HStack>
        </Box>

        <ArticleGrid sortState={sortState} />
      </GridItem>
    </Grid>
  );
};
export default Home;

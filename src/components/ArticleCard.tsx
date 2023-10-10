import { Box, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useDeleteArticle from "../hooks/useDeleteArticle";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Article } from "../entities/Article";
import useActive from "../hooks/useActive";

interface Props {
  article: Article;
}

const ArticleCard = ({ article }: Props) => {
  const queryClient = useQueryClient();
  const deleteArticleMutation = useMutation(
    (id: number) => useDeleteArticle(id),
    {
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: ["Articles"] }),
    }
  );
  const handleDelete = () => {
    deleteArticleMutation.mutate(article.id);
  };

  return (
    <Box borderWidth="1px" borderRadius="md" p="4" mb="4">
      <Button>
        <Link to={`/editArticle/${article.id}`}>Edit</Link>
      </Button>
      <Button onClick={handleDelete}>Delete</Button>

      <Button
        onClick={() => {
          useActive(article.id, article.isActive).then(() =>
            queryClient.invalidateQueries({ queryKey: ["Articles"] })
          );
        }}
      >
        {article.isActive ? "DeActivate" : "Activate"}
      </Button>

      <Text>{article.id}</Text>
      <Text fontSize="lg" fontWeight="semibold" mt="2">
        {article.title}
      </Text>
      <Text mt="2">{article.body}</Text>
      <Text mt="2">Category: {article.categoryName}</Text>
      <Text mt="2">Date: {new Date(article.date).toLocaleDateString()}</Text>
      <Text mt="2">Author: {article.writeName}</Text>
    </Box>
  );
};

export default ArticleCard;

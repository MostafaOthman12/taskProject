import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useArticles from "../hooks/useArticles";

interface Article {
  id: number;
  title: string;
  body: string;
  date: string;
  userId: number;
  categoryId: number;
  isActive: boolean;
  categoryName: string;
  writeName: string;
}

const updateArticle = async (
  articleId: number,
  updatedData: Partial<Article>
): Promise<Article> => {
  const response = await fetch(`/api/articles/${articleId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });
  const data = await response.json();
  return data;
};

const EditArticle = () => {
  let { id } = useParams();
  const articleId = id ? parseInt(id) : 0;
  const article = useArticles({}).data?.find((ar) => ar.id === articleId);
  const { register, handleSubmit } = useForm();

  const mutation = useMutation((updatedData: Partial<Article>) =>
    updateArticle(articleId, updatedData)
  );

  const onSubmit = async (formData: Partial<Article>) => {
    try {
      await mutation.mutateAsync(formData);
    } catch (error) {}
  };

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <Box maxW="500px" mx="auto" p="4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input {...register("title")} defaultValue={article.title} required />
        </FormControl>

        <FormControl mt="4">
          <FormLabel>Content</FormLabel>
          <Textarea
            {...register("body")}
            defaultValue={article.body}
            required
          />
        </FormControl>

        <Button
          mt="4"
          colorScheme="teal"
          type="submit"
          isLoading={mutation.isLoading}
        >
          Save Changes
        </Button>
      </form>
    </Box>
  );
};

export default EditArticle;

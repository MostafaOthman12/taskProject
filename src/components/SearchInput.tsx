import { InputGroup, Input, InputLeftElement } from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import useArticleQueryStore from "../ArticleStore";

export const SearchInput = () => {
  const setSearch = useArticleQueryStore((s) => s.onSearch);
  const navigate = useNavigate();
  return (
    <InputGroup>
      <InputLeftElement children={<BsSearch />} />
      <Input
        onChange={(e) => {
          setSearch(e.target.value);
          navigate("/");
        }}
        variant={"outline"}
        borderRadius={25}
        placeholder="Search for Articles...."
      />
    </InputGroup>
  );
};

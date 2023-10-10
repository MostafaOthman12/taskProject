import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
} from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import useArticleQueryStore from "../ArticleStore";
import useUsers from "../hooks/useUsers";
import User from "../entities/User";

export const SortSelector = () => {
  const write = useArticleQueryStore((s) => s.ArticleQuery.writerName);
  const setSortOrder = useArticleQueryStore((s) => s.onSelectWriter);
  const { data, isLoading } = useUsers();
  const writers = data?.filter((user) => user.roleId === 0);
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        Ordered By:{" "}
        {data?.find((x: User) => x.displayName == write)?.displayName ||
          "Writer"}
      </MenuButton>
      <MenuList>
        {isLoading ? (
          <Spinner />
        ) : (
          writers?.map((writer) => (
            <MenuItem
              onClick={() => {
                setSortOrder(writer.displayName);
              }}
              key={writer.id}
            >
              {writer.displayName}
            </MenuItem>
          ))
        )}
      </MenuList>
    </Menu>
  );
};

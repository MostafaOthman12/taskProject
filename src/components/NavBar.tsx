import { HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { RiArticleFill } from "react-icons/ri";
import { ColorModeSwitch } from "./ColorModeSwitch";
import { SearchInput } from "./SearchInput";
import { useQueryClient } from "@tanstack/react-query";

export const NavBar = () => {
  const queryClient = useQueryClient();

  console.log(
    queryClient.invalidateQueries({
      queryKey: ["LogedUser"],
    })
  );
  return (
    <HStack padding={"10px"} justifyContent={"space-between"}>
      <Link to={"/"}>
        <RiArticleFill />
      </Link>
      <SearchInput />
      <ColorModeSwitch />
      {
        <>
          <Link to="login">Login</Link>
          <Link to="register">Resgister</Link>
        </>
      }
    </HStack>
  );
};

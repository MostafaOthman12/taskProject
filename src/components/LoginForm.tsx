import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  Heading,
} from "@chakra-ui/react";
import { useForm, FieldValues } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useLogin from "../hooks/useLogin";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { useState } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

const LoginForm = () => {
  const schema = z.object({
    userName: z
      .string()
      .min(5, "Username must be at least 5 characters")
      .max(20),
    password: z.string().min(8, "Password must be at least 8 characters"),
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const [userData, setUserData] = useState<FieldValues | null>(null);
  const { data: loggedUser } = useLogin(userData);
  const signIn = useSignIn();
  const auth = useAuthUser();
  const onSubmit = (data: FieldValues) => {
    setUserData(data);
    console.log(loggedUser);
    if (
      signIn({
        token: loggedUser?.Token,
        tokenType: "Bearer",
        authState: loggedUser?.loginUser,
        expiresIn: 0,
      })
    )
      console.log(auth()?.name);
    else {
      throw new Error();
    }
  };

  return (
    <Box maxW="sm" m="auto" p={4} borderWidth="1px" borderRadius="md">
      <Heading size="lg" mb={4}>
        Login
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <FormControl mb="4" isInvalid={!!errors.userName}>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              placeholder="Username"
              {...register("userName", { required: "Username is required" })}
            />
            <FormErrorMessage>
              {errors.userName?.message?.toString()}
            </FormErrorMessage>
          </FormControl>

          <FormControl mb="4" isInvalid={!!errors.password}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
            />
            <FormErrorMessage>
              {errors.password?.message?.toString()}
            </FormErrorMessage>
          </FormControl>

          <Button type="submit" isLoading={isSubmitting} colorScheme="blue">
            Login
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default LoginForm;

import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
  Select,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useRegister from "../hooks/useRegisre";
import User from "../entities/User";

const schema = z.object({
  userName: z.string().min(5, "Username must be at least 5 characters").max(20),
  displayName: z.string().min(1, "Display Name is required").max(20),
  password: z.string().min(8, "Password must be at least 8 characters"),
  roleName: z.string().min(1, "Role Name is required"),
});

function RegisterForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: User) => {
    console.log(data);

    data.roleName === "Writer" ? (data.roleId = 0) : (data.roleId = 1);
    data = { ...data, isActive: true };
    console.log(data);

    try {
      const registerUser = useRegister(data);
      await registerUser.mutateAsync();
      console.log("Registration successful");
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <Box maxWidth="400px" mx="auto" mt="4">
      <Heading mb="4">Register</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl mb="4" isInvalid={!!errors.userName}>
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            placeholder="Username"
            {...register("userName", { required: "Username is required" })}
          />
          <FormErrorMessage>{errors.userName?.message}</FormErrorMessage>
        </FormControl>
        <FormControl mb="4" isInvalid={!!errors.displayName}>
          <FormLabel>Display Name</FormLabel>
          <Input
            type="text"
            placeholder="Display Name"
            {...register("displayName")}
          />
          <FormErrorMessage>{errors.displayName?.message}</FormErrorMessage>
        </FormControl>
        <FormControl mb="4" isInvalid={!!errors.password}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
          />
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>
        <FormControl mb="4" isInvalid={!!errors.roleName}>
          <FormLabel>Role Name</FormLabel>
          <Select {...register("roleName")} placeholder="Select Role">
            <option value="Writer">Writer</option>
            <option value="SuperAdmin">Super Admin</option>
          </Select>
          <FormErrorMessage>{errors.roleName?.message}</FormErrorMessage>
        </FormControl>

        <Button type="submit" colorScheme="blue">
          Register
        </Button>
      </form>
    </Box>
  );
}

export default RegisterForm;

import { Flex, Heading, Text, Stack } from "@chakra-ui/react";
import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg="brand.gray"
    >
      <Stack minW="450px" spacing={8} mx="auto" maxW="lg" py={12} px={6}>
        <Stack align="center">
          <Heading fontSize="4xl" color="brand.dark">Sign in</Heading>
          <Text fontSize="lg" color="brand.midDark">
            to your factory account
          </Text>
        </Stack>
        <LoginForm />
      </Stack>
    </Flex>

  );
};

export default Login;
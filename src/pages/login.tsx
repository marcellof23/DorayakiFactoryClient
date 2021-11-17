import { Flex, Heading, Text, Stack } from "@chakra-ui/react";
import LoginForm from "../components/LoginForm";
import MiniAlert from "../components/MiniAlert";
import useAlert from "../hooks/useAlert";

const Login = () => {
  const { isVisible, status, message, showAlert } = useAlert();

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
        <MiniAlert
          visible={isVisible}
          status={status}
          message={message}
        />
        <LoginForm
          showAlert={showAlert}
        />
      </Stack>
    </Flex>

  );
};

export default Login;
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
} from "@chakra-ui/react";
import { TAlertStatus } from "../hooks/useAlert";

const LoginForm = ({
  showAlert
}: {
  showAlert?: (s: TAlertStatus, m: string) => void
}) => {
  
  const onLogin = () => {
    if (showAlert) showAlert("success", "Login Success!");
  }

  return (
    <Box
      rounded="lg"
      bg="brand.white"
      boxShadow="lg"
      p={8}
    >
      <Stack spacing={4}>
        <FormControl id="username">
          <FormLabel>Username</FormLabel>
          <Input type="text" />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input type="password" />
        </FormControl>
        <Stack spacing={4}>
          <Stack
            direction={{ base: "column", sm: "row" }}
            align="start"
            justify="space-between"
          >
            <Checkbox colorScheme="green">Remember me</Checkbox>
          </Stack>
          <Button
            bg="brand.primary"
            color="white"
            _hover={{
              bg: "brand.primaryFade",
            }}
            onClick={onLogin}
          >
            Sign in
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default LoginForm;
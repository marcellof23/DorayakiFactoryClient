import { useState } from "react";
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
import { authLogin, logout } from "../services/auth";
import useUser from "../context/UserContext";

const LoginForm = ({
  showAlert
}: {
  showAlert?: (s: TAlertStatus, m: string) => void
}) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { setUser } = useUser();

  const onLogin = () => {
    if (!username || !password) {
      if (showAlert) showAlert("error", "Username and password are required");
      return;
    }

    async function start() {
      const data = await authLogin(username, password);

      if (data.user) {
        setUser(data.user);
      } else {
        if (showAlert) showAlert("error", data.message || 'Unknown error');
        setUser(null);
        logout();
      }
    }

    start()
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
          <Input
            value={username}
            onChange={e => setUsername(e.target.value)}
            type="text"
          />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
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
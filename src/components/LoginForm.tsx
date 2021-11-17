import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
} from "@chakra-ui/react";

const LoginForm = () => {
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
          >
            Sign in
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default LoginForm;
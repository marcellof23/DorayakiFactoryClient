import { Alert, AlertDescription, AlertIcon, AlertTitle } from "@chakra-ui/react"
import { TAlertStatus } from "../hooks/useAlert";

const BigAlert = ({
  status,
  title,
  message,
  visible,
  ...props
}: {
  status: TAlertStatus;
  title: string;
  message: string;
  visible: boolean;
}) => {
  if (!visible) return null;

  return (
    <Alert
      {...props}
      status={status}
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="200px"
    >
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        {title}
      </AlertTitle>
      <AlertDescription maxWidth="sm">
        {message}
      </AlertDescription>
    </Alert>
  )
}

export default BigAlert;
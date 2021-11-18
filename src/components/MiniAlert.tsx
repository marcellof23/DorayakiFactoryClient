import { Alert, AlertIcon } from "@chakra-ui/react"
import { TAlertStatus } from "../hooks/useAlert";

const MiniAlert = ({
  status,
  message,
  visible,
  ...props
}: {
  status: TAlertStatus;
  message: string;
  visible: boolean;
}) => {
  if (!visible) return null;

  return (
    <Alert {...props} status={status} variant="left-accent">
      <AlertIcon />
      {message}
    </Alert>
  )
}

export default MiniAlert;
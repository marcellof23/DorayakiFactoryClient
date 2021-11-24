import { useState } from 'react'

export type TAlertStatus =
  "success" |
  "info" |
  "warning" |
  "error"

const useAlert = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [status, setStatus] = useState<TAlertStatus>("success")
  const [message, setMessage] = useState<string>("")

  const showAlert = (s: TAlertStatus, m: string): void => {
    setIsVisible(true)
    setStatus(s)
    setMessage(m)
    setTimeout(() => {
			setIsVisible(false);
		}, 2000);
  }

  return {
    isVisible,
    setIsVisible,
    status,
    message,
    showAlert
  }
}

export default useAlert;
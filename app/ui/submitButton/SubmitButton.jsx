import { Button } from "@chakra-ui/react";
import { useFormStatus } from "react-dom";

const SubmitButton = ({
  children,
  variant = "solid",
  bgColor = "transparent",
}) => {
  const { pending } = useFormStatus();

  return (
    <Button
      variant={variant}
      bgColor={bgColor}
      color={"white"}
      transition={"all 0.3s"}
      _hover={{ bgColor: "#81672e" }}
      type="submit"
      isLoading={pending}
      isDisabled={pending}
    >
      {children}
    </Button>
  );
};
export default SubmitButton;

import { IconButton, Stack } from "@chakra-ui/react";
import { FaHouseUser } from "react-icons/fa";
import { FaNoteSticky } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { FaPersonCirclePlus } from "react-icons/fa6";
export const Header = () => {
  const navigate = useNavigate();
  return (
    <Stack flexDir="row" justify="end" align="center" bg="#b0bec5" p="5">
      <IconButton
        aria-label="register"
        icon={<FaPersonCirclePlus size="20" />}
        onClick={() => navigate("/register-user")}
      />
      <IconButton
        aria-label="Users"
        icon={<FaHouseUser size="20" />}
        onClick={() => navigate("/")}
      />
      <IconButton
        aria-label="Notes"
        icon={<FaNoteSticky size="20" />}
        onClick={() => navigate("/notes")}
      />
    </Stack>
  );
};

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";
import { useUser } from "../../hooks";
import { SiGoogleforms } from "react-icons/si";
import { Header } from "../../components";

export const RegisterUserPage: React.FC = () => {
  const { registerUser } = useUser();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    error: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    setIsLoading(true);
    if (user.name && user.email) {
      const res = await registerUser({ ...user });

      if (!!res.error) {
        setUser((s) => ({
          ...s,
          error: JSON.stringify(res.error),
        }));
      } else {
        navigate("/");
        return setIsLoading(false);
      }
    } else {
      setUser((s) => ({
        ...s,
        error: "Precisa de valores nos dois campos!",
      }));
    }

    return setIsLoading(false);
  };

  return (
    <>
      <Header />
      <Stack justify="center" align="center">
        <Heading>Registrar usuário</Heading>

        <Stack flexDir="column" spacing="4">
          <FormControl isInvalid={!!user.error} w="80vh">
            <FormLabel>Nome</FormLabel>
            <Input
              id="name"
              type="text"
              placeholder="Nome"
              value={user.name}
              onChange={(e) =>
                setUser((s) => ({ ...s, name: e.target.value, error: "" }))
              }
            />
            <FormErrorMessage>{user.error}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!user.error} w="80vh">
            <FormLabel>Email</FormLabel>
            <Input
              id="email"
              type="email"
              placeholder="e-mail"
              value={user.email}
              onChange={(e) =>
                setUser((s) => ({ ...s, email: e.target.value, error: "" }))
              }
            />
            <FormErrorMessage>{user.error}</FormErrorMessage>
          </FormControl>

          <Button
            isLoading={isLoading}
            leftIcon={<SiGoogleforms size="20" />}
            onClick={handleSubmit}
          >
            Cadastrar
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

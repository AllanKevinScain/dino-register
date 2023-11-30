import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useNote } from "../../hooks";
import { SiGoogleforms } from "react-icons/si";
import { Header } from "../../components";

export const RegisterNotePage: React.FC = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { registerNote } = useNote();
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    if (userId && description.length > 5) {
      const res = await registerNote({ id_user: Number(userId), description });

      if (res.message === "Nota criada com sucesso!") {
        navigate("/notes");
        return setIsLoading(false);
      }
    }

    return setIsLoading(false);
  };

  return (
    <>
      <Header />
      <Stack justify="center" align="center">
        <Heading>Registrar Nota</Heading>

        <Stack flexDir="column" spacing="4">
          <FormControl w="80vh">
            <FormLabel>Descrição</FormLabel>
            <Textarea
              placeholder="Digite a descrição aqui"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormControl>

          <Button
            isLoading={isLoading}
            leftIcon={<SiGoogleforms size="20" />}
            onClick={handleSubmit}
          >
            Publicar nota
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

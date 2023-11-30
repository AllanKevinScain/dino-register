import { useCallback, useEffect, useState } from "react";
import {
  chakra,
  Button,
  ButtonProps,
  Heading,
  Stack,
  Skeleton,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { MdDelete } from "react-icons/md";
import { useNote } from "../../hooks";
import { NoteProps } from "../../types";
import { Header } from "../../components";
import { isEmpty } from "lodash";

const ButtonMotion = motion<ButtonProps>(Button);

export const NotesPage: React.FC = () => {
  const { getNotes, deleteNote } = useNote();
  const [notes, setNotes] = useState<NoteProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleDeleteNote = async (id: number) => {
    setIsLoading(true);

    await deleteNote(id);
    const users = await getNotes();

    setNotes(users);

    return setIsLoading(false);
  };

  const handleGetNotes = useCallback(async () => {
    const res = await getNotes();

    if (res) {
      setNotes(res);
    }

    return setIsLoading(false);
  }, [getNotes]);

  useEffect(() => {
    (async () => await handleGetNotes())();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      <Stack justify="center" align="center">
        <Heading>Lista de Notas</Heading>

        <Stack spacing="10" w="60vw">
          {isEmpty(notes) && (
            <Heading as="h2" textAlign="center">
              Nenhuma nota cadastrada
            </Heading>
          )}
          {isLoading && !isEmpty(notes) ? (
            <Stack justify="center" align="center">
              {new Array(4).fill(null).map((i) => (
                <Skeleton w="50px" h="50px" />
              ))}
            </Stack>
          ) : (
            notes.map(({ id, description, email }) => (
              <Stack
                key={email}
                flexDir="column"
                bg="#b0bec5"
                w="full"
                align="space-between"
                rounded="10px"
                overflow="hidden"
              >
                <Heading as="h6" fontSize="16">
                  {email}
                </Heading>
                <chakra.span>{description}</chakra.span>
                <ButtonMotion
                  onClick={() => handleDeleteNote(id)}
                  bg="red"
                  w="full"
                  h="40px"
                  whileHover={{ height: "50px" }}
                  _hover={{}}
                >
                  <MdDelete size="30" />
                </ButtonMotion>
              </Stack>
            ))
          )}
        </Stack>
      </Stack>
    </>
  );
};

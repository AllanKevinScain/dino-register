import {
  Button,
  ButtonProps,
  Heading,
  ListItem,
  OrderedList,
  Skeleton,
  Stack,
  chakra,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { UserProps } from "../../types";
import { motion } from "framer-motion";
import { MdDelete, MdAppRegistration } from "react-icons/md";
import { useUser } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components";
import { isEmpty } from "lodash";

const ButtonMotion = motion<ButtonProps>(Button);

export const UsersPage: React.FC = () => {
  const { getUsers, deleteUser } = useUser();
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleGetUsers = useCallback(async () => {
    const res = await getUsers();

    if (res) {
      setUsers(res);
    }

    return setIsLoading(false);
  }, [getUsers]);

  const handleDeleteUser = async (id: number) => {
    setIsLoading(true);

    await deleteUser(id);
    const users = await getUsers();

    setUsers(users);

    return setIsLoading(false);
  };

  useEffect(() => {
    (async () => await handleGetUsers())();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      <Stack justify="center" align="center">
        <Heading>Lista de Usuários</Heading>

        <OrderedList listStyleType="none" spacing="2">
          {isEmpty(users) && (
            <Heading as="h2" textAlign="center">
              Nenhum usuário cadastrado
            </Heading>
          )}
          {isLoading && !isEmpty(users) ? (
            <Stack justify="center" align="center">
              {new Array(3).fill(null).map((i) => (
                <Skeleton w="80vw" h="50px" />
              ))}
            </Stack>
          ) : (
            users.map(({ email, id, name }) => {
              return (
                <ListItem
                  key={email}
                  w="80vw"
                  h="50px"
                  bg="#b0bec5"
                  rounded="10px"
                  overflow="hidden"
                >
                  <Stack
                    flexDir="row"
                    w="full"
                    justify="space-between"
                    align="center"
                  >
                    <ButtonMotion
                      onClick={() => navigate(`/register-note/${id}`)}
                      bg="green"
                      w="20px"
                      h="50px"
                      whileHover={{ width: "50px" }}
                      _hover={{}}
                    >
                      <MdAppRegistration size="50" />
                    </ButtonMotion>
                    <Heading as="h6" fontSize="16">
                      {name}
                    </Heading>
                    <chakra.span>{email}</chakra.span>
                    <ButtonMotion
                      onClick={() => handleDeleteUser(id)}
                      bg="red"
                      w="20px"
                      h="50px"
                      whileHover={{ width: "50px" }}
                      _hover={{}}
                    >
                      <MdDelete size="50" />
                    </ButtonMotion>
                  </Stack>
                </ListItem>
              );
            })
          )}
        </OrderedList>
      </Stack>
    </>
  );
};

const headers = {
  "Content-Type": "application/json",
};

export const useUser = () => {
  const getUsers = async () => {
    const req = await fetch(`${process.env.REACT_APP_BASE_USER_URL}/get-all`, {
      method: "GET",
    });
    const res = await req.json();

    return res;
  };
  const getUser = async (id: number) => {
    const req = await fetch(`${process.env.REACT_APP_BASE_USER_URL}/getuser`, {
      method: "GET",
      headers: headers,
      body: JSON.stringify({
        id,
      }),
    });
    const res = await req.json();

    return res;
  };

  const deleteUser = async (id: number) => {
    const req = await fetch(`${process.env.REACT_APP_BASE_USER_URL}/delete`, {
      method: "DELETE",
      headers: headers,
      body: JSON.stringify({
        id,
      }),
    });
    const res = await req.json();

    return res;
  };

  const registerUser = async ({
    name,
    email,
  }: {
    name: string;
    email: string;
  }) => {
    const req = await fetch(`${process.env.REACT_APP_BASE_USER_URL}/create`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        name,
        email,
      }),
    });
    const res = await req.json();

    return res;
  };

  return {
    getUsers,
    getUser,
    deleteUser,
    registerUser,
  };
};

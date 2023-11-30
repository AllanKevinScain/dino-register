const headers = {
  "Content-Type": "application/json",
};

export const useNote = () => {
  const getNotes = async () => {
    const req = await fetch(`${process.env.REACT_APP_BASE_NOTE_URL}/get-all`, {
      method: "GET",
    });
    const res = await req.json();

    return res;
  };

  const deleteNote = async (id: number) => {
    const req = await fetch(`${process.env.REACT_APP_BASE_NOTE_URL}/delete`, {
      method: "DELETE",
      headers: headers,
      body: JSON.stringify({
        id,
      }),
    });
    const res = await req.json();

    return res;
  };

  const registerNote = async ({
    description,
    id_user,
  }: {
    id_user: number;
    description: string;
  }) => {
    const req = await fetch(`${process.env.REACT_APP_BASE_NOTE_URL}/create`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        id_user,
        description,
      }),
    });
    const res = await req.json();

    return res;
  };

  return {
    getNotes,
    deleteNote,
    registerNote,
  };
};

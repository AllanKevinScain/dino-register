import { UserProps } from "./user.type";

export interface NoteProps extends Pick<UserProps, "email"> {
  id: number;
  id_user: number;
  description: string;
}

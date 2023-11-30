import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  NotesPage,
  RegisterNotePage,
  RegisterUserPage,
  UsersPage,
} from "./pages";
import { Heading } from "@chakra-ui/react";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UsersPage />} />
        <Route path="/register-note">
          <Route index element={<RegisterNotePage />} />
          <Route path=":userId" element={<RegisterNotePage />} />
        </Route>
        <Route path="notes" element={<NotesPage />} />
        <Route path="register-user" element={<RegisterUserPage />} />
        <Route path="*" element={<Heading>Page not found</Heading>} />
      </Routes>
    </BrowserRouter>
  );
};

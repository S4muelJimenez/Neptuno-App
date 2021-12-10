import { MenuLateral } from "./components/MenuLateral.jsx";
import { User } from "./components/User.jsx";
import "../src/estilos/index.css";
import { Login } from "./components/Login";
import { Registro } from "./components/Registro.jsx";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";


import { BrowserRouter, Routes, Route } from "react-router-dom";

const httpLink = createHttpLink({
  uri: "https://neptuno-app.herokuapp.com/graphql",
});

const client = new ApolloClient({
  uri: "",
  cache: new InMemoryCache(),
});

function App() {
  return (
    // <ApolloProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/registro" element={<Registro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/usuario" element={<User />} />
        <Route path="/" />
      </Routes>

      {/* <MenuLateral /> */}
    </BrowserRouter>
    // </ApolloProvider>
  );
}

export default App;

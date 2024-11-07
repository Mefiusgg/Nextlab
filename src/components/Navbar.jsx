import {
  Avatar,
  Box,
  Button,
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
// Importa vários componentes do Chakra UI para o layout, navegação e funcionalidades visuais

import { Link } from "react-router-dom";
// Importa `Link` para navegação entre rotas

import { useAuth } from "../context/useAuth";
// Importa `useAuth` para acessar o contexto de autenticação (ex. dados do usuário e funções de login/logout)

import { HamburgerIcon, SearchIcon } from "@chakra-ui/icons";
// Ícones de hambúrguer e busca do Chakra UI

const Navbar = () => {
  const { user, signInWithGoogle, logout } = useAuth();
  // Extrai o `user` e as funções `signInWithGoogle` e `logout` do contexto de autenticação

  const { onOpen, isOpen, onClose } = useDisclosure();
  // Gerencia o estado do Drawer (aberto ou fechado) para o menu móvel

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      console.log("success");
    } catch (error) {
      console.log("errr", error);
    }
  };
  // Função para fazer login com o Google e exibir mensagens de sucesso/erro no console

  return (
    <Box py="4" mb="2">
      <Container maxW={"container.xl"}>
        <Flex justifyContent={"space-between"}>
          <Link to="/">
            <Box
              fontSize={"2xl"}
              fontWeight={"bold"}
              color={"red"}
              letterSpacing={"widest"}
              fontFamily={"mono"}
            >
              NEXTLAB
            </Box>
          </Link>
          {/* Logotipo e link para a página inicial */}

          {/* DESKTOP */}
          <Flex
            gap="4"
            alignItems={"center"}
            display={{ base: "none", md: "flex" }}
          >
            <Link to="/">Inicío</Link>
            <Link to="/movies">Filmes</Link>
            <Link to="/shows">Séries</Link>
            <Link to="/search">
              <SearchIcon fontSize={"xl"} />
            </Link>
            {/* Links de navegação para diferentes seções da aplicação (exibido apenas em desktop) */}

            {user && (
              <Menu>
                <MenuButton>
                  <Avatar
                    bg={"red.500"}
                    color={"white"}
                    size={"sm"}
                    name={user?.email}
                  />
                </MenuButton>
                <MenuList>
                  <Link to="/watchlist">
                    <MenuItem>Lista de Assistidos</MenuItem>
                  </Link>
                  <MenuItem onClick={logout}>Sair</MenuItem>
                </MenuList>
              </Menu>
            )}
            {/* Se o usuário está logado, exibe um menu com a lista de assistidos e a opção de logout */}
            
            {!user && (
              <Avatar
                size={"sm"}
                bg={"gray.800"}
                as="button"
                onClick={handleGoogleLogin}
              />
            )}
            {/* Se o usuário não está logado, exibe um avatar que inicia o login ao clicar */}
          </Flex>

          {/* MOBILE */}
          <Flex
            display={{ base: "flex", md: "none" }}
            alignItems={"center"}
            gap="4"
          >
            <Link to="/search">
              <SearchIcon fontSize={"xl"} />
            </Link>
            {/* Ícone de busca para navegação móvel */}

            <IconButton onClick={onOpen} icon={<HamburgerIcon />} />
            {/* Botão hambúrguer que abre o menu Drawer no modo móvel */}

            <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
              <DrawerOverlay />
              <DrawerContent bg={"black"}>
                <DrawerCloseButton />
                <DrawerHeader>
                  {user ? (
                    <Flex alignItems="center" gap="2">
                      <Avatar bg="red.500" size={"sm"} name={user?.email} />
                      <Box fontSize={"sm"}>
                        {user?.displayName || user?.email}
                      </Box>
                    </Flex>
                  ) : (
                    <Avatar
                      size={"sm"}
                      bg="gray.800"
                      as="button"
                      onClick={handleGoogleLogin}
                    />
                  )}
                </DrawerHeader>
                {/* Exibe o nome do usuário logado ou um avatar para login no Drawer (menu lateral) */}

                <DrawerBody>
                  <Flex flexDirection={"column"} gap={"4"} onClick={onClose}>
                    <Link to="/">Inicío</Link>
                    <Link to="/movies">Filmes</Link>
                    <Link to="/shows">Séries</Link>
                    {user && (
                      <>
                        <Link to="/watchlist">Lista de Assistidos</Link>
                        <Button
                          variant={"outline"}
                          colorScheme="red"
                          onClick={logout}
                        >
                          Sair
                        </Button>
                      </>
                    )}
                    {/* Links de navegação no Drawer (modo móvel) e opções adicionais para o usuário logado */}
                  </Flex>
                </DrawerBody>
              </DrawerContent>
            </Drawer>
            {/* Menu Drawer exibido no modo móvel */}
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
// Exporta o componente Navbar para uso em outras partes da aplicação

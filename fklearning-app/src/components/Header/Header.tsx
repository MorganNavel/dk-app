import React, { useState } from "react";
import { Navbar, Nav, NavDropdown, Container, Image } from "react-bootstrap";
import avatarDefault from "../../assets/images/avatar-default.png";
import arrowDown from "../../assets/images/arrow-down.svg";
import { User } from "../../types/User";

const Header = () => {
  const [user, setUser] = useState<User>({
    idUser: 1,
    firstname: "John",
    lastname: "Doe",
    email: "john.doe@gmail.fr",
    phone: "1234567890",
  });

  function handleSignOut() {
    setUser({
      idUser: -1,
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
    });
  }

  return (
    <Navbar
      bg="teal"
      variant="dark"
      expand="lg"
      className="p-3 bg-teal-700 text-white text-lg"
    >
      <Container className="flex items-center justify-between">
        <Navbar.Brand href="/" className="font-bold text-2xl ml-8">
          FKLearning
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="flex justify-center w-full"
        >
          <Nav className="flex space-x-8">
            <Nav.Link
              href="/catalog"
              className="hover:border-b-2 hover:border-white"
            >
              Vidéo Catalogue
            </Nav.Link>
            <Nav.Link
              href="/pricing"
              className="hover:border-b-2 hover:border-white"
            >
              Tarif des abonnements
            </Nav.Link>
            <Nav.Link
              href="/level-test"
              className="hover:border-b-2 hover:border-white"
            >
              Level Test
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        {user.idUser !== -1 ? (
          <Nav className="relative group ml-auto mr-8">
            <NavDropdown
              title={
                <div className="flex items-center cursor-pointer">
                  <Image
                    src={avatarDefault}
                    roundedCircle
                    width="30"
                    height="30"
                    className="mr-2"
                  />
                  <span className="whitespace-nowrap">
                    {user.firstname} {user.lastname}
                  </span>
                  <Image
                    src={arrowDown}
                    width="12"
                    height="12"
                    className="ml-2"
                  />
                </div>
              }
              id="basic-nav-dropdown"
              className="relative"
            >
              <div className="absolute right-0 mt-2 w-48 bg-white text-teal-700 shadow-lg rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                <NavDropdown.Item
                  href="/my-account"
                  className="flex items-center px-4 py-2 hover:bg-teal-700 hover:text-white"
                >
                  My Account
                </NavDropdown.Item>
                <NavDropdown.Item
                  href="/orders"
                  className="flex items-center px-4 py-2 hover:bg-teal-700 hover:text-white"
                >
                  Orders
                </NavDropdown.Item>
                <NavDropdown.Item
                  href="/subscription"
                  className="flex items-center px-4 py-2 hover:bg-teal-700 hover:text-white"
                >
                  Subscription
                </NavDropdown.Item>

                <NavDropdown.Divider />
                <NavDropdown.Item
                  onClick={handleSignOut}
                  className="flex items-center px-4 py-2 hover:bg-teal-700 hover:text-white"
                >
                  Sign Out
                </NavDropdown.Item>
              </div>
            </NavDropdown>
          </Nav>
        ) : (
          <Nav className="flex space-x-2 ml-auto">
            {" "}
            <Nav.Link
              href="/sign-in"
              className="border border-white px-3 py-1 rounded hover:bg-white hover:text-teal-700 transition"
            >
              Sign In
            </Nav.Link>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;

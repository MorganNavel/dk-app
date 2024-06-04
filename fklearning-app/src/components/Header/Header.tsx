import React, { useState } from "react";
import avatarDefault from "../../assets/images/avatar-default.png";
import arrowDown from "../../assets/images/arrow-down.svg";
import signOutLogo from "../../assets/images/singout.png";

import { User } from "../../types/User";
import {
  Container,
  NavDropdown,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarToggle,
  NavLink,
  Image,
} from "react-bootstrap";

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
    <>
      <Navbar className="bg-teal-700 p-4 lg:p-7 text-white">
        <Container className="flex justify-between items-center">
          {" "}
          {/* Ajoutez la classe flex pour aligner les éléments horizontalement */}
          <NavbarBrand className="font-bold text-2xl ml-8">
            FKLearning
          </NavbarBrand>
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="flex justify-center"
          >
            <Nav className="flex space-x-8 font-bold md:text-lg lg:space-x-14 text-lg xl:space-x-24 sm:text-sm  ">
              <NavLink className="group relative inline-block bg-teal-700 sm:active:bg-teal-800 transition-colors lg:active:bg-teal-700 ">
                Level Test
                <span className="rounded block max-w-0 lg:group-hover:max-w-full transition-all h-1.5 bg-white"></span>
              </NavLink>
              <NavLink className="group relative inline-block bg-teal-700 sm:active:bg-teal-800 transition-colors lg:active:bg-teal-700 ">
                Pricing
                <span className="rounded block max-w-0 lg:group-hover:max-w-full transition-all h-1.5 bg-white"></span>
              </NavLink>
              <NavLink className="group relative inline-block bg-teal-700 sm:active:bg-teal-800 transition-colors lg:active:bg-teal-700 ">
                Video Catalog
                <span className="rounded block max-w-0 lg:group-hover:max-w-full transition-all h-1.5 bg-white"></span>
              </NavLink>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="flex justify-center"
          >
            {user.idUser !== -1 ? (
              <Nav className="relative group mr-5">
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
                  <div className="absolute mt-2 w-40 bg-white text-teal-700 shadow-lg rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
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
                      <Image
                        src={signOutLogo}
                        width="20"
                        height="20"
                        className="ml-6  tint-teal-700"
                      />
                    </NavDropdown.Item>
                  </div>
                </NavDropdown>
              </Nav>
            ) : null}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;

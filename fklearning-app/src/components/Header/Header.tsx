import { useState } from "react";
import avatarDefault from "../../assets/images/avatar-default.png";
import arrowDown from "../../assets/images/arrow-down.svg";
import { IoIosLogOut } from "react-icons/io";
import { User } from "../../types/User";
import { AiOutlineMenu } from "react-icons/ai";
import {
  Container,
  NavDropdown,
  Nav,
  Navbar,
  NavbarCollapse,
  NavLink,
  Image,
} from "react-bootstrap";
import Sidebar from "../Sidebar/Sidebar";
import Drawer from "@mui/material/Drawer";

const Header = () => {
  const [user, setUser] = useState<User>({
    idUser: 1,
    firstname: "John",
    lastname: "Doe",
    email: "john.doe@gmail.fr",
    phone: "1234567890",
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  function handleToogleSidebar() {
    setIsSidebarOpen(!isSidebarOpen);
  }
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
          <div className="flex justify-start lg:hidden">
            <button onClick={handleToogleSidebar}>
              <AiOutlineMenu
                size={24}
                className="text-white"
              />
            </button>
          </div>
          <div className="font-bold text-2xl lg:ml-8 mr-8 flex-grow text-center lg:flex-grow-0">
            FKLearning
          </div>
          <NavbarCollapse
            id="basic-navbar-nav"
            className="hidden lg:flex justify-center flex-grow"
          >
            <Nav className="flex space-x-8 font-bold md:text-lg lg:space-x-14 text-lg xl:space-x-24 sm:text-sm">
              <NavLink className="group relative inline-block bg-teal-700 sm:active:bg-teal-800 transition-colors lg:active:bg-teal-700">
                Level Test
                <span className="rounded block max-w-0 lg:group-hover:max-w-full transition-all h-1.5 bg-white"></span>
              </NavLink>
              <NavLink className="group relative inline-block bg-teal-700 sm:active:bg-teal-800 transition-colors lg:active:bg-teal-700">
                Pricing
                <span className="rounded block max-w-0 lg:group-hover:max-w-full transition-all h-1.5 bg-white"></span>
              </NavLink>
              <NavLink className="group relative inline-block bg-teal-700 sm:active:bg-teal-800 transition-colors lg:active:bg-teal-700">
                Video Catalog
                <span className="rounded block max-w-0 lg:group-hover:max-w-full transition-all h-1.5 bg-white"></span>
              </NavLink>
            </Nav>
          </NavbarCollapse>
          <NavbarCollapse
            id="basic-navbar-nav"
            className="hidden lg:flex justify-center"
          >
            <Nav className="relative group mr-5">
              {user.idUser !== -1 ? (
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
                  <div className="absolute w-40 bg-white text-teal-700 shadow-lg rounded-lg hidden group-hover:block transition-opacity duration-300 z-10">
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
                      className="flex items-center px-4 py-2 text-teal-700 hover:bg-teal-700 hover:text-white"
                    >
                      Sign Out
                      <IoIosLogOut className="ml-3" />
                    </NavDropdown.Item>
                  </div>
                </NavDropdown>
              ) : (
                <>
                  <button className="flex items-center px-4 py-2 bg-teal-700 border border-white border-rounded border-2 text-white hover:bg-white hover:border-teal-700 hover:text-teal-700 transition-all duration-300 rounded-lg">
                    Sign In
                  </button>
                </>
              )}
            </Nav>
          </NavbarCollapse>
        </Container>
      </Navbar>
      <Drawer
        open={isSidebarOpen}
        onClose={handleToogleSidebar}
      >
        <Siderbar />
      </Drawer>
    </>
  );
};

export default Header;

import { useState, useEffect, useRef } from "react";
import avatarDefault from "../../assets/images/avatar-default.png";
import arrowDown from "../../assets/images/arrow-down.svg";
import { IoIosLogOut } from "react-icons/io";
import { User } from "../../types/User";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import {
  Container,
  NavDropdown,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavLink,
  Image,
  DropdownDivider,
} from "react-bootstrap";

const Header = () => {
  const [user, setUser] = useState<User>({
    idUser: 1,
    firstname: "John",
    lastname: "Doe",
    email: "john.doe@gmail.fr",
    phone: "1234567890",
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  function handleSignOut() {
    setUser({
      idUser: -1,
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
    });
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target as Node)
    ) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <>
      <Navbar className="bg-teal-700 p-4 lg:p-7 text-white">
        <Container className="flex justify-between items-center">
          <div className="flex justify-start lg:hidden">
            <button onClick={() => setIsSidebarOpen(true)}>
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

      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 lg:hidden">
          <div
            ref={sidebarRef}
            className={`fixed inset-y-0 left-0 w-64 bg-teal-700 p-4 transform transition-transform duration-300 ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-white text-2xl font-bold">FKLearning</span>
              <button onClick={() => setIsSidebarOpen(false)}>
                <AiOutlineClose
                  size={24}
                  className="text-white"
                />
              </button>
            </div>
            <nav className="flex flex-col space-y-4">
              <DropdownDivider />

              <NavLink
                className="text-white hover:bg-teal-800 p-2 rounded"
                href="/level-test"
              >
                Level Test
              </NavLink>
              <NavLink
                className="text-white hover:bg-teal-800 p-2 rounded"
                href="/pricing"
              >
                Pricing
              </NavLink>
              <NavLink
                className="text-white hover:bg-teal-800 p-2 rounded"
                href="/catalog"
              >
                Video Catalog
              </NavLink>
              <DropdownDivider />
              {user.idUser !== -1 && (
                <div className="flex flex-col space-y-4 mt-4">
                  <NavLink
                    href="/my-account"
                    className="text-white hover:bg-teal-800 p-2 rounded"
                  >
                    My Account
                  </NavLink>
                  <NavLink
                    href="/orders"
                    className="text-white hover:bg-teal-800 p-2 rounded"
                  >
                    Orders
                  </NavLink>
                  <NavLink
                    href="/subscription"
                    className="text-white hover:bg-teal-800 p-2 rounded"
                  >
                    Subscription
                  </NavLink>
                  <DropdownDivider />

                  <button
                    onClick={handleSignOut}
                    className="text-white hover:bg-teal-800 p-2 rounded flex items-center"
                  >
                    Sign Out
                    <IoIosLogOut className="ml-3" />
                  </button>
                </div>
              )}
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;

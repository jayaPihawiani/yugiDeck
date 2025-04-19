import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import yugi from "../assets/image/yugi.png";
import { DataContext } from "../context/DataContext";

const NavBars = () => {
  const { setSearch } = useContext(DataContext);
  const [src, setSrc] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(src);
  };

  return (
    <Navbar expand="lg" className="bg-dark" sticky="top">
      <Container className="container">
        <Navbar.Brand href="#">
          <img src={yugi} alt="" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Link href="#action1" className="nav-link">
              All Cards
            </Link>
            <Link href="#action2" className="nav-link">
              Link
            </Link>
          </Nav>
          <Form className="d-flex" onSubmit={handleSearch}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={(e) => setSrc(e.target.value)}
            />
            <Button variant="outline-light" type="submit">
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBars;

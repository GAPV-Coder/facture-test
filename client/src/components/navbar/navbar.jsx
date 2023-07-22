/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import logotipo from "../../../public/images/Logotipo.png"

const Navbar = () => {
	const [menuOpen, setMenuOpen] = useState(false);

	const handleMenuClick = () => {
		setMenuOpen(!menuOpen);
	};

	return (
		<>
			<nav className="navbar">
				<div className="navbar-logo">
					<Link to="/">
						<img src={logotipo} alt="logo"/>
					</Link>
				</div>
				<div className={`navbar-menu ${menuOpen ? "open" : ""}`}>
					<Link to="/">Books</Link>
					<Link to="/authors">Authors</Link>
					<Link to="/publishers">publishers</Link>
				</div>
				<div className="navbar-menu-icon" onClick={handleMenuClick}>
					{menuOpen ? <CloseOutlined /> : <MenuOutlined />}
				</div>
			</nav>
		</>
	);
};

export default Navbar;

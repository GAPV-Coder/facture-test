/* eslint-disable no-unused-vars */
import React from "react";
import { AutoComplete, Input, Button } from "antd";
import logotipoPage from "../../../public/images/Logotipo-page.png";

const BookSearch = () => {
	const handleSearch = (value) => {
		console.log("Searching for:", value);
	};

	return (
		<>
			<div className="book-container">
				<img className="image" src={logotipoPage} alt="Book Cover" />
				<div className="search-container">
					<AutoComplete
						className="search-input"
						options={[]}
						onSelect={(value) => handleSearch(value)}
					>
						<Input.Search placeholder="Search book title, author, or publisher" />
					</AutoComplete>
					<Button className="add-button">
						Add Book
					</Button>
				</div>
			</div>
		</>
	);
};

export default BookSearch;

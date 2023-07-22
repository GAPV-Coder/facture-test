/* eslint-disable no-unused-vars */
import React from "react";
import BookSearch from "../components/books/bookSearch";
import BookList from "../components/books/bookList";

const BooksPages = () => {
	return (
		<>
			<BookSearch />
			<br />
			<BookList />
		</>
	);
};

export default BooksPages;

/* eslint-disable no-unused-vars */
import React from "react";
import { List, Avatar, Space, Spin } from "antd";
import { useGetBooksQuery } from "../../redux/reducers/booksSlice";

const BookList = () => {
	const { data: books, isFetching, isError } = useGetBooksQuery();
	console.log("DATA", books);

	if (isFetching) {
		return (
			<Space size="middle">
				<Spin size="large" />
			</Space>
		);
	}

	if (isError) {
		return <div>Error fetching books</div>;
	}

	if (!Array.isArray(books)) {
        return null;
    }

	return (
		<>
			{books?.map((book) => (
				<List.Item key={book.id}>
					<List.Item.Meta
						avatar={<Avatar shape="square" src={book.bookCover} />}
						title={book.title}
						description={`Author: ${book.author}, Publisher: ${book.publisher}`}
					/>
				</List.Item>
			))}
		</>
	);
};

export default BookList;

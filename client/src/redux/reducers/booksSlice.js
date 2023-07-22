import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import ApiUrl from "../../utils/api";

const baseUrl = 'http://localhost:8080/api/v1'

export const booksApi = createApi({
	reducerPath: 'booksApi',
	baseQuery: fetchBaseQuery({ baseUrl }), 
	endpoints: (builder) => ({
		getBooks: builder.query({
			query: () => `/books`,
		}),
	}),
});

export const { useGetBooksQuery } = booksApi;

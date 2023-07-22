import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

export const fetchAuthors = createAsyncThunk("authors/fetchAuthors", async () => {
	const response = await api.get("/authors");
	return response.data;
});

const authorsSlice = createSlice({
	name: "authors",
	initialState: {
		data: [],
		status: "idle",
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAuthors.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchAuthors.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.data = action.payload;
			})
			.addCase(fetchAuthors.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	},
});

export default authorsSlice.reducer;

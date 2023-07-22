import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

export const fetchPublishers = createAsyncThunk("publishers/fetchPublishers", async () => {
	const response = await api.get("/publishers");
	return response.data;
});

const publishersSlice = createSlice({
	name: "publishers",
	initialState: {
		data: [],
		status: "idle",
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchPublishers.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchPublishers.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.data = action.payload;
			})
			.addCase(fetchPublishers.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	},
});

export default publishersSlice.reducer;

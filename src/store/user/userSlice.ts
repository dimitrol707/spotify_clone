import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import config from "../../api/config";
import { IUser } from "../../api/types";
import { IUserState, IThunkExtraArg } from "../types";
import { ApiError } from "../../api/error";
import { handleError } from "../../api/utils/handleError";

const initialState: IUserState = {
  isLoading: false,
};

export const fetchUserThunk = createAsyncThunk<
  IUser,
  void,
  { extra: IThunkExtraArg; rejectValue: ApiError }
>("user/fetchUser", async (_, { extra, rejectWithValue }) => {
  try {
    const response = await extra.api.get<IUser>(config.USER_ENDPOINT);
    return response.data;
  } catch (error) {
    return rejectWithValue(handleError(error) as ApiError);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserThunk.pending, (state) => {
      state.error = undefined;
      state.isLoading = true;
    });
    builder.addCase(fetchUserThunk.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchUserThunk.rejected, (state, action) => {
      state.user = undefined;
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;

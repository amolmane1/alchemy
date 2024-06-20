import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "../utils/types";

const initialState: UserState = {
  token: null,
  id: null,
  firstName: null,
  email: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(_state, action: PayloadAction<UserState>) {
      return action.payload;
    },
    removeUser() {
      return initialState;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;

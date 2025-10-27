import { createSlice } from "@reduxjs/toolkit";

interface ChatState {
  sessionId: string;
  triggerNewQuery: boolean;
}

const initialState: ChatState = {
  sessionId: crypto.randomUUID(),
  triggerNewQuery: false,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    newQuery: (state) => {
      state.triggerNewQuery = true;
      state.sessionId = crypto.randomUUID();
    },
    resetTrigger: (state) => {
      state.triggerNewQuery = false;
    },
  },
});

export const { newQuery, resetTrigger } = chatSlice.actions;
export default chatSlice.reducer;

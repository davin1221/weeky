import { configureStore, createSlice } from "@reduxjs/toolkit";

// 주제(Subject)
const subject = createSlice({
  name: "subject",
  initialState: [
    {
      userId: "4qPCMlanKiXhsIDIKeUrIZxi7qm1",
      subjectId: "sub1",
      subject: "영어",
      color: "#ffd6f5",
    },
    {
      userId: "4qPCMlanKiXhsIDIKeUrIZxi7qm1",
      subjectId: "sub2",
      subject: "운동",
      color: "#d6e0ff",
    },
    {
      userId: "Lfn5WQtmuIPbTIaw8vpQdDIiKs62",
      subjectId: "sub3",
      subject: "생활",
      color: "#d7ffd6",
    },
    {
      userId: "Lfn5WQtmuIPbTIaw8vpQdDIiKs62",
      subjectId: "sub4",
      subject: "코딩",
      color: "#e3d6ff",
    },
  ],
  reducers: {
    // 주제 추가
    addSubject(state, action) {
      return [...state, action.payload];
    },

    // 주제 삭제
    deleteSubject(state, action) {
      return state.filter((it) => it.subjectId != action.payload);
    },
  },
});

export let { addSubject, deleteSubject } = subject.actions;

export default configureStore({
  reducer: {
    subject: subject.reducer,
  },
});

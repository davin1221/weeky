import { configureStore, createSlice } from "@reduxjs/toolkit";

// 주제(Subject) --------------------------------------------
const subject = createSlice({
  name: "subject",
  initialState: [
    {
      userId: "4qPCMlanKiXhsIDIKeUrIZxi7qm1",
      subjectId: "sub_4qPC_영어",
      subject: "영어",
      color: "#ffd6f5",
    },
    {
      userId: "4qPCMlanKiXhsIDIKeUrIZxi7qm1",
      subjectId: "sub_4qPC_운동",
      subject: "운동",
      color: "#d6e0ff",
    },
    {
      userId: "Lfn5WQtmuIPbTIaw8vpQdDIiKs62",
      subjectId: "sub_Lfn5_생활",
      subject: "생활",
      color: "#d7ffd6",
    },
    {
      userId: "Lfn5WQtmuIPbTIaw8vpQdDIiKs62",
      subjectId: "sub_Lfn5_코딩",
      subject: "코딩",
      color: "#e3d6ff",
    },
  ],
  reducers: {
    // 주제 추가
    addSubject(state, action) { 
        // 해당 유저의 state
        const filteredState = state.filter((it)=> it.userId === action.payload.userId);
        // 조건식(주제 이름이 같은지)
        const isSubDuplicate = filteredState.some(it=> it.subject === action.payload.subject);

        if(isSubDuplicate) { 
            alert("중복된 주제입니다.");
            return state;
        } else { 
            return [...state, action.payload];
        }
    },

    // 주제 삭제
    deleteSubject(state, action) {
      return state.filter((it) => it.subjectId != action.payload);
    },
  },
});


// 한 주 계획 --------------------------------------------
const weekPlan = createSlice({
    name: "weekPlan",
    initialState: [
        {
            weekId: "wp_4qPC_1680758400000",
            wrritenDate: 1680758400000,
            userId: "4qPCMlanKiXhsIDIKeUrIZxi7qm1",
            goal: [
                {
                  weekGoalId: "wg_4qPC_헬스장5번가기",
                  weekGoalSubject: "운동",
                  weekGoalContent: "헬스장 5번 가기",
                  weekGoalComplete: true
                },
                {
                    weekGoalId: "wg_4qPC_단어200개외우기",
                    weekGoalSubject: "영어",
                    weekGoalContent: "단어 200개 외우기",
                    weekGoalComplete: false
                }
            ]
        },
        {
            weekId: "wp_4qPC_1681401600000",
            wrritenDate: 1681401600000,
            userId: "4qPCMlanKiXhsIDIKeUrIZxi7qm1",
            goal: [
                {
                    weekGoalId: "wg_4qPC_런데이3회이상",
                    weekGoalSubject: "운동",
                    weekGoalContent: "런데이 3회 이상",
                    weekGoalComplete: true
                },
                {
                  weekGoalId: "wg_4qPC_인강완강",
                  weekGoalSubject: "영어",
                  weekGoalContent: "인강 완강",
                  weekGoalComplete: false
                }
            ]
        },
        {
            weekId: "wp_Lfn5_1680758400000",
            wrritenDate: 1680758400000,
            userId: "Lfn5WQtmuIPbTIaw8vpQdDIiKs62",
            goal: [
                {
                  weekGoalId: "wg_4qPC_물2L마시기",
                  weekGoalSubject: "생활",
                  weekGoalContent: "물 2L 마시기",
                  weekGoalComplete: true
                },
                {
                    weekGoalId: "wg_4qPC_git매일push",
                    weekGoalSubject: "코딩",
                    weekGoalContent: "git 매일 push",
                    weekGoalComplete: false
                }
            ]
        },
        {
            weekId: "wp_Lfn5_1681401600000",
            wrritenDate: 1681401600000,
            userId: "Lfn5WQtmuIPbTIaw8vpQdDIiKs62",
            goal: [
                {
                    weekGoalId: "wg_4qPC_택시안타기",
                    weekGoalSubject: "생활",
                    weekGoalContent: "택시 안 타기",
                    weekGoalComplete: true
                },
                {
                  weekGoalId: "wg_4qPC_정처기1회독",
                  weekGoalSubject: "코딩",
                  weekGoalContent: "정처기 1회독",
                  weekGoalComplete: false
                }
            ]
        }
    ],
    reducers:{

    }
})

export let { addSubject, deleteSubject } = subject.actions;

export default configureStore({
  reducer: {
    subject: subject.reducer,
    weekPlan: weekPlan.reducer 
  },
});

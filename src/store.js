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


// 한 주 계획(Week Plan) --------------------------------------------
const weekPlan = createSlice({
    name: "weekPlan",
    initialState: [
        {
            weekId: "wp_4qPC_1693753200000",
            writtenDate: 1693753200000,
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
            weekId: "wp_4qPC_1694358000000",
            writtenDate: 1694358000000,
            userId: "4qPCMlanKiXhsIDIKeUrIZxi7qm1",
            goal: [
                {
                    weekGoalId: "wg_4qPC_런데이3회이상",
                    weekGoalSubject: "운동",
                    weekGoalContent: "런데이 3회 이상",
                    weekGoalComplete: false
                },
                {
                  weekGoalId: "wg_4qPC_인강완강",
                  weekGoalSubject: "영어",
                  weekGoalContent: "인강 완강",
                  weekGoalComplete: true
                }
            ]
        },
        {
            weekId: "wp_Lfn5_1693753200000",
            writtenDate: 1693753200000,
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
            weekId: "wp_Lfn5_1694358000000",
            writtenDate: 1694358000000,
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
        handleGoalComplete(state, action) {
            const newState = state.map((it)=> {
                if(it.weekId === action.payload.id) {
                    return {
                        ...it,
                        goal: it.goal.map((goal)=> {
                            if(goal.weekGoalId === action.payload.goalId){
                                return {
                                    ...goal,
                                    weekGoalComplete : !goal.weekGoalComplete
                                }
                            }
                            return goal
                        })
                    }
                }
                return it
            })
            return newState;
        }
    }
})


// 하루 계획(day Plan) --------------------------------------------
const dayPlan = createSlice({
    name: "dayPlan",
    initialState: [
        {
            dailyId: "dp_4qPCM_1693753200000",
            writtenDate: 1693753200000,
            userId: "4qPCMlanKiXhsIDIKeUrIZxi7qm1",
            goal: [
                {
                    dailyGoalId: "dg_4qPCM_영단어20개",
                    dailyGoalSubject: "영어",
                    dailyGoalContent: "영단어 20개",
                    dailyGoalComplete: true
                },
                {
                    dailyGoalId: "dg_4qPCM_문법인강2개",
                    dailyGoalSubject: "영어",
                    dailyGoalContent: "문법 인강 2개",
                    dailyGoalComplete: true
                },
                {
                    dailyGoalId: "dg_4qPCM_런데이30분",
                    dailyGoalSubject: "운동",
                    dailyGoalContent: "런데이30분",
                    dailyGoalComplete: false
                }
            ]
        },
        {
            dailyId: "dp_4qPCM_1693839600000",
            writtenDate: 1693839600000,
            userId: "4qPCMlanKiXhsIDIKeUrIZxi7qm1",
            goal: [
                {
                    dailyGoalId: "dg_4qPCM_영어작문숙제",
                    dailyGoalSubject: "영어",
                    dailyGoalContent: "영어 작문 숙제",
                    dailyGoalComplete: false
                },
                {
                    dailyGoalId: "dg_4qPCM_문법챕터3,4",
                    dailyGoalSubject: "영어",
                    dailyGoalContent: "문법 챕터 3,4",
                    dailyGoalComplete: true
                },
                {
                    dailyGoalId: "dg_4qPCM_헬스장가기",
                    dailyGoalSubject: "운동",
                    dailyGoalContent: "헬스장 가기",
                    dailyGoalComplete: false
                }
            ]
        },
        {
            dailyId: "dp_4qPCM_1693926000000",
            writtenDate: 1693926000000,
            userId: "4qPCMlanKiXhsIDIKeUrIZxi7qm1",
            goal: [
                {
                    dailyGoalId: "dg_4qPCM_숙어10개암기",
                    dailyGoalSubject: "영어",
                    dailyGoalContent: "숙어 10개 암기",
                    dailyGoalComplete: true
                },
                {
                    dailyGoalId: "dg_4qPCM_헬스장가기",
                    dailyGoalSubject: "운동",
                    dailyGoalContent: "헬스장 가기",
                    dailyGoalComplete: true
                }
            ]
        },
        {
            dailyId: "dp_4qPCM_1694012400000",
            writtenDate: 1694012400000,
            userId: "4qPCMlanKiXhsIDIKeUrIZxi7qm1",
            goal: [
                {
                    dailyGoalId: "dg_4qPCM_영단어20개",
                    dailyGoalSubject: "영어",
                    dailyGoalContent: "영단어 20개",
                    dailyGoalComplete: false
                },
                {
                    dailyGoalId: "dg_4qPCM_헬스장가기",
                    dailyGoalSubject: "운동",
                    dailyGoalContent: "헬스장 가기",
                    dailyGoalComplete: true
                }
            ]
        },
        {
            dailyId: "dp_4qPCM_1694098800000",
            writtenDate: 1694098800000,
            userId: "4qPCMlanKiXhsIDIKeUrIZxi7qm1",
            goal: [
                {
                    dailyGoalId: "dg_4qPCM_문법인강1개듣기",
                    dailyGoalSubject: "영어",
                    dailyGoalContent: "문법 인강 1개 듣기",
                    dailyGoalComplete: true
                },
                {
                    dailyGoalId: "dg_4qPCM_헬스장가기",
                    dailyGoalSubject: "운동",
                    dailyGoalContent: "헬스장 가기",
                    dailyGoalComplete: true
                }
            ]
        },
        {
            dailyId: "dp_4qPCM_1694271600000",
            writtenDate: 1694271600000,
            userId: "4qPCMlanKiXhsIDIKeUrIZxi7qm1",
            goal: [
                {
                    dailyGoalId: "dg_4qPCM_스트레침30분",
                    dailyGoalSubject: "운동",
                    dailyGoalContent: "스트레칭 30분",
                    dailyGoalComplete: true
                }
            ]
        },
    ],
    reducers:{
       handleDailyGoalComplete(state, action) {
        const newState = state.map((it)=> {
            if(it.dailyId === action.payload.id) {
                return {
                    ...it,
                    goal: it.goal.map((goal)=> {
                        if(goal.dailyGoalId === action.payload.goalId){
                            return {
                                ...goal,
                                dailyGoalComplete : !goal.weekGoalComplete
                            }
                        }
                        return goal
                    })
                }
            }
            return it
        })
        return newState;
    }
    }
})

export let { addSubject, deleteSubject } = subject.actions;
export let { handleGoalComplete } = weekPlan.actions;
export let { handleDailyGoalComplete } = dayPlan.actions;

export default configureStore({
  reducer: {
    subject: subject.reducer,
    weekPlan: weekPlan.reducer,
    dayPlan: dayPlan.reducer
  },
});

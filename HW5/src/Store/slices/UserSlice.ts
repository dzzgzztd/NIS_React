import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface UserProfile {
    name: string;
    email: string;
    avatar: string;
    group: string;
}

const initialState: UserProfile = {
    name: "Иван Иванов",
    email: "user@example.com",
    avatar: "https://via.placeholder.com/120",
    group: "Студент",
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateUser: (state, action: PayloadAction<Partial<UserProfile>>) => {
            return {...state, ...action.payload};
        },
    },
});

export const {updateUser} = userSlice.actions;
export default userSlice.reducer;

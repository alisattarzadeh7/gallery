import { configureStore } from '@reduxjs/toolkit'
import layoutReducer from "~/src/Utils/Redux/Slices/layout";
// ...

const store = configureStore({
    reducer: {
        layout:layoutReducer,
        // comments: commentsReducer,
        // users: usersReducer,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch


export default store
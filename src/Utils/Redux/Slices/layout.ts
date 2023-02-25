import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import store from "~/src/Utils/Redux/store";


type ILayoutStatesType = {
    direction:string
}



export const layoutSlice = createSlice({
    name: 'Layout',
    initialState: {
        direction: 'rtl',
        language:'fa',
        loading:false,
        mode:'light',
    },
    reducers: {
        changeDirection: (state, action: PayloadAction<'rtl' | 'ltr'>) => {
            state.direction = action.payload
        },
        changeLanguage: (state, action: PayloadAction<'fa' | 'en'>) => {
            state.language = action.payload
            state.direction = action.payload === 'fa' ? 'rtl' : 'ltr'
        },
        changeMode: (state, action: PayloadAction<'dark' | 'light'>) => {
            state.mode = action.payload
        },
        setLoading: (state, action: PayloadAction<boolean>) => void(state.loading = action.payload),
    },
})

// Action creators are generated for each case reducer function
export const { changeDirection,
    changeLanguage,
    setLoading } = layoutSlice.actions

export default layoutSlice.reducer
import {createSlice} from '@reduxjs/toolkit'

const todayPointmentSlice = createSlice({
    name : 'todayAppoitments' , 

    initialState : {
        todayAppoitments : [] ,
    },
    reducers : {
        setTodayAppoitments : (state , action) => {
            state.todayAppoitments = action.payload
        }
    }
})

export const { setTodayAppoitments } = todayPointmentSlice.actions ;
export default todayPointmentSlice.reducer


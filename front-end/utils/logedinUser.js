import {createSlice} from '@reduxjs/toolkit'
const storedUser = localStorage.getItem("user");

const logedinUserSlice = createSlice({
    name : 'logedinUser' , 

    initialState : {
         user: storedUser ? JSON.parse(storedUser) : null,
    },
    reducers : {
        setLogedinUser : (state , action) => {
            state.user = action.payload
        }
    }
})

export const { setLogedinUser } = logedinUserSlice.actions ;
export default logedinUserSlice.reducer

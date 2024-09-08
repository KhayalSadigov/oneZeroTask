import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = "http://localhost:2121/api/menu";
export const getAllData = createAsyncThunk("getAllData", async () => {
  //?date=2024-09-19T11:00:00.000Z
  let date = new Date()
  let osiFormat = date.toISOString()
  const response = await axios.get(BASE_URL+'?date='+osiFormat);//Endirimli qiymətlər ilə data almaq üçün
  console.log(osiFormat)
  return response.data.data.categories;
});

const initialState = {
  data: [],
  filterData: [], //Filter üçün istifadə edəcik
};

export const categoriesSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    filter : (state,action) =>{
        if(action.payload == 'All')
            {
                state.filterData = state.data.filter(()=>{
                    return true ;
                })
            } // All funksiyası zamanı filterData orginal dataya bərabər olmalıdır
        else{
            state.filterData = state.data.filter((e)=>{
                return e.name[0].value == action.payload ;
            })
        }
        console.log(state.filterData)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllData.pending, () => {
      //Digər Requestlərdə baş verəcəklər proseslər üçün
    });
    builder.addCase(getAllData.fulfilled, (state, action) => {
      state.data = action.payload;
      state.filterData = action.payload;
    });
    builder.addCase(getAllData.rejected, () => {
      //Digər Requestlərdə baş verəcəklər proseslər üçün
    });
  },
});

export const {filter} = categoriesSlice.actions;

export default categoriesSlice.reducer;

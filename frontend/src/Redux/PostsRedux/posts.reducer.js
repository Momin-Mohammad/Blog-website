import { ChangeGenre, PostFailure, PostLoading, getAllPost } from "./posts.types"

const initialState = {
    allPosts : [],
    genre : "all",
    loading : true,
    error : true
}

export const postReducer = (state=initialState,action)=>{
    switch(action.type){
        case PostLoading : {
            return{
                ...state,
                loading : true,
                error : false
            }
        }

        case PostFailure : {
            return{
                ...state,
                loading : false,
                error : true
            }
        }
        case ChangeGenre : {
            return{
                ...state,
                loading : false,
                error : false,
                genre : action.payload,
            }
        }
        case getAllPost :{
            return{
                ...state,
                allPosts : action.payload.data,
                genre : action.payload.genre,
                loading : false,
                error : false
            }
        }
         default : return state
    }
}
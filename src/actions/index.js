import {
    DELETE_PHOTO_CARD,
    ADD_PHOTO_CARD,
    EDIT_PHOTO_CARD,
    FETCH_PHOTO_CARDS
} from "./types";
import JsonPlaceHolder from "../api/JsonPlaceHolder";
import photoCard from "../Components/PhotoCard";



export const fetchPhotoCards = () => async (dispatch, getState) =>{
    const response = await JsonPlaceHolder.get('/photos')
    dispatch({type: FETCH_PHOTO_CARDS, payload: response.data})
}

export const addPhotoCard = photoCard =>{
    return{
        type: ADD_PHOTO_CARD,
        payload: photoCard
    }
}

export const editPhotoCard = photoCard =>{
    return{
        type: EDIT_PHOTO_CARD,
        payload: photoCard
    }
}

export const deletePhotoCard = photoCard =>{
    return{
        type:DELETE_PHOTO_CARD,
        payload:photoCard
    }
}

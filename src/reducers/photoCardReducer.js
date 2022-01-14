import _ from "lodash";
import {
    FETCH_PHOTO_CARDS,
    ADD_PHOTO_CARD,
    DELETE_PHOTO_CARD,
    EDIT_PHOTO_CARD
} from "../actions/types";

const PhotoCardReducer = (state = {}, action) => {
    switch (action.type) {
        case FETCH_PHOTO_CARDS:
            return {...state, ..._.mapKeys(action.payload, 'id')};
        case ADD_PHOTO_CARD:
            return {
                ...state, [action.payload.id]: {
                    albumId: action.payload.albumId,
                    id: action.payload.id,
                    title:action.payload.title,
                    url: action.payload.url,
                    thumbnailUrl: action.payload.url
                }
            }
        case EDIT_PHOTO_CARD:

            return {
                ...state, [action.payload.id]: {
                        ...state[action.payload.id],
                        title:action.payload.title,
                        url: action.payload.url,
                        thumbnailUrl: action.payload.url
                    }
                }
        case DELETE_PHOTO_CARD:
            const obj = Object.assign({},action.payload);
            console.log(obj);
            delete state[obj.id]
            return state;

        default:
            return state;
    }
}

export default PhotoCardReducer;

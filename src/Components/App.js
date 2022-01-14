import React, {useEffect, useState} from "react";
import PhotoCardList from "./PhotoCardList";
import JsonPlaceHolder from "../api/JsonPlaceHolder";
import {fetchPhotoCards} from "../actions";
import {useDispatch,useSelector} from "react-redux";



function App() {
  const dispatch = useDispatch();
  const photoCardsList = Object.values(useSelector(state =>state.photoCards));

  useEffect(()=>{
    console.log('list changed');
  },[photoCardsList])

  useEffect(()=>{
    dispatch(fetchPhotoCards())
  },[])


if(photoCardsList !== 0){
  return (
      <PhotoCardList/>
  )
}
  return (
   <div>loading...</div>
  )
}

export default App;

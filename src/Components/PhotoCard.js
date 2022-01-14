import React, {useEffect, useState, useRef} from "react";


function PhotoCard(props){

    const imageRef = useRef(null)
    const [spans,setSpans] = useState(25);

    const calculateSpans = () => {
        const height = imageRef.current.clientHeight;
        const spans = Math.ceil(height / 10)
        setSpans(spans);

    }

    useEffect(()=>{
     imageRef.current.addEventListener('load',calculateSpans);
    },[])

    const displayActions= ()=>{
          document.querySelector(`#card-wrapper${props.id} div.photo-actions`).classList.add("options-active")

    }
    const undisplayActions= ()=>{
        document.querySelector(`#card-wrapper${props.id} div.photo-actions`).classList.remove("options-active")
    }



    return(
            <div  onMouseEnter={displayActions} onMouseLeave={undisplayActions} id={`card-wrapper${props.id}`} className='card-wrapper' style={{gridRowEnd: `span ${spans}`}}>
                <h3 className='photo-id'>{props.id}</h3>
                <h5  className='photo-title' data-toggle="tooltip" title={props.title}>{props.title}</h5>
                <img
                    ref={imageRef}
                    src={props.url}
                />
                <div className='photo-actions'>
                    <button className='btn' onClick={()=>props.handleEditButtonClick()} >
                        <i className="bi bi-pen-fill"></i>
                    </button>
                    <button className='btn' onClick={()=>props.handleDeleteButtonClick()}>
                        <i className="bi bi-trash-fill"></i>
                    </button>
                </div>

            </div>


    )
}

export default  PhotoCard;
import React, {useEffect} from "react";
import ReactDOM from "react-dom";
import photoCard from "./PhotoCard";


const Modal = props =>{



    const style = {
        width: props.width,
        height: props.height

    };


    if(props.show === true){

        return ReactDOM.createPortal(
            <div onClick={()=>props.onDismiss()} className="ui dimmer modals visible active">
                <div  style={style} onClick={(e)=> e.stopPropagation()} className="ui modal visible active">
                    <div className="header">{props.title}</div>
                    <div className="content">
                        {props.content()}
                    </div>
                    <div className="actions">
                        {props.actions()}
                    </div>
                </div>
            </div>,
            document.querySelector('#modal')
        );
    }
    else{
        return null;
    }
};

export default Modal;
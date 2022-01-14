import PhotoCard from "./PhotoCard";
import React, {useEffect, useState} from "react";
import Modal from "./Modal";
import {addPhotoCard, deletePhotoCard, editPhotoCard, fetchPhotoCards} from "../actions";
import {useDispatch, useSelector} from "react-redux";
import Button from "bootstrap/js/src/button";


function PhotoCardList(props) {

    const [currentPage, setCurrentPage] = useState(1);
    const [photoCardsPerPage, setPhotoCardsPerPage] = useState(50);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [photoCardIdToEdit, setPhotoCardIdToEdit] = useState(null);
    const [photoCardIdToDelete, setPhotoCardIdToDelete] = useState(null);
    const [isPageAdded,setIsPageAdded] = useState(false);
    const dispatch = useDispatch();
    const photoCardsList = Object.values(useSelector(state => state.photoCards));



    const handleEditButtonClick = (id) => {
        setPhotoCardIdToEdit(id);
        handleOnEditModalOpen();
    }

    const handleDeleteButtonClick = (id) => {
        console.log(id);
        setPhotoCardIdToDelete(id);
        handleOnDeleteModalOpen()
    }

    const handlePageSelect = (event) => {
        setCurrentPage(Number(event.target.value));
    }
    const handlePageUp = (event) => {
        if (currentPage != pageNumbers.length) {
            setCurrentPage(currentPage + 1)
            let selectBox = document.getElementById('select-box')
            selectBox.value = currentPage + 1;
        }
    }

    const handlePageDown = () => {
        if (currentPage != 1) {
            setCurrentPage(currentPage - 1)
            let selectBox = document.getElementById('select-box')
            selectBox.value = currentPage - 1;
        }
    }

    const indexOfLastPhotoCard = currentPage * photoCardsPerPage;
    const indexOfFirstPhotoCard = indexOfLastPhotoCard - photoCardsPerPage;
    const currentPhotoCards = photoCardsList.slice(indexOfFirstPhotoCard, indexOfLastPhotoCard);

    const renderPhotos = currentPhotoCards.map((photo, index) => {
        return <PhotoCard
            key={index}
            id={photo.id}
            title={photo.title}
            url={photo.url}
            handleEditButtonClick={() => handleEditButtonClick(photo.id)}
            handleDeleteButtonClick={() => handleDeleteButtonClick(photo.id)}
        />
    })

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(photoCardsList.length / photoCardsPerPage); i++) {
        pageNumbers.push(i);
    }
    useEffect(()=>{
         if(isPageAdded === true){
             document.getElementById('select-box').value = pageNumbers.length;
             setIsPageAdded(false);
         }

    },[isPageAdded])

    const renderPageNumbers = pageNumbers.map(number => {
        return (
            <option
                key={number}
                value={number}
            >
                {number}
            </option>
        )
    })


    const handleOnAddModalOpen = () => {
        setShowAddModal(true)
    }
    const handleOnAddModalClose = () => {
        setShowAddModal(false)
    }
    const handleOnEditModalOpen = () => {
        setShowEditModal(true)


    }
    const handleOnEditModalClose = () => {
        setShowEditModal(false)
    }
    const handleOnDeleteModalOpen = () => {
        setShowDeleteModal(true)
    }
    const handleOnDeleteModalClose = () => {
        setShowDeleteModal(false)
    }

    const isValidURL = (string) => {
        let res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        return (res !== null)
    };

    const titleChanged = () => {
        document.querySelector(".modal-title-exists-error-msg").classList.remove("msg-active");
        document.querySelector(".modal-title-empty-error-msg").classList.remove("msg-active");
    }
    const urlChanged = () => {
        document.querySelector(".modal-url-exists-error-msg").classList.remove("msg-active");
        document.querySelector(".modal-url-empty-error-msg").classList.remove("msg-active");
        document.querySelector(".modal-url-invalid-error-msg").classList.remove("msg-active");

    }

    const renderInputModalContent = (type) => {

        let title = '';
        let url = '';
        if (type === 'edit') {
            photoCardsList.map(photoCard => {
                if (photoCard.id === photoCardIdToEdit) {
                    title = photoCard.title;
                    url = photoCard.url;
                }
            })
        }
        return (
            <div>
                <div>Title:</div>
                <input defaultValue={title} onChange={() => titleChanged()} id='modalInputTitleField'
                       className="form-control" type="text"/>
                <div className='modal-title-exists-error-msg'>Title already exists, it must be unique</div>
                <div className='modal-title-empty-error-msg'>Title is empty</div>
                <div>Image url:</div>
                <input defaultValue={url} onChange={() => urlChanged()} id='modalInputUrlField' className="form-control"
                       type="text"/>
                <div className='modal-url-exists-error-msg'>Image already exists, please choose another url</div>
                <div className='modal-url-empty-error-msg'>url is empty</div>
                <div className='modal-url-invalid-error-msg'>url is invalid</div>
            </div>
        )
    }
    const renderDeleteModalContent = () => {
        return (
            <div>Are you sure you want to delete this photo card?</div>
        )
    }

    const handleConfirmModal = (type) => {

        if (type === 'delete') {
            let photoCardToDelete;
            photoCardsList.map(photoCard => {
                if (photoCard.id === photoCardIdToDelete) {
                    photoCardToDelete = photoCard;
                }
            })
            dispatch(deletePhotoCard(photoCardToDelete));
            handleOnDeleteModalClose();
        } else {
            const title = document.getElementById('modalInputTitleField').value;
            const url = document.getElementById('modalInputUrlField').value;
            let isTitleExists = false;
            let isUrlExists = false;
            let isTitleEmpty = false;
            let isUrlEmpty = false;
            let isUrlInvalid = false;
            if (title === '') {
                document.querySelector(".modal-title-empty-error-msg").classList.add("msg-active");
                isTitleEmpty = true;
            }
            if (url === '') {
                document.querySelector(".modal-url-empty-error-msg").classList.add("msg-active");
                isUrlEmpty = true;
            } else if (!isValidURL(url)) {
                document.querySelector(".modal-url-invalid-error-msg").classList.add("msg-active");
                isUrlInvalid = true;
            }


            if (!isTitleEmpty && !isUrlEmpty) {
                photoCardsList.map((photo) => {
                    if (title.toLowerCase() === photo.title.toLowerCase()) {
                        document.querySelector(".modal-title-exists-error-msg").classList.add("msg-active");
                        isTitleExists = true;
                    }
                    if (url.toLowerCase() === photo.url.toLowerCase()) {
                        document.querySelector(".modal-url-exists-error-msg").classList.add("msg-active");
                        isUrlExists = true;
                    }
                })
            }

            if (type === 'edit') {
                let titleToEdit;
                let urlToEdit;
                photoCardsList.map(photo => {
                    if (photo.id === photoCardIdToEdit) {
                        titleToEdit = photo.title;
                        urlToEdit = photo.url;
                    }
                })
                if (titleToEdit === title) {
                    document.querySelector(".modal-title-exists-error-msg").classList.remove("msg-active");
                    isTitleExists = false;
                }
                if (urlToEdit === url) {
                    document.querySelector(".modal-url-exists-error-msg").classList.remove("msg-active");
                    isUrlExists = false;
                }
            }


            if (!isTitleExists && !isUrlExists && !isTitleEmpty && !isUrlEmpty && !isUrlInvalid) {
                switch (type) {
                    case 'edit': {
                        const editedPhotoCard =
                            {
                                id: photoCardIdToEdit,
                                title,
                                url,
                                thumbnailUrl: url

                            }
                        dispatch(editPhotoCard(editedPhotoCard))
                        handleOnEditModalClose()
                        break;
                    }
                    default: {
                        const lastPhotoId = photoCardsList[photoCardsList.length - 1].id;
                        const lastPhotoAlbumId = photoCardsList[photoCardsList.length - 1].albumId;
                        let newPhotoCardAlbumId;
                        let newPhotoCardId = lastPhotoId + 1;
                        let lastPhotoAlbumCnt = 0;
                        photoCardsList.map((photo) => {
                            if (photo.albumId === lastPhotoAlbumId) {
                                lastPhotoAlbumCnt++;
                            }
                        })
                        newPhotoCardAlbumId = lastPhotoAlbumCnt === 50 ? lastPhotoAlbumId + 1 : lastPhotoAlbumId;
                        const newPhotoCard = {
                            albumId: newPhotoCardAlbumId,
                            id: newPhotoCardId,
                            title,
                            url,
                            thumbnailUrl: url
                        }
                        dispatch(addPhotoCard(newPhotoCard));
                        handleOnAddModalClose()
                        lastPhotoAlbumCnt === 50 ? setCurrentPage(pageNumbers.length + 1) : setCurrentPage(pageNumbers.length);
                        setIsPageAdded(true);
                    }
                }
            }

        }


    }

    const renderModalActions = (type) => {
        let onDismiss;
        switch (type) {
            case 'edit':
                onDismiss = handleOnEditModalClose;
                break;
            case 'delete':
                onDismiss = handleOnDeleteModalClose;
                break;
            default:
                onDismiss = handleOnAddModalClose;

        }

        return (
            <div>
                <div className="actions">
                    <button className="ui primary button" onClick={() => handleConfirmModal(type)}>Ok</button>
                    <button className="ui button" onClick={() => onDismiss()}>Cancel</button>
                </div>
            </div>
        )
    }


    return (
        <div>
            <Modal
                show={showDeleteModal}
                width={'500px'}
                height={'250px'}
                title={"Delete Photo Card"}
                content={renderDeleteModalContent}
                actions={() => renderModalActions('delete')}
                onDismiss={handleOnDeleteModalClose}
            />
            <Modal
                show={showEditModal}
                width={'500px'}
                height={'360px'}
                title={"Edit Photo Card"}
                content={() => renderInputModalContent('edit')}
                actions={() => renderModalActions('edit')}
                onDismiss={handleOnEditModalClose}
            />
            <Modal
                show={showAddModal}
                width={'500px'}
                height={'360px'}
                title={"Add Photo Card"}
                content={renderInputModalContent}
                actions={() => renderModalActions('add')}
                onDismiss={handleOnAddModalClose}
            />
            <div className='add-photo-action'>
                <button className='btn-primary' onClick={() => handleOnAddModalOpen()}>
                    <i className="bi bi-plus-lg"></i>
                    Add a new photo
                </button>
            </div>
            <div className="photo-list">
                {renderPhotos}
            </div>

            <div className='page-numbers'>
                <div className='page-down-arrow'>
                    <button className='btn-light' onClick={handlePageDown}>
                        <i className="bi bi-arrow-left"></i>
                    </button>
                </div>
                <div className='page-box'>
                    <select className="form-select" onChange={handlePageSelect} id={'select-box'}>
                        {renderPageNumbers}
                    </select>
                </div>

                <div className='page-up-arrow'>
                    <button className='btn-light' onClick={handlePageUp}>
                        <i className="bi bi-arrow-right"></i>
                    </button>
                </div>

            </div>
        </div>

    )
}

export default PhotoCardList;
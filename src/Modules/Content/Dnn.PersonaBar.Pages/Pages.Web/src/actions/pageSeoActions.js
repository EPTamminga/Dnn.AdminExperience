import PageSeoService from "../services/pageSeoService";
import {pageSeoTypes as ActionTypes}  from "../constants/actionTypes";
import pageActionTypes  from "../constants/actionTypes/pageActionTypes";
const pageSeoActions = {
    openNewForm() {
        return (dispatch) => {
            dispatch({
                type: ActionTypes.SEO_OPEN_NEW_FORM
            });
        };
    },
    closeNewForm() {
        return (dispatch) => {
            dispatch({
                type: ActionTypes.SEO_CLOSE_NEW_FORM
            });
        };
    },
    openEditForm(url) {
        return (dispatch) => {
            dispatch({
                type: ActionTypes.SEO_OPEN_EDIT_FORM,
                payload: {
                    url
                }
            });
        };
    },
    closeEditForm() {
        return (dispatch) => {
            dispatch({
                type: ActionTypes.SEO_CLOSE_EDIT_FORM
            });
        };
    },
    change(key, value) {
        return (dispatch) => {
            dispatch({
                type: ActionTypes.SEO_CHANGE_URL,
                payload: {
                    key: key,
                    value: value
                }
            });
        };        
    },
    addUrl(url, primaryAliasId) {
        return (dispatch) => {
            dispatch({
                type: ActionTypes.SEO_ADD_URL
            });

            PageSeoService.add(url, primaryAliasId).then((response) => {
                const newUrl = {
                    ...url
                };  
                if (!response.Success) {
                    dispatch({
                        type: ActionTypes.ERROR_SEO_ADDING_URL,
                        data: {error: response.ErrorMessage}
                    });
                    return;
                }
                newUrl.id = response.Id;
                dispatch({
                    type: ActionTypes.SEO_ADDED_URL
                });
                dispatch({
                    type: pageActionTypes.ADD_CUSTOM_URL,
                    payload: {
                        newUrl
                    }
                });                                
            }).catch((error) => {
                dispatch({
                    type: ActionTypes.ERROR_SEO_ADDING_URL,
                    data: {error}
                });
            }); 
        };
    },
    saveUrl(url, primaryAliasId) {
        return (dispatch) => {
            dispatch({
                type: ActionTypes.SEO_SAVE_URL
            });

            PageSeoService.save(url, primaryAliasId).then((response) => {
                if (!response.Success) {
                    dispatch({
                        type: ActionTypes.ERROR_SEO_SAVING_URL,
                        data: {error: response.ErrorMessage}
                    });
                    return;
                }
                
                dispatch({
                    type: ActionTypes.SEO_SAVED_URL
                });
                dispatch({
                    type: pageActionTypes.REPLACE_CUSTOM_URL,
                    payload: {
                        url
                    }
                });                           
            }).catch((error) => {
                dispatch({
                    type: ActionTypes.ERROR_SEO_SAVING_URL,
                    data: {error}
                });
            }); 
        };
    }
};

export default pageSeoActions;
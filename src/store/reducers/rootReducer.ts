import { combineReducers } from 'redux'
import { cameraState } from './cameraReducer'
import { cropState } from './cropReducer'
import { imageSearchState } from './imageSearchReducer'
import { collectionItemState } from './collectionItemReducer'
import { itemIdSearchState } from './itemIdSearchReducer'
import { addImageState } from './addImageReducer'
import { invnoSearchState } from './invnoSearchReducer'

export const BarnesCraftarCaptureStore = combineReducers({
    cameraState,
    cropState,
    imageSearchState,
    collectionItemState,
    itemIdSearchState,
    addImageState,
    invnoSearchState
})
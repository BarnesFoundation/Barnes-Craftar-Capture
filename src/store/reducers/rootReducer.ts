import { combineReducers } from 'redux'
import { cameraReducer } from './cameraReducer'
import { cropReducer } from './cropReducer'
import { imageSearchReducer } from './imageSearchReducer'
import { collectionItemReducer } from './collectionItemReducer'
import { itemIdSearchReducer } from './itemIdSearchReducer'

export const BarnesCraftarCaptureStore = combineReducers({
    cameraReducer,
    cropReducer,
    imageSearchReducer,
    collectionItemReducer,
    itemIdSearchReducer
})
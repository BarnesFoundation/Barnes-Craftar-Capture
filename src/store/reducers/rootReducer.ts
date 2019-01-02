import { combineReducers } from 'redux'
import { cameraReducer } from './cameraReducer'
import { cropReducer } from './cropReducer'
import { imageSearchReducer } from './imageSearchReducer'

export const BarnesCraftarCaptureStore = combineReducers({
    cameraReducer,
    cropReducer,
    imageSearchReducer
})
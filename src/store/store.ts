import { applyMiddleware, createStore } from "redux";
import { BarnesCraftarCaptureStore } from "./reducers/rootReducer";

const customMiddleware = (store: any) => (next: any) => (action: any) => {
  next({ ...action });
};

export const Store = createStore(
  BarnesCraftarCaptureStore,
  applyMiddleware(customMiddleware)
);

import * as React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import { ApplicationContainer } from "./App";
import { ConnectedCameraContainer } from "./components/cameraContainer/cameraContainer";
import { ConnectedCropContainer } from "./components/cropContainer/CropContainer";
import { ConnectedItemSearchContainer } from "./components/itemSearchContainer/itemSearchContainer";
import { ConnectedImageSearchContainer } from "./components/imageSearchContainer/imageSearchContainer";
import { ConnectedAddImageContainer } from "./components/addImageContainer/addImageContainer";
import { ConnectedInvnoSearchContainer } from "./components/invnoSearchContainer/invnoSearchContainer";

const Routes = (
  <BrowserRouter>
    <>
      <Route exact path="/" component={ApplicationContainer} />
      <Route path="/item-search" component={ConnectedItemSearchContainer} />
      <Route path="/camera-capture" component={ConnectedCameraContainer} />
      <Route path="/crop-image" component={ConnectedCropContainer} />
      <Route path="/search-image" component={ConnectedImageSearchContainer} />
      <Route path="/add-image" component={ConnectedAddImageContainer} />
      <Route path="/invno-search" component={ConnectedInvnoSearchContainer} />
    </>
  </BrowserRouter>
);

export { Routes };

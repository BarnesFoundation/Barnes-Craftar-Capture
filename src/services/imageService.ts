import { Config } from "../utils/config";
import { ImageCreateResponse } from "../interfaces/managementResponses";
import axios from "axios";

class CreateResponse {
  success: boolean;
  uuid?: string;
  item?: string;
}

class ImageService {
  httpConfig;

  constructor() {
    this.httpConfig = {
      url:
        Config.managementApiUrl +
        Config.imageRoute +
        "/?api_key=" +
        Config.managementApiKey,
      headers: { "Content-Type": "multipart/form-data" },
      method: "post",
      data: null,
    };
  }

  private prepareRequest(file: Blob, itemUuid: string) {
    let item = "/api/v0/item/" + itemUuid + "/";
    let fd = new FormData();

    fd.append("file", file);
    fd.append("item", item);

    this.httpConfig.data = fd;

    return this.httpConfig;
  }

  private parseImageCreateResponse(
    response: ImageCreateResponse
  ): CreateResponse {
    let createResponse = new CreateResponse();

    if (response.status === "CR" || response.status === "OK") {
      createResponse.success = true;
      createResponse.item = response.item;
      createResponse.uuid = response.uuid;
    }
    return createResponse;
  }

  private parseErrorResponse(error): {} {
    let errorCode = error.response.data.error.code;
    let errorMessage = error.response.data.error.message;

    return { errorCode: errorCode, errorMessage: errorMessage };
  }

  async addImage(image: Blob, itemUuid: string): Promise<CreateResponse> {
    let request = this.prepareRequest(image, itemUuid);

    try {
      let response = await axios(request);
      let createResponse = this.parseImageCreateResponse(response.data);
      return createResponse;
    } catch (error) {
      let message = this.parseErrorResponse(error);
      throw message;
    }
  }
}

export { ImageService, CreateResponse };

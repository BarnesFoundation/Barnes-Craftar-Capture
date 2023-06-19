import { Config } from "../utils/config";
import axios from "axios";

class ItemImageRetrievalService {
  httpConfig;

  constructor() {
    this.httpConfig = {
      url: Config.managementApiUrl + Config.imageRoute + "/",
      method: "get",
      params: {
        api_key: Config.managementApiKey,
        item__uuid: null,
      },
    };
  }

  private prepareRequest = (itemUuid: string) => {
    this.httpConfig.params.item__uuid = itemUuid;
    return this.httpConfig;
  };

  private parseResponse = (response: any) => {
    if (response.length > 0) {
      return response[0].thumb_120;
    } else {
      return null;
    }
  };

  retrieveImage = async (uuid: string): Promise<string> => {
    let request = this.prepareRequest(uuid);
    let imageResponse;

    try {
      let response = await axios(request);
      imageResponse = this.parseResponse(response.data.objects);
    } catch (error) {
      console.log(error);
    }

    return imageResponse;
  };
}

export { ItemImageRetrievalService };

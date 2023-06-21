import axios from "axios";

import { Config } from "../utils/config";
import { SearchResponse } from "../interfaces/imageRecognitionResponses";

class MatchResponse {
  success: boolean;
  message: string;

  // These are only provide when the request is successful in finding a match
  id?: string;
  uuid?: string;
}

class SearchService {
  private parseImageMatchResponse(response: SearchResponse): MatchResponse {
    const matchResponse = new MatchResponse();

    if (response.results.length > 0) {
      // We only care about the first result
      const result = response.results[0];

      matchResponse.success = true;
      matchResponse.message = "A matching reference image was found";
      matchResponse.id = result.item.name;
      matchResponse.uuid = result.item.name;
    } else {
      matchResponse.success = false;
      matchResponse.message = "No matching reference image was found";
    }
    return matchResponse;
  }

  async findImageMatch(image: Blob): Promise<MatchResponse> {
    const form = new FormData();
    form.append("token", Config.collectionToken);
    form.append("image", image);

    try {
      const response = await axios({
        headers: { "Content-Type": "multipart/form-data" },
        method: "post",
        url: Config.searchApiUrl,
        data: form,
      });

      return this.parseImageMatchResponse(response.data);
    } catch (error: any) {
      console.log(
        "An error occurred while identifying a match for the image",
        error
      );
      throw new Error("An error occurred finding a match for the image");
    }
  }
}

export { SearchService, MatchResponse };

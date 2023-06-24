import axios from "axios";

import { Config } from "../utils/config";

type SearchResponseFailure = { success: false; message: string };
type SearchResponseSuccess = {
  success: true;
  message: string;

  // When we have a match, we have additional fields
  id: string;
  name: string;
  uuid: string;
  imageUrl: string;
};

class SearchService {
  public async findImageMatch(image: Blob): Promise<SearchResponse> {
    const form = new FormData();
    form.append("token", Config.collectionToken);
    form.append("image", image);

    try {
      const response = await axios({
        headers: { "Content-Type": "multipart/form-data" },
        method: "post",
        url: "/api/search-by-image",
        data: form,
      });

      return response.data;
    } catch (error) {
      console.log(
        "An error occurred while identifying a match for the image",
        error
      );
      throw new Error("An error occurred finding a match for the image");
    }
  }

  public async searchByItem(itemId: string): Promise<SearchResponse> {
    const response = await axios({
      url: "/api/search-by-image-id",
      method: "get",
      params: {
        imageId: itemId,
      },
    });

    return response.data;
  }

  public async searchByInvno(invno: string): Promise<SearchResponse> {
    const response = await axios({
      method: "GET",
      url: "/api/search-by-invno",
      params: {
        invno: invno,
      },
    });

    return response.data;
  }
}

export type SearchResponse = SearchResponseFailure | SearchResponseSuccess;
export { SearchService };

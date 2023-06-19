import axios from "axios";
import { ItemSearchService, SearchResponse } from "./itemSearchService";

class InvnoResponse {
  idResponse?: SearchResponse | any;
  success: boolean;
  id?: string;
}

class InvnoSearchService {
  itemSearchService: ItemSearchService;

  constructor() {
    this.itemSearchService = new ItemSearchService();
  }

  async searchByInvno(invno: string): Promise<InvnoResponse> {
    const response = await axios({
      method: "GET",
      url: "/api/search-by-invno",
      params: {
        invno: invno,
      },
    });

    if (response.status === 200) {
      return {
        ...response.data,
        idResponse: await this.itemSearchService.searchByItem(response.data.id),
      };
    }

    return {
      ...response.data,
      idResponse: {},
    };
  }
}

export { InvnoSearchService, InvnoResponse };

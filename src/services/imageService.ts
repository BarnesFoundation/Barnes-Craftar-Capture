import axios from "axios";

export interface ImageReferenceResponse {
  message: string;
  success: boolean;

  item: string;
  uuid: string | null;
}

class ImageService {
  public async addImage(
    imageBlob: Blob,
    imageId: string
  ): Promise<ImageReferenceResponse> {
    const form = new FormData();
    form.append("image", imageBlob);
    form.append("imageId", imageId);

    try {
      const response = await axios({
        url: "/api/add-image",
        headers: { "Content-Type": "multipart/form-data" },
        method: "post",
        data: form,
      });
      const imageCreationResponse = response.data as ImageReferenceResponse;
      return imageCreationResponse;
    } catch (error) {
      console.error(
        `An error occurred adding the reference image for Image Id ${imageId}`,
        error
      );
      throw error;
    }
  }
}

export { ImageService };

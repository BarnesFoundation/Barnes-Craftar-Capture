import * as loadImage from "blueimp-load-image";

const LANDSCAPE = "LANDSCAPE";
const PORTRAIT = "PORTRAIT";
const SQUARE = "SQUARE";

const BLOB = "BLOB";
const URI = "URI";

const QUERY_IMAGE = "QUERY_IMAGE";
const REFERENCE_IMAGE = "REFERENCE_IMAGE";
const DISPLAY_IMAGE = "DISPLAY_IMAGE";

class Dimensions {
  height: number;
  width: number;

  constructor(height: number, width: number) {
    this.height = height;
    this.width = width;
  }
}

class ResizeService {
  async resizeImage(
    sourceImage: string,
    resultType: string,
    imageType: string
  ): Promise<Blob | string> {
    const image = new Image();
    image.src = sourceImage;

    return await new Promise<Blob | string>((resolve) => {
      image.onload = async () => {
        console.log(
          "Prior to resize dimensions - height: " +
            image.height +
            " width: " +
            image.width
        );

        let orientation = this.determineOrientation(image.height, image.width);
        let dimensions = this.getResizedDimensions(
          orientation,
          image.height,
          image.width,
          imageType
        );

        const canvas = document.createElement("canvas");
        canvas.height = dimensions.height;
        canvas.width = dimensions.width;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0, dimensions.width, dimensions.height);

        console.log(
          "Resized dimenions - height: " +
            dimensions.height +
            " width: " +
            dimensions.width
        );
        resolve(await this.getResizedResult(ctx, resultType));
      };
    });
  }

  async correctImageOrientation(image: string): Promise<string> {
    return new Promise<string>((resolve) => {
      loadImage(
        image,
        (canvas) => {
          resolve(canvas.toDataURL("image/jpeg", 1));
        },
        { canvas: true, orientation: true }
      );
    });
  }

  private async getResizedResult(
    ctx: CanvasRenderingContext2D,
    resultType: string
  ): Promise<Blob | string> {
    return await new Promise<Blob | string>((resolve) => {
      if (resultType === BLOB) {
        ctx.canvas.toBlob(
          (blob) => {
            resolve(blob);
          },
          "image/jpeg",
          1
        );
      }

      if (resultType === URI) {
        resolve(ctx.canvas.toDataURL("image/jpeg", 1));
      }
    });
  }

  private determineOrientation(height: number, width: number): string {
    let orientation;

    if (height > width) {
      orientation = PORTRAIT;
    }
    if (height < width) {
      orientation = LANDSCAPE;
    }
    if (width == height) {
      orientation = SQUARE;
    }

    return orientation;
  }

  private getResizedDimensions(
    orientation: string,
    cHeight: number,
    cWidth: number,
    imageType: string
  ): Dimensions {
    switch (imageType) {
      case REFERENCE_IMAGE:
        return this.getResizedReferenceImageDimensions(
          orientation,
          cHeight,
          cWidth
        );

      case QUERY_IMAGE:
        return this.getResizedQueryImageDimensions(
          orientation,
          cHeight,
          cWidth
        );

      case DISPLAY_IMAGE:
        return this.getResizedDisplayImageDimensions(
          orientation,
          cHeight,
          cWidth
        );

      default:
        return null;
    }
  }

  private getResizedQueryImageDimensions(
    orientation: string,
    cHeight: number,
    cWidth: number
  ) {
    let scaleFactor;
    let width;
    let height;
    let shorterEdgeSize = 240;

    switch (orientation) {
      case LANDSCAPE:
        height = shorterEdgeSize;
        scaleFactor = height / cHeight;
        width = cWidth * scaleFactor;
        break;

      case PORTRAIT:
        width = shorterEdgeSize;
        scaleFactor = width / cWidth;
        height = cHeight * scaleFactor;
        break;

      case SQUARE:
        height = shorterEdgeSize;
        width = shorterEdgeSize;
        break;
    }
    return new Dimensions(height, width);
  }

  private getResizedReferenceImageDimensions(
    orientation: string,
    cHeight: number,
    cWidth: number
  ): Dimensions {
    let scaleFactor;
    let width;
    let height;
    let minSizeShorterEdge = 480;

    switch (orientation) {
      case LANDSCAPE:
        if (cHeight < minSizeShorterEdge) {
          height = minSizeShorterEdge;
          scaleFactor = height / cHeight;
          width = cWidth * scaleFactor;
        } else {
          height = cHeight;
          width = cWidth;
        }

        break;

      case PORTRAIT:
        if (cWidth < minSizeShorterEdge) {
          width = minSizeShorterEdge;
          scaleFactor = width / cWidth;
          height = cHeight * scaleFactor;
        } else {
          height = cHeight;
          width = cWidth;
        }

        break;

      case SQUARE:
        if (cWidth < minSizeShorterEdge) {
          height = minSizeShorterEdge;
          width = minSizeShorterEdge;
        } else {
          height = cHeight;
          width = cWidth;
        }

        break;
    }
    return new Dimensions(height, width);
  }

  private getResizedDisplayImageDimensions(
    orientation: string,
    cHeight: number,
    cWidth: number
  ): Dimensions {
    let scaleFactor;
    let width;
    let height;
    let maxSizeLongerEdge = 480;

    switch (orientation) {
      case LANDSCAPE:
        if (cWidth > maxSizeLongerEdge) {
          width = maxSizeLongerEdge;
          scaleFactor = width / cWidth;
          height = cHeight * scaleFactor;
        } else {
          height = cHeight;
          width = cWidth;
        }

        break;

      case PORTRAIT:
        if (cHeight > maxSizeLongerEdge) {
          height = maxSizeLongerEdge;
          scaleFactor = height / cHeight;
          width = cWidth * scaleFactor;
        } else {
          height = cHeight;
          width = cWidth;
        }

        break;

      case SQUARE:
        if (cWidth > maxSizeLongerEdge) {
          height = maxSizeLongerEdge;
          width = maxSizeLongerEdge;
        } else {
          height = cHeight;
          width = cWidth;
        }

        break;
    }
    return new Dimensions(height, width);
  }
}

export { ResizeService };

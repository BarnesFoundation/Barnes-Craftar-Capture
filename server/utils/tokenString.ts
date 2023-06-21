const REF_TAG = "__REF_";

// It doesn't seem like we need to keep track of which number reference tag for an Image Id this would be
// i.e. if the original Image Id is 6726, we'd return something like `6726__REF_12356789` where that last
// segment is just the value of Date.now().
//
// There does not seem to be utility in returning a tag like `6726__REF_1` or `6726__REF_2` that indicates which number
// additional reference image this is because there's little value in such information. If we truly need something like that
// we can just get the date that a specific additional reference image was created in Vuforia
export function getNextReferenceTag(originalImageId: string) {
  return originalImageId + REF_TAG + Date.now();
}

import { getPlaiceholder } from "plaiceholder";

export const imageToBase64 = async (imgLink: string) => {
  try {
    const res = await fetch(imgLink);

    if (!res.ok) {
      throw new Error("Nepavyko gauti image!");
    }
    const buffer = await res.arrayBuffer();
    const { base64 } = await getPlaiceholder(Buffer.from(buffer));

    return base64;
  } catch (error) {
    console.log("Cant Resolve");
  }
};

export const imagesToBase64 = async (images: string[]) => {
  const base64Prom = images.map((url) => imageToBase64(url));

  const base64Results = await Promise.all(base64Prom);

  return base64Results;
};

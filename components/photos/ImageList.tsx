import { imagesToBase64 } from "@/utils/placeholder";
import ImageCointainer from "./ImageCointainer";
import { placeholder } from "@/public/placeholder";

type Props = {
  album: Album;
  isLoggedIn: boolean;
};

const ImageList = async ({ album, isLoggedIn }: Props) => {
  const immgArray = album.images.map((image) => image.url);
  const blurImgArray = await imagesToBase64(immgArray);

  return (
    <div className="grid grid-cols-gallery gap-2 center max-w-[90%] md:max-w-[70%] lg:max-w-[70%] xl:max-w-[70%] pt-[144px]">
      {album.images.map((image, index) => (
        <ImageCointainer
          isLoggedIn={isLoggedIn}
          albumId={album._id}
          index={index}
          publicId={image.public_id}
          key={image._id}
          images={album.images}
          imagesBlurs={
            blurImgArray.includes(undefined)
              ? new Array(album.images.length).fill(placeholder)
              : blurImgArray
          }
          alt={album.name}
          height={image.height}
          width={image.width}
        />
      ))}
    </div>
  );
};

export default ImageList;

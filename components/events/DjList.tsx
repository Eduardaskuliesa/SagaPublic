/* eslint-disable react/react-in-jsx-scope */
import { imagesToBase64 } from "@/utils/placeholder";
import DjCard from "./DjCard";
import { placeholder } from "@/public/placeholder";

type Props = {
  djs: DjDisplay[];
};

const DjList = async ({ djs }: Props) => {
  const immgArray = djs.map((dj) => dj.image.url);
  const blurImgArray = await imagesToBase64(immgArray);

  return (
    <div className="flex flex-col justify-center items-center w-full">
      {djs.map((dj, i) => (
        <DjCard
          key={dj._id}
          name={dj.name}
          imgSrc={dj.image!.url}
          imgAlt={dj.name}
          socials={dj.socials}
          index={i}
          blurImg={blurImgArray[i] || placeholder}
        />
      ))}
    </div>
  );
};

export default DjList;

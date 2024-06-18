'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FaCirclePlay } from 'react-icons/fa6';
import { BiLoaderCircle } from 'react-icons/bi';
import BtnRemoveVideo from '../buttons/BtnRemoveVideo';
import { dateToDisplay } from '@/lib/stringFormaters';
import { placeholder } from '@/public/placeholder';
import useCursorHandlers from '@/hooks/useCursorsHandlers';

type Props = {
  _id: string;
  name: string;
  date: string;
  youtubeId: string;
  thumbImg: string;
  thumbBlur: string;
  vidWidth: number;
  vidHeight: number;
  isLoggedIn: boolean;
};

const YoutubeEmbed = ({
  _id,
  name,
  date,
  youtubeId,
  isLoggedIn,
  thumbImg,
  thumbBlur,
}: Props) => {
  const [showVideo, setShowVideo] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const { onMouseEnter, onMouseLeave, toggleCursor } = useCursorHandlers();

  const onVideoStartPlay = () => {
    setShowVideo(true);
    toggleCursor('none', true);
    toggleCursor('play', false);
  };

  return (
    <div
      className="relative w-full flex flex-col justify-center items-center max-[767px]:my-10"
    >
      {showVideo ? (
        <>
          <div
            className={`absolute z-[100] select-none pointer-events-none duration-200 
                    ${loaded ? 'opacity-0' : 'opacity-100'}
                    `}
          >
            <div

              className="relative z-[100] -top-10 lg:w-[854px] lg:h-[480px] aspect-[427/240]"
            >
              <Image
                width={854}
                height={480}
                sizes="854px"
                alt="Youtube video thumbnail"
                placeholder="blur"
                blurDataURL={thumbBlur}
                src={thumbImg}
              />
              {!loaded && (
                <div className="absolute  inset-0 loaderSpin  flex justify-center text-[4rem] md:text-[6rem] lg:text-[12rem] items-center text-red-400">
                  <BiLoaderCircle />
                </div>
              )}
            </div>
          </div>

          <div
            className="relative lg:w-[854px] lg:h-[480px] w-full m-0 aspect-[427/240]"
          >
            <iframe
              onMouseEnter={(e) => onMouseEnter(e, 'none')}
              onMouseLeave={(e) => onMouseLeave(e, 'none')}
              className="absolute top-0 left-0 bottom-0 right-0 w-full h-full"
              src={`https://www.youtube.com/embed/${youtubeId}?&autoplay=1`}
              title="YouTube video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              onLoad={() => setLoaded(true)}
            />
          </div>
        </>
      ) : (
        <div
          onMouseEnter={(e) => onMouseEnter(e, 'play')}
          onMouseLeave={(e) => onMouseLeave(e, 'play')}
          className="relative lg:w-[854px] lg:h-[480px] aspect-[427/240]"
        >
          <Image
            width={854}
            height={480}
            sizes="854px"
            alt="Youtube video thumbnail"
            placeholder="blur"
            blurDataURL={thumbBlur}
            src={thumbImg}
          />
          <button
            className="absolute inset-0 flex justify-center text-[45px] md:text-[65px] lg:text-[85px] items-center  text-red-400 hover:text-red-600 hover:scale-90 transition-all duration-300 ease-in"
            type="button"
            onClick={onVideoStartPlay}
          >
            <FaCirclePlay />
          </button>
        </div>
      )}
      <div className="flex flex-col items-center sm:flex-row justify-center mt-3">
        <h4 className="text-1xl sm:text-xl md:text-3xl  text-red-400 font-popins font-bold uppercase">
          {name}
        </h4>
        {isLoggedIn && (
          <BtnRemoveVideo addClass="ml-auto" id={_id} name={name} />
        )}
      </div>
      <p className="text-white text-base sm:text-lg md:text-xl">
        {dateToDisplay(date)}
      </p>
    </div>
  );
};

export default YoutubeEmbed;

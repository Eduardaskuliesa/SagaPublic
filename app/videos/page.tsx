import React from 'react';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { Metadata } from 'next';
import PopUp from '@/components/PopUp';
import VideoForm from '@/components/videos/VideoForm';
import { getAllYtVideos } from '@/services/server/ytVideos';
import VideoListSwiper from '@/components/videos/VideoListSwiper';
import { imagesToBase64 } from '@/utils/placeholder';
import { placeholder } from '@/public/placeholder';

export const metadata: Metadata = {
  title: 'Videos | Saga Plans',
  description: 'Geriausi eventai pajūryje!',
};

export const dynamic = 'force-dynamic';

type Props = {
  searchParams: Record<string, string> | null | undefined;
};

const Videos = async ({ searchParams }: Props) => {
  const ytVideos: YtVideo[] = await getAllYtVideos();
  const showAddVideo = searchParams?.addVideo;

  const isLoggedIn = cookies().get('saga-sessionToken');

  const imgArray = ytVideos.map(
    (video) => `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`,
  );
  let blurImgArray: (string | undefined)[] = [];
  if (ytVideos && ytVideos.length > 0) {
    blurImgArray = await imagesToBase64(imgArray);
  }
  return (
    <main className="lg:overflow-hidden scroll">
      <div className="simple-background" />
      <h1 className="text-5xl lg:text-6xl lg:ml-60 mb-5 flex justify-center lg:justify-normal items-center text-stroke font-popins font-extrabold uppercase">
        Videos
      </h1>
      {isLoggedIn && (
        <div className="flex justify-center items-center">
          <Link
            href="/videos?addVideo=true"
            className="bg-green-400 m-5 mb-0 w-[135px] hover:bg-transparent text-white font-semibold hover:text-green-400 py-2 px-4 border border-green-400 duration-300 rounded"
          >
            Prideti video
          </Link>
        </div>
      )}

      {ytVideos && ytVideos.length > 0 && (
        <VideoListSwiper
          isLoggedIn={!!isLoggedIn}
          ytVideos={ytVideos}
          images={imgArray}
          imgBlur={
            blurImgArray.includes(undefined)
              ? new Array(imgArray.length).fill(placeholder)
              : blurImgArray
          }
        />
      )}

      {showAddVideo && isLoggedIn && (
        <PopUp closeLink="/videos">
          <VideoForm />
        </PopUp>
      )}
    </main>
  );
};

export default Videos;

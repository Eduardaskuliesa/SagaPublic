/* eslint-disable import/extensions */
import React from 'react';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { Metadata } from 'next';
import AlbumForm from '@/components/AlbumForm';
import PopUp from '@/components/PopUp';
import AlbumList from '@/components/AlbumList';
import getAllAlbums from '@/services/server/album';
import { imagesToBase64 } from '@/utils/placeholder';
import { placeholder } from '@/public/placeholder';

export const metadata: Metadata = {
  title: 'Photos | Saga Plans',
  description: 'Geriausi eventai pajūryje!',
};

export const dynamic = 'force-dynamic';

type Props = {
  searchParams: Record<string, string> | null | undefined;
};

const Photos = async ({ searchParams }: Props) => {
  const showCreateAlbum = searchParams?.createAlbum;
  const albums: Album[] = await getAllAlbums();
  const isLoggedIn = cookies().get('saga-sessionToken');

  let blurImgArray: (string | undefined)[] = [];

  if (albums.length > 0) {
    const immgArray = albums.map((album) => album.images[0].url);
    blurImgArray = await imagesToBase64(immgArray);
  }

  return (
    <main className="min-h-[100vh]">
      <div className="simple-background" />
      {isLoggedIn && (
        <div className="flex justify-center items-center">
          <Link
            href="/photos?createAlbum=true"
            className=" border-neutral-300 rounded-lg py-2 px-10 bg-red-400
        hover:bg-red-700 duration-300 text-white"
          >
            Add album
          </Link>
        </div>
      )}
      {albums && (
        <AlbumList
          albums={albums}
          blurImgs={
            blurImgArray.includes(undefined)
              ? new Array(albums.length).fill(placeholder)
              : blurImgArray
          }
          isLoggedIn={!!isLoggedIn}
        />
      )}
      {showCreateAlbum && (
        <PopUp closeLink="/photos">
          <AlbumForm />
        </PopUp>
      )}
    </main>
  );
};

export default Photos;

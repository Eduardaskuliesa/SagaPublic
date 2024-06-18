"use client";

/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */

import React from "react";
import { useSearchParams } from "next/navigation";
import PopUp from "./PopUp";
import AlbumFormUpdate from "./photos/AlbumFormUpdate";
import AlbumCard from "./photos/AlbumCard";

type Props = {
  albums: Album[];
  isLoggedIn: boolean;
  blurImgs: string[];
};

const AlbumList = ({ albums, isLoggedIn, blurImgs }: Props) => {
  const searchParams = useSearchParams();
  const showUpdateAlbum = searchParams.get("albumFormUpdate");

  return (
    <div className="grid grid-cols-1 w-[80%] lg:grid-cols-2 m-auto justify-items-center relative mb-16">
      {albums.map((album, i) => (
        <AlbumCard
          key={album._id + i}
          blurImg={blurImgs[i]}
          album={album}
          index={i}
          isLoggedIn={isLoggedIn}
        />
      ))}
      {showUpdateAlbum && (
        <PopUp closeLink="/photos">
          <AlbumFormUpdate album={albums[Number(showUpdateAlbum)]} />
        </PopUp>
      )}
    </div>
  );
};
export default AlbumList;

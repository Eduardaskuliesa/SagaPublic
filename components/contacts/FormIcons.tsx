'use client';

import React from 'react';
import {
  BsFacebook, BsTwitter, BsYoutube, BsTiktok,
} from 'react-icons/bs';
import { AiFillInstagram } from 'react-icons/ai';
import useCursorHandlers from '@/hooks/useCursorsHandlers';

const FormIcons = () => {
  const { onMouseEnter, onMouseLeave } = useCursorHandlers();
  return (
    <div
      className="flex flex-row text-lg items-center"
    >
      <div
        className="flex flex-row space-x-4 items-center"
        onMouseEnter={(e) => onMouseEnter(e, 'dot')}
        onMouseLeave={(e) => onMouseLeave(e, 'dot')}
      >
        <a className="hover:text-red-400 duration-300" href="https://www.facebook.com/profile.php?id=100089236126258" target="blank" aria-label="Twiter icon"><BsFacebook size={22} /></a>
        <a className="hover:text-red-400 duration-300" href="https://www.facebook.com/profile.php?id=100089236126258" target="blank" aria-label="Instagram icon"><AiFillInstagram size={28} /></a>
        <a className="hover:text-red-400 duration-300" href="https://www.facebook.com/profile.php?id=100089236126258" target="blank" aria-label="Twiter icon"><BsTwitter size={22} /></a>
        <a className="hover:text-red-400 duration-300" href="https://www.facebook.com/profile.php?id=100089236126258" target="blank" aria-label="Youtube icon"><BsYoutube size={22} /></a>
        <a className="hover:text-red-400 duration-300" href="https://www.facebook.com/profile.php?id=100089236126258" target="blank" aria-label="TickTock icon"><BsTiktok size={22} /></a>
      </div>

    </div>
  );
};

export default FormIcons;

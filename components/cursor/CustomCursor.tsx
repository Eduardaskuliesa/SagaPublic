'use client';

import React, {
  useState, useEffect, useContext, useRef,
} from 'react';
import { usePathname } from 'next/navigation';
import useMousePosition from '@/hooks/useMousePosition';
import { CursorContext } from './CursorContext';
import useMediaQuery from '@/hooks/useMediaQuerry';

const CustomCursor = () => {
  const isNotDekstop = useMediaQuery('(max-width: 1280px)');

  const { clientX, clientY } = useMousePosition();
  const [cursor, setCursor] = useContext(CursorContext);
  const [isVisible, setIsVisible] = useState(true);

  const pathname = usePathname();

  useEffect(() => {
    const transition = document.getElementById('.transition-element');
    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    document.body.addEventListener('mouseenter', handleMouseEnter);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    transition?.addEventListener('mouseenter', handleMouseEnter);
    transition?.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      document.body.removeEventListener('mouseleave', handleMouseLeave);

      transition?.removeEventListener('mouseenter', handleMouseEnter);
      transition?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    setCursor({
      view: false,
      more: false,
      dot: false,
      play: false,
      none: false,
    });
  }, [setCursor, pathname]);

  if (isNotDekstop) {
    return null;
  }

  const returnMouseScale = () => {
    if (cursor.dot) return 0.4;
    if (cursor.view) return 3;
    if (cursor.more) return 3;
    if (cursor.play) return 3;
    if (cursor.none) return 0;
    return 1;
  };

  const returnBorders = () => {
    if (cursor.dot) return '2px solid white';
    if (cursor.view || cursor.more || cursor.play || cursor.none) return '0px';
    return '2px solid white';
  };

  const returnBackgroundColor = () => {
    if (cursor.dot) return 'white';
    if (cursor.view || cursor.more || cursor.play) return 'rgba(248, 113, 113, 1)';
    return 'transparent';
  };

  const returnWord = () => {
    if (cursor.view) return 'VIEW';
    if (cursor.more) return 'MORE';
    if (cursor.play) return 'PLAY';
    return '';
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9998,
        pointerEvents: 'none',
      }}
    >
      {returnMouseScale() === 3 && (
      <span
        className="font-popins font-bold"
        style={{
          position: 'absolute',
          zIndex: 9999,
          fontSize: '16px',
          letterSpacing: '2px',
          color: 'white',
          left: clientX,
          top: clientY,
          transform: 'translate(-50%, -50%)',
        }}
      >
        {returnWord()}
      </span>

      )}

      <svg
        width={36}
        height={36}
        viewBox="0 0 50 50"
        style={{
          backgroundColor: returnBackgroundColor(),
          position: 'absolute',
          border: returnBorders(),
          borderRadius: '50%',
          left: clientX,
          top: clientY,
          transform: `translate(-50%, -50%) scale(${returnMouseScale()})`,
          transition: 'transform .2s ease-in-out',
          opacity: isVisible && clientX > 1 ? 1 : 0,
        }}
      />
    </div>
  );
};

export default CustomCursor;

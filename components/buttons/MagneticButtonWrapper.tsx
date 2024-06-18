/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';

type Props = {
  children: React.ReactElement
};

const MagneticButtonWrapper = ({ children }: Props) => {
  const magnetic = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const xTo = gsap.quickTo(magnetic.current!, 'x', { duration: 1, ease: 'elastic.out(1, 0.3)' });
    const yTo = gsap.quickTo(magnetic.current!, 'y', { duration: 1, ease: 'elastic.out(1, 0.3)' });

    const mouseMoveHandler = (e: MouseEvent) => {
      if (magnetic.current) {
        const { clientX, clientY } = e;
        const {
          height, width, left, top,
        } = magnetic.current.getBoundingClientRect();
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);
        xTo(x * 0.5);
        yTo(y * 0.5);
      }
    };

    const mouseLeaveHandler = () => {
      xTo(0);
      yTo(0);
    };

    magnetic.current?.addEventListener('mousemove', mouseMoveHandler);
    magnetic.current?.addEventListener('mouseleave', mouseLeaveHandler);

    return () => {
      magnetic.current?.removeEventListener('mousemove', mouseMoveHandler);
      magnetic.current?.removeEventListener('mouseleave', mouseLeaveHandler);
    };
  }, [children]);

  return React.cloneElement(children, { ref: magnetic });
};

export default MagneticButtonWrapper;

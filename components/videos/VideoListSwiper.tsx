'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import {
  Keyboard, Mousewheel, Navigation, Pagination,
} from 'swiper/modules';
import YoutubeEmbed from './YoutubeEmbed';
import 'swiper/css';
import useMediaQuery from '@/hooks/useMediaQuerry';

type Props = {
  ytVideos: YtVideo[];
  isLoggedIn: boolean;
  images: string[];
  imgBlur: string[];
};

const VideoListSwiper = ({
  ytVideos, isLoggedIn, images, imgBlur,
}: Props) => {
  const isMobile = useMediaQuery('(max-width: 767px)');
  return (
    <>
      {!isMobile ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          breakpoints={{
            1280: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            1620: {
              slidesPerView: 2,
              spaceBetween: 50,
            },
          }}
          centeredSlides
          pagination={{
            type: 'progressbar',
          }}
          mousewheel
          keyboard={{
            enabled: true,
          }}
          direction="horizontal"
          modules={[Pagination, Mousewheel, Keyboard]}
          className="w-screen"
        >
          {ytVideos.map((video: YtVideo, i) => (
            <SwiperSlide key={video._id + i}>
              <YoutubeEmbed
                key={video._id}
                isLoggedIn={isLoggedIn}
                {...video}
                vidWidth={854}
                vidHeight={480}
                thumbImg={images[i]}
                thumbBlur={imgBlur[i]}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="flex flex-col justify-start items-center mx-5">
          {ytVideos.map((video: YtVideo, i) => (
            <YoutubeEmbed
              key={video._id}
              isLoggedIn={isLoggedIn}
              {...video}
              vidWidth={854}
              vidHeight={480}
              thumbImg={images[i]}
              thumbBlur={imgBlur[i]}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default VideoListSwiper;

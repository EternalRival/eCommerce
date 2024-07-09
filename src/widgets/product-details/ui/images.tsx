import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import type { JSX } from 'react';
import type { SwiperClass } from 'swiper/react';
import type { Variant } from '~/entities/products';

type ImagesProps = Readonly<{
  variants: Variant[];
}>;

export function Images({ variants }: ImagesProps): JSX.Element {
  const [thumbsSwiper, setThumbsSwiper] = useState<Nullable<SwiperClass>>(null);
  const [modalSlide, setModalSlide] = useState(-1);
  const images = useMemo(() => {
    const urlList = new Set();
    const imageList: Variant['images'] = [];

    variants
      .flatMap((variant) => variant.images)
      .forEach((image) => {
        if (!urlList.has(image.url)) {
          urlList.add(image.url);
          imageList.push(image);
        }
      });

    return imageList;
  }, [variants]);

  return (
    <Box
      className="grid h-full max-h-96 grid-rows-[4fr_1fr]"
      sx={{ '--swiper-theme-color': 'auto' }}
    >
      <Dialog
        open={modalSlide >= 0}
        onClose={() => void setModalSlide(-1)}
        sx={{ '--swiper-theme-color': 'auto' }}
      >
        <IconButton
          sx={{ position: 'absolute', top: 8, right: 8, zIndex: 2 }}
          onClick={() => {
            setModalSlide(-1);
          }}
        >
          <CloseIcon />
        </IconButton>
        <Box>
          <Swiper
            modules={[FreeMode, Navigation, Thumbs]}
            navigation
            className="h-full w-full"
            initialSlide={modalSlide}
          >
            {images.map((image) => (
              <SwiperSlide key={image.url}>
                <Image
                  key={image.url}
                  src={image.url}
                  alt={image.label ?? ''}
                  width={image.dimensions.width}
                  height={image.dimensions.height}
                  className="h-full w-full object-cover"
                  priority
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Dialog>
      <Swiper
        modules={[FreeMode, Navigation, Thumbs]}
        navigation
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        className="h-full w-full"
      >
        {images.map((image, index) => (
          <SwiperSlide key={image.url}>
            <Image
              key={image.url}
              src={image.url}
              alt={image.label ?? ''}
              width={image.dimensions.width}
              height={image.dimensions.height}
              className="h-full w-full object-cover"
              priority
              onClick={() => void setModalSlide(index)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        slidesPerView={4}
        freeMode
        watchSlidesProgress
        modules={[FreeMode, Navigation, Thumbs]}
        className="h-full w-full py-2"
      >
        {images.map((image) => (
          <SwiperSlide
            key={image.url}
            className="opacity-40 [&.swiper-slide-thumb-active]:opacity-100"
          >
            <Image
              key={image.url}
              src={image.url}
              alt={image.label ?? ''}
              width={image.dimensions.width}
              height={image.dimensions.height}
              className="h-full w-full object-cover"
              priority
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}

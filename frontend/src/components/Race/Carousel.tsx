import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/swiper.css";
import "swiper/css/navigation.css";

const Carousel = ({
    imgs,
    swiperClass,
}: {
    imgs: string[] | null;
    swiperClass: string;
}) => {
    if (imgs === null || imgs === undefined) imgs = [];
    return (
        <Swiper
            modules={[Navigation]}
            navigation={true}
            className={`w-full ${swiperClass}`}
        >
            {imgs.length > 0 ? (
                imgs.map((img) => (
                    <SwiperSlide
                        className="inline-flex items-center justify-center swiper-big"
                        key={"slide" + img}
                    >
                        <img
                            key={"img" + img}
                            className="block rounded-lg border dark:border-gray-700 border-gray-300 dark:bg-gray-800 bg-gray-200"
                            src={img}
                            alt="race image"
                        />
                    </SwiperSlide>
                ))
            ) : (
                <></>
            )}
        </Swiper>
    );
};

export default Carousel;

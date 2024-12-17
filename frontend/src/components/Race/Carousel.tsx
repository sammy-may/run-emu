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
                            className="block rounded-lg border border-gray-700 bg-gray-800"
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

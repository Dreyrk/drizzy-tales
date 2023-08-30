'use client'

import { useState, useEffect } from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import CarouselItem from './CarouselItem';

const Carousel = ({ slides, auto = false, interval = 3000 }) => {
    const [current, setCurrent] = useState(0);
    const [touchStartX, setTouchStartX] = useState(null);

    const nextSlide = () => {
        setCurrent((current + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrent((current - 1 + slides.length) % slides.length);
    };

    const handleTouchStart = (e) => {
        setTouchStartX(e.touches[0].clientX);
    };

    const handleTouchEnd = (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const touchDiff = touchEndX - touchStartX;

        if (touchDiff > 50) {
            prevSlide();
        } else if (touchDiff < -50) {
            nextSlide();
        }
    };

    useEffect(() => {
        if (!auto) return
        const slideInterval = setInterval(nextSlide, interval)
        return () => clearInterval(slideInterval)
    }, [])

    return (
        <div className='relative w-screen overflow-hidden'
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <div className="flex w-full transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${current * 100}%)` }}
            >
                {slides.map((item) => {
                    return <CarouselItem key={item.id} anime={item} />
                })}
            </div>
            <div className="absolute inset-0 flex items-center justify-between p-4">
                <button
                    onClick={prevSlide}
                    className="p-1 text-gray-800 rounded-full shadow bg-white/60 hover:bg-white/80"
                >
                    <BsChevronLeft color='#202020' size={25} />
                </button>
                <button
                    onClick={nextSlide}
                    className="p-1 text-gray-600 rounded-full shadow bg-white/60 hover:bg-white/80"
                >
                    <BsChevronRight color='#202020' size={25} />
                </button>
            </div>
            <div className="absolute left-0 right-0 bottom-4">
                <div className="flex items-center justify-center gap-2">
                    {slides.map((_, i) => (
                        <div
                            key={i}
                            className={`
              transition-all w-3 h-3 bg-white rounded-full
              ${current === i ? "p-2" : "bg-opacity-50"}
            `} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Carousel;

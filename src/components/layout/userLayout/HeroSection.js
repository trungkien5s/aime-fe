import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const HeroSection = () => {
    const images = [
        "/secu.png",
        "/secu3.jpg",
        "/secu.webp",
        "/secu6.jpg",
        "/secu7.png",
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            nextImage();
        }, 5000);
        return () => clearInterval(interval);
    }, [currentImageIndex]);

    const nextImage = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentImageIndex((prev) => (prev + 1) % images.length);
            setIsTransitioning(false);
        }, 150);
    };

    const prevImage = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
            setIsTransitioning(false);
        }, 150);
    };

    const goToImage = (index) => {
        if (isTransitioning || index === currentImageIndex) return;
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentImageIndex(index);
            setIsTransitioning(false);
        }, 150);
    };

    return (
        <section className="relative h-screen overflow-hidden bg-black">
            {/* Slideshow Background */}
            <div className="absolute inset-0 z-0">
                <div className="relative w-full h-full">
                    {images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`Slide ${index + 1}`}
                            className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-in-out ${
                                index === currentImageIndex ? "opacity-100 scale-100" : "opacity-0 scale-105"
                            } ${isTransitioning ? "blur-sm" : "blur-0"}`}
                        />
                    ))}
                </div>
            </div>

            {/* Arrows */}
            <button
                onClick={prevImage}
                disabled={isTransitioning}
                className="absolute left-6 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/40 backdrop-blur-md rounded-full p-3 transition-all duration-200 group"
            >
                <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
            </button>
            <button
                onClick={nextImage}
                disabled={isTransitioning}
                className="absolute right-6 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/40 backdrop-blur-md rounded-full p-3 transition-all duration-200 group"
            >
                <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex space-x-3">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToImage(index)}
                        disabled={isTransitioning}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            index === currentImageIndex
                                ? "bg-white scale-125 shadow-lg"
                                : "bg-white/50 hover:bg-white/70 hover:scale-110"
                        }`}
                    />
                ))}
            </div>
        </section>
    );
};

export default HeroSection;

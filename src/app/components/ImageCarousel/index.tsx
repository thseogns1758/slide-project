import React from "react";

import { Box } from "@mui/material";
import { Button } from "@mui/material";
import { IoIosArrowForward } from "react-icons/io";
import { FaCircle } from "react-icons/fa";
interface ImageCarouselProps {
  itemLength: number;
  width: number;
  height: number;
  customButton?: React.ReactNode;
  contentStyle?: React.CSSProperties;
  buttonSize?: number;
  buttonPosition?: string;
  view?: number;
  children: React.ReactNode;
  autoPlay?: boolean;
  isInfinity?: boolean;
  isPageIndicator?: boolean;
  pageIndicatorBottom?: string;
  pageIndicatorColor?: string;
}
const ImageCarousel = ({
  itemLength,
  width,
  height,
  customButton,
  buttonSize = 40,
  buttonPosition = "50%",
  view = 1,
  children,
  autoPlay = false,
  isInfinity = false,
  isPageIndicator = false,
  pageIndicatorBottom = "0px",
  pageIndicatorColor = "pink",
}: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const buttonRef = React.useRef<HTMLDivElement>(null);

  const startX = React.useRef(0);
  const dragOffset = React.useRef(0);
  const isDragging = React.useRef(false);
  const totalItemLength = Math.ceil(itemLength / view) - 1;

  const handleNext = () => {
    if (isInfinity && currentIndex === totalItemLength)
      return setCurrentIndex(0);

    setCurrentIndex((prev) => {
      return prev === totalItemLength ? prev : prev + 1;
    });
  };
  const handlePrev = () => {
    if (currentIndex === 0) return;
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };
  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isDragging.current = true;
    startX.current = e.clientX;
  };
  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    const rawOffset = e.clientX - startX.current;
    dragOffset.current = rawOffset;

    if (dragOffset.current > width) {
      dragOffset.current = width;
    }

    if (dragOffset.current < -width) {
      dragOffset.current = -width;
    }

    if (carouselRef.current) {
      carouselRef.current.style.transform = `
      translateX(-${currentIndex * width - dragOffset.current}px)
    `;
    }
  };
  const onMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    isDragging.current = false;

    if (Math.abs(dragOffset.current) > width / 4) {
      dragOffset.current < 0 ? handleNext() : handlePrev();
    } else {
      if (carouselRef.current) {
        carouselRef.current.style.transform = `
        translateX(-${currentIndex * width}px)
      `;
      }
    }

    dragOffset.current = 0;
  };

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentIndex]);

  React.useEffect(() => {
    const translateX = currentIndex * width;
    const translateXStyle = {
      transform: `translateX(-${translateX}px)`,
    };
    if (carouselRef.current) {
      carouselRef.current.style.transform = translateXStyle.transform;
    }
  }, [currentIndex]);
  React.useEffect(() => {
    if (autoPlay) {
      const interval = setInterval(() => {
        handleNext();
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [autoPlay, currentIndex]);
  return (
    <Box
      className="relative overflow-hidden items-center flex"
      style={{
        width: width,
        height: height,
      }}
    >
      <Box
        className="absolute w-full flex items-center justify-between z-10 pointer-events-none"
        style={{
          top: buttonPosition,
          transform: "translateY(-50%)",
        }}
        ref={buttonRef}
      >
        <Button onClick={handlePrev} className="pointer-events-auto">
          {customButton ? (
            customButton
          ) : (
            <IoIosArrowForward
              size={buttonSize}
              color="white"
              style={{ transform: "rotate(180deg)" }}
            />
          )}
        </Button>

        <Button onClick={handleNext} className="pointer-events-auto">
          {customButton ? (
            customButton
          ) : (
            <IoIosArrowForward size={buttonSize} color="white" />
          )}
        </Button>
      </Box>

      <Box
        ref={carouselRef}
        className="flex relative items-center transition duration-150 ease-in-out"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
      >
        {children}
      </Box>
      {isPageIndicator && (
        <Box
          className="absolute left-1/2 transform -translate-x-1/2 flex gap-1"
          style={{ bottom: pageIndicatorBottom }}
        >
          {Array(totalItemLength + 1)
            .fill(0)
            .map((i, index) => (
              <FaCircle
                key={index}
                size={10}
                color={index === currentIndex ? pageIndicatorColor : "white"}
              />
            ))}
        </Box>
      )}
    </Box>
  );
};

export default ImageCarousel;

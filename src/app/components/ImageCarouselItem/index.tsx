import { Box } from "@mui/material";

interface ImageCarouselItemProps {
  children: React.ReactNode;
  width: number;
  view: number;
  contentStyle?: React.CSSProperties;
}
const ImageCarouselItem = ({
  children,
  width,
  view,
  contentStyle,
}: ImageCarouselItemProps) => {
  return (
    <Box
      className={`relative  h-full flex-shrink-0 flex pointer-events-none`}
      style={{ width: width / view, ...contentStyle }}
    >
      {children}
    </Box>
  );
};

export default ImageCarouselItem;

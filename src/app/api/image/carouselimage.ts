import { useQuery } from "@tanstack/react-query";

const fetchImages = async () => {
  const respons = await fetch("http://localhost:3002/images", {
    method: "GET",
  });
  const data = await respons.json();
  console.log(data);
  return data;
};
export const useCarouselImage = () => {
  return useQuery({
    queryKey: ["images"],
    queryFn: fetchImages,
  });
};

import { useQuery } from "@tanstack/react-query";
const getLocalStoragePage = (): string | null => {
  const storedData = localStorage.getItem("accessToken");

  return storedData ? JSON.parse(storedData) : "";
};
const useGetPageLocalStorage = () => {
  return useQuery<string | null>({
    queryKey: ["pageLocal"],
    queryFn: getLocalStoragePage,
    placeholderData: "dad",
    retry: 1,
    staleTime: 1000 * 60 * 5, // Làm mới dữ liệu sau 5 phút
  });
};
export { useGetPageLocalStorage };

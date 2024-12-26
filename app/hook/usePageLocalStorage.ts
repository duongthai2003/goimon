import { useQuery } from "@tanstack/react-query";
const getLocalStoragePage = (): string | null => {
  const storedData = localStorage.getItem("accessToken");

  return storedData ? storedData : "ko có";
};
const useGetPageLocalStorage = () => {
  return useQuery<string | null>({
    queryKey: ["pageLocal"],
    queryFn: getLocalStoragePage,
    placeholderData: "",
    retry: false, //thử lại mấy lần khi lỗi
    staleTime: 1000 * 60 * 5, // Làm mới dữ liệu sau 5 phút
  });
};

export { useGetPageLocalStorage };

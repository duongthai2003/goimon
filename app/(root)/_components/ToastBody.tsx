type Props = {
  type: "success" | "warning" | "error";
  message?: string;
};
const ToastBody = ({ type, message }: Props) => {
  return (
    <div className=" w-full ">
      <h1>{TypeMapping[type]?.title}</h1>
      <h1>{message}</h1>
    </div>
  );
};
const TypeMapping = {
  ["success"]: { title: "Thanh cong" },
  ["warning"]: { title: "canh bao" },
  ["error"]: { title: "That bai" },
};
export const getToastBody = (
  type: "success" | "warning" | "error",
  message?: string
) => {
  return <ToastBody type={type} message={message} />;
};

export default ToastBody;

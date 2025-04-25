import { FiInstagram } from "react-icons/fi";

export default function Social() {
  return (
    <div className="bg-[#212121] w-full flex items-center justify-center py-7 cursor-pointer">
      <FiInstagram className="text-[#5e5d5c] text-[25px] pr-1.5" />
      <p className="text-[#5e5d5c] text-[19px] font-normal">ZEPHANSANDCO</p>
    </div>
  );
}

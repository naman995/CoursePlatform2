export default function Banner({ content, allowClose, onClose, color }) {
  return (
    <div
      className={` md:mb-0 lg:mb-0 bg-${color}-600 w-[100%]  flex justify-center items-center `}
    >
      <div className="flex flex-row ">
        <div className="text-white font-bold rounded-t px-4 py-2">
          {content}
        </div>
      </div>
    </div>
  );
}

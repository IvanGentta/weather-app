import spinner from "../public/assets/Spinner.gif";
import Image from "next/image";

const Spinner = () => {
  return (
    <div>
      <Image className="w-[200px] m-auto block" src={spinner} alt="loading.." />
    </div>
  );
};

export default Spinner;

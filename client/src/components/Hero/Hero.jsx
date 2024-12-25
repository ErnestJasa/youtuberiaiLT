import YoutubeSVG from "../../assets/SVGs/YoutubeSVG";

function Hero() {
  return (
    <div className="text-center text-5xl font-bold py-20 font-novecento">
      <h1>Lietuvos</h1>
      <h1 className="flex justify-center items-center ">
        <span>
          <YoutubeSVG className="h-20 mb-2 mr-3 text-red-600" />
        </span>
        <span className="mb-2 ml-[-16px] mr-4">Tuberiai</span>
      </h1>
    </div>
  );
}

export default Hero;

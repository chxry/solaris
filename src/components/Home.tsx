import { Input } from ".";

const image = new URL(
  "../assets/giorgio-trovato-mIlvCv21W1s-unsplash.jpg",
  import.meta.url
);

const Home = () => {
  return (
    <main>
      <div className="flex flex-row ">
        <div className="basis-3/5">
          <img src={image} alt="solar panel" className="p-10"></img>
        </div>
        <div className="basis-2/5 pt-96 pr-20">
          <h1 className=" text-6xl">Welcome to Solaris</h1>
          <h2 className="text-2xl pt-1">
            The most efficient solar panel calculator
          </h2>
          <button className="rounded-lg bg-frost-2 w-80 h-10 text-2xl hover:bg-frost-1 transition-colors ">
            Start Calculating
          </button>
        </div>
      </div>
    </main>
  );
};

export default Home;

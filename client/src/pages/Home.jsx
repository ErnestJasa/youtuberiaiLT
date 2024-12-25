import { Link } from "wouter";
import CardList from "../components/CardList/CardList";
import Search from "../components/Search/Search";
import Hero from "../components/Hero/Hero.jsx";

function Home() {
  return (
    <section className="flex flex-col items-center ">
      <nav className="p-2 flex w-full">
        <Link
          className="ml-auto py-1 px-4 border border-orange-200 hover:bg-amber-100 active:bg-amber-200 text-xl"
          to="/kanalu-pasiulymai"
        >
          Pateikti kanalo pasiūlymą
        </Link>
      </nav>
      <article className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 w-[85%]">
        <Search />
        <CardList />
      </article>
    </section>
  );
}

export default Home;

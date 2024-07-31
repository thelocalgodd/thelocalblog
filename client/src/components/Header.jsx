export default function Header() {
  return (
    <main className="flex flex-row justify-between mx-4 font-semibold md:w-[730px] md:mx-auto">
      <p>
        <a href="/">thelocalblog</a>
        <a
          href="/posts"
          className="mx-4 text-white bg-zinc-500 px-4 rounded-full "
        >
          all posts
        </a>
      </p>
      <p className="text-red-400 underline">
        <a href="https://github.com/thelocalgodd/thelocalblog" target="_blank">
          source code
        </a>
      </p>
    </main>
  );
}

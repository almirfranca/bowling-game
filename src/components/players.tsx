export const Players = () => {
  return (
    <div className="flex flex-col items-center w-full h-[100vh] p-10">
      <div className="w-64 h-64">
        <img src="/public/logoBoliche.png" alt="Logo do Boliche" />
      </div>

      <form className="flex flex-row mt-8 border border-slate-700 rounded-md p-8 gap-8 max-w-6xl h-[400px] bg-slate-950 shadow-2xl">
        <div className="flex flex-col">
          <h1 className="text-slate-200 text-xl mb-4 font-semibold">
            Player 1
          </h1>
          <input
            type="text"
            placeholder="Name"
            className="text-slate-50  bg-slate-700 outline-none p-1 mb-12 rounded-sm"
          />
          <button
            type="button"
            className="bg-teal-500 text-slate-800 w-40 rounded-md p-2 hover:bg-teal-400"
          >
            Confirmar
          </button>
        </div>

        <div className="h-[300px] border border-slate-700 mt-7" />

        <div className="flex flex-col">
          <h1 className="text-slate-200 text-xl mb-4 font-semibold">
            Player 2
          </h1>
          <input
            type="text"
            placeholder="Name"
            className="text-slate-50  bg-slate-700 outline-none p-1 mb-12 rounded-sm"
          />
          <button
            type="button"
            className="bg-teal-500 text-slate-800 w-40 rounded-md p-2 hover:bg-teal-400"
          >
            Confirmar
          </button>
        </div>
      </form>

      <div>
        <button
          type="submit"
          className="bg-teal-500  hover:bg-teal-400 text-slate-800 text-xl p-3 w-48 mt-6 rounded-md mb-4"
        >
          Play !
        </button>
      </div>
    </div>
  );
};

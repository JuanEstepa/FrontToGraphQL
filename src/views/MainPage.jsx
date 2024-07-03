import NavBar from "../components/NavBar"; // Importa el componente NavBar desde la ruta especificada
import { useFetch, useDelete } from "../useFetch"; // Importa las funciones useFetch y useDelete desde el archivo useFetch.js

const MainPage = () => {
  // Define el componente MainPage como una función de flecha
  const { data, error, loading } = useFetch(
    // Utiliza la función useFetch para obtener datos de la URL especificada
    "https://back-graphql.vercel.app/graphql"
  );

  // Define una función Erase para eliminar un plato por su ID
  async function Erase(id) {
    try {
      const deletedDish = await useDelete(
        "https://back-graphql.vercel.app/graphql",
        id
      );
      console.log("Plato eliminado correctamente", deletedDish);
      alert("Eliminado con éxito");
    } catch (error) {
      console.error("Error al eliminar el plato:", error);
    }
  }

  // Retorna el JSX que representa la interfaz de usuario
  return (
    <>
      <NavBar page="Ver platos"></NavBar>
      {error && <h1>Error: {error.message}</h1>}
      {loading && <h1>Loading</h1>}
      <div className="container mx-auto p-4">
        <div className="flex flex-wrap justify-center gap-4">
          {data && // Verifica si hay datos antes de realizar el mapeo
            data.map(
              (
                dish // Mapea los datos y renderiza un div para cada plato
              ) => (
                <div
                  key={dish.id} // Asigna la clave única del plato como el ID del plato
                  className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" // Renderiza un div con clases de tailwindcss para estilizar el plato
                >
                  <img
                    className="rounded-t-lg object-cover w-full h-50" // Renderiza la imagen del plato con clases de tailwindcss para estilizarla
                    src={dish.image} // Asigna la fuente de la imagen como la URL del plato
                    alt={dish.name} // Asigna el nombre del plato como el atributo alt de la imagen
                  />
                  <div className="p-5">
                    <a href="#">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {dish.name}
                      </h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      {dish.description}
                    </p>
                    <p className="mb-3 font-bold text-gray-900 dark:text-white">
                      $ {dish.price.toLocaleString()}
                    </p>
                    <button // Renderiza un botón con clases de tailwindcss y un controlador de eventos onClick
                      onClick={() => Erase(dish.id)} // Llama a la función Erase con el ID del plato como argumento cuando se hace clic en el botón
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-rose-700 rounded-lg hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-300 dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-800" // Aplica clases de tailwindcss para estilizar el botón
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )
            )}
        </div>
      </div>
    </>
  );
};

export default MainPage; // Exporta el componente MainPage como el componente predeterminado de este archivo

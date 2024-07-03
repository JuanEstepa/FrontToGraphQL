import NavBar from "../components/NavBar";
import { useState } from "react";
import { useSave } from "../useFetch";

const Add = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    type: "",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const useSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form with data:", formData);
    try {
      await useSave("https://back-graphql.vercel.app/graphql", formData);
      console.log("Data saved successfully");
      alert("Guardado correctamente");
      // Aquí puedes realizar alguna acción después de guardar los datos exitosamente
    } catch (error) {
      console.error("Error al guardar los datos:", error.message);
    }
  };

  return (
    <div>
      <NavBar page="Agregar Plato" />
      <div className="container mx-auto px-4">
        <form onSubmit={useSubmit} className="max-w-lg mx-auto mt-10">
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block text-white font-semibold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 leading-tight border border-gray-600 text-white rounded shadow appearance-none focus:outline-none focus:shadow-outline bg-gray-800/50"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="price"
              className="block text-white font-semibold mb-2"
            >
              Price
            </label>
            <input
              type="text"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-3 py-2 leading-tight border border-gray-600 text-white rounded shadow appearance-none focus:outline-none focus:shadow-outline bg-gray-800/50"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="type"
              className="block text-white font-semibold mb-2"
            >
              Type
            </label>
            <select
              required
              className="form-control w-full px-3 py-2 leading-tight border border-gray-600 text-white rounded shadow appearance-none focus:outline-none focus:shadow-outline bg-gray-800/50"
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="">Selecciona una opción</option>
              <option value="Entrada">Entrada</option>
              <option value="Principal">Principal</option>
              <option value="Postre">Postre</option>
            </select>
          </div>
          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-white font-semibold mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 leading-tight border border-gray-600 text-white rounded shadow appearance-none focus:outline-none focus:shadow-outline bg-gray-800/50"
            ></textarea>
          </div>
          <div className="mb-6">
            <label
              htmlFor="image"
              className="block text-white font-semibold mb-2"
            >
              Image
            </label>
            <input
              type="text"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full px-3 py-2 leading-tight border border-gray-600 text-white rounded shadow appearance-none focus:outline-none focus:shadow-outline bg-gray-800/50"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-rose-500 hover:bg-rose-800/50 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;

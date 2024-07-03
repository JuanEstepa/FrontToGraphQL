import { useEffect, useState } from "react"; // Importa los hooks useEffect y useState desde React

/**
 * Hook personalizado para realizar una solicitud GET a una URL y gestionar el estado de los datos, errores y carga.
 */
export function useFetch(url) {
  const [data, setData] = useState(null); // Estado para almacenar los datos obtenidos de la solicitud
  const [error, setError] = useState(null); // Estado para almacenar cualquier error que ocurra durante la solicitud
  const [loading, setLoading] = useState(true); // Estado para indicar si la solicitud está en curso

  useEffect(() => {
    // Hook useEffect para realizar la solicitud cuando la URL cambia
    setLoading(true); // Establece el estado de carga en true al iniciar la solicitud
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `query GetAllDishes {
  getAllDishes {
    id
    name
    price
    type
    description
    image
  }
}`,
      }),
    }) // Realiza la solicitud GET a la URL especificada
      .then((res) => res.json()) // Parsea la respuesta a JSON
      .then((data) => {
        // Gestiona los datos obtenidos
        console.log(data);
        setData(data.data.getAllDishes); // Almacena los datos en el estado
        setLoading(false); // Establece el estado de carga en false una vez completada la solicitud
      })
      .catch((error) => {
        // Gestiona cualquier error que ocurra durante la solicitud
        setError(error); // Almacena el error en el estado
        setLoading(false); // Establece el estado de carga en false
      });
  }, [url]); // Se ejecuta cada vez que la URL cambia

  return { data, error, loading }; // Retorna un objeto que contiene los datos, el error y el estado de carga
}

/**
 * Hook personalizado para realizar una solicitud GET a una URL y buscar un elemento por su ID.
 */
export async function FindById(url, id) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: `
        query GetDishById($getDishByIdId: ID!) {
          getDishById(id: $getDishByIdId) {
            id
            name
            price
            type
            description
            image
          }
        }
      `,
      variables: { getDishByIdId: id },
    }),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const result = await response.json();
  return result.data.getDishById;
}

/**
 * Hook personalizado para realizar una solicitud POST a una URL con los datos proporcionados.
 */
export function useSave(url, data) {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          mutation AddDish($name: String!, $price: Int!, $type: String!, $description: String!, $image: String!) {
            addDish(name: $name, price: $price, type: $type, description: $description, image: $image) {
              id
              name
              price
              type
              description
              image
            }
          }`,
        variables: {
          name: data.name,
          price: parseInt(data.price, 10), // Asegúrate de que el precio sea un número entero
          type: data.type,
          description: data.description,
          image: data.image,
        },
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((responseData) => {
        if (responseData.errors) {
          throw new Error(
            responseData.errors.map((error) => error.message).join(", ")
          );
        }
        console.log("Response data:", responseData.data);
        if (responseData.data) {
          resolve(responseData.data);
        } else {
          reject(new Error("No data returned from the server"));
        }
      })
      .catch((err) => {
        console.error("Error during fetch operation:", err);
        reject(err);
      });
  });
}

/**
 * Hook personalizado para realizar una solicitud PUT a una URL con los datos proporcionados para editar un elemento.
 */
export function useEdit(url, id, data) {
  return new Promise((resolve, reject) => {
    // Retorna una promesa que se resolverá o rechazará
    fetch(url, {
      // Realiza la solicitud PUT a la URL especificada con los datos proporcionados
      method: "POST", // Método de solicitud PUT
      headers: {
        "Content-Type": "application/json", // Tipo de contenido JSON
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `mutation UpdateDish($updateDishId: ID!, $name: String!, $price: Int!, $type: String!, $description: String!, $image: String!) {
  updateDish(id: $updateDishId, name: $name, price: $price, type: $type, description: $description, image: $image) {
    id
    name
    price
    image
    description
    type
  }
}`,
        variables: {
          name: data.name,
          price: parseInt(data.price, 10),
          type: data.type,
          description: data.description,
          image: data.image,
          updateDishId: id,
        },
      }), // Convierte los datos a formato JSON y los envía en el cuerpo de la solicitud
    })
      .then((response) => response.text()) // Obtiene el texto de la respuesta
      .then((responseText) => {
        // Gestiona la respuesta obtenida
        const responseData = JSON.parse(responseText); // Parsea la respuesta JSON
        if (responseData.data) {
          // Verifica si la respuesta contiene datos
          alert("Plato editado con éxito"); // Muestra una alerta de éxito
          resolve(); // Resuelve la promesa
        } else {
          alert("Error al editar el plato"); // Muestra una alerta de error
          reject(); // Rechaza la promesa
        }
      })
      .catch((err) => {
        // Gestiona cualquier error que ocurra durante la solicitud
        console.log(err.message); // Muestra el mensaje de error en la consola
        reject(err); // Rechaza la promesa
      });
  });
}

/**
 * Hook personalizado para realizar una solicitud DELETE a una URL para eliminar un elemento.
 */

export function useDelete(url, id) {
  console.log("Deleting dish with ID:", id); // Log para depurar el ID
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: `mutation Mutation($deleteDishId: ID!) {
        deleteDish(id: $deleteDishId) {
          name
          price
          id
          image
          type
          description
        }
      }`,
      variables: { deleteDishId: id },
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.errors) {
        throw new Error(data.errors[0].message);
      }
      return data.data.deleteDish;
    });
}

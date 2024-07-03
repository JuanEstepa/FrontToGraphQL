import { Link } from "react-router-dom";

const navigation = [
  { name: "Ver platos", href: "/" },
  { name: "Agregar Plato", href: "/Add" },
  { name: "Editar plato", href: "/Edit" },
];

const NavBar = ({ page }) => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-center">
        <ul className="flex space-x-4">
          {navigation.map((item) => (
            <li key={item.name}>
              <Link
                to={item.href}
                className={
                  item.name == page
                    ? "bg-gray-900 text-white py-2 px-3 rounded-xl font-semibold"
                    : "p-3 rounded-xl text-gray-300 hover:bg-gray-700 hover:text-white"
                }
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;

import { useEffect, useState } from "react";
import { ListDevists } from "@/components/ListDevits";
import useUser from "@/hooks/useUser";
import { useAppContext } from "@/components/AppContext";

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { setAppContext } = useAppContext();
  const user = useUser();

  useEffect(() => {
    setAppContext?.({
      title: "Inicio / search",
      subTitle: "Realizar Busquedas",
    });
  }, [setAppContext, user]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar por username"
        value={searchTerm}
        onChange={handleSearchChange}
        className="border-2 border-blue-500 rounded p-3 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ease-in-out"
      />
      <ListDevists searchTerm={searchTerm} />
    </div>
  );
}

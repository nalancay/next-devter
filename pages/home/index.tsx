import { useEffect } from "react";
import useUser from "@/hooks/useUser";
import { useAppContext } from "../AppContext";
import { TopNavbar } from "@/components/TopNavbar";
import { ListDevists } from "@/components/ListDevits";

export default function HomePage() {
  const { setAppContext } = useAppContext();
  const user = useUser();

  useEffect(() => {
    setAppContext?.({
      title: "Inicio / Devter",
      subTitle: "Inicio",
      user,
    });
  }, [setAppContext, user]);

  return (
    <>
      <TopNavbar />
      <ListDevists />
    </>
  );
}

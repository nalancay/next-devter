import { useEffect } from "react";
import useUser from "@/hooks/useUser";
import { TopNavbar } from "@/components/TopNavbar";
import { ListDevists } from "@/components/ListDevits";
import { useAppContext } from "@/components/AppContext";

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

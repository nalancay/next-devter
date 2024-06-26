import { useEffect } from "react";
import { colors } from "../styles/theme";
import useUser, { USER_STATES } from "@/hooks/useUser";
import { useRouter } from "next/router";
import { GitHub } from "@/components/Icons/GitHub";
import { Logo } from "@/components/Icons/Logo";
import { Button } from "@/components/Button";
import { loginWithGitHub } from "@/firebase/client";

export default function Home() {
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    user && router.replace("/home");
  }, [user]);

  const handleClick = () => {
    loginWithGitHub().catch((err) => {
      console.error(err);
    });
  };

  return (
    <section className="grid place-content-center place-items-center h-screen">
      <div className="text-center">
        <Logo width="100" />
        <h1 className="text-primary font-bold text-4xl mt-4">Devter</h1>
        <h2 className="text-secondary text-lg mt-2">
          Talk about development <br /> with developers 👩‍💻👨‍💻
        </h2>
      </div>

      <div className="mt-8">
        {user === USER_STATES.NOT_LOGGED && (
          <Button onClick={handleClick}>
            <GitHub
              fill={`${colors.white}`}
              width={24}
              height={24}
              className="mr-2"
            />
            Login with GitHub
          </Button>
        )}
        {user === USER_STATES.NOT_KNOWN && (
          <img src="/spinner.gif" className="mt-4" />
        )}
      </div>
    </section>
  );
}

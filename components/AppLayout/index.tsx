import React, { ReactNode } from "react";
import Head from "next/head";
import { Avatar } from "../Avatar";
import { useAppContext } from "../AppContext";

type AppLayoutProps = {
  children: ReactNode;
};

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { title, subTitle, user } = useAppContext();
  return (
    <>
      {title && (
        <Head>
          <title>{title}</title>
        </Head>
      )}
      {user && subTitle && (
        <div className="flex items-center bg-white bg-opacity-80 backdrop-blur-md border-b border-gray-200 h-13 sticky mt-1 w-full">
          {user && (
            <section className="flex-shrink-0 ml-3 mb-1">
              <Avatar src={user.avatar || ""} />
            </section>
          )}
          <header className="flex-grow mb-3">
            <h2 className="text-xl font-bold pl-4">{subTitle}</h2>
          </header>
        </div>
      )}
      {children}
    </>
  );
};

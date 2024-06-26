import { FC } from "react";
import { Avatar } from "../Avatar";
import Link from "next/link";

export interface DevitProps {
  id?: string;
  avatar: string;
  username: string;
  message: string;
}

export const Devit: FC<DevitProps> = ({ id, avatar, username, message }) => {
  return (
    <article
      className={`border-b-2 border-blue-100 flex p-3 hover:bg-gray-100 cursor-pointer"`}
    >
      <div className="pr-3">
        <Avatar alt={username} src={avatar} />
      </div>

      {id ? (
        <Link href={`status/${id}`}>
          <section className="flex-1">
            <div className="flex items-center">
              <strong className="font-bold">{username}</strong>
            </div>
            <p className="leading-snug mt-1 text-sm sm:text-base">
              {message.length > 100 ? `${message.slice(0, 100)}...` : message}
            </p>
          </section>
        </Link>
      ) : (
        <section className="flex-1">
          <div className="flex items-center">
            <strong className="font-bold">{username}</strong>
          </div>
          <p className="leading-snug mt-1 text-sm sm:text-base">
            {message.length > 100 ? `${message.slice(0, 100)}...` : message}
          </p>
        </section>
      )}
    </article>
  );
};

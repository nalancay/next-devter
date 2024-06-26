import { useFetchList } from "@/hooks/useFetchList";
import TimeLine from "@/services/timeline";
import { Devit } from "../Devit";

interface TimelineItem {
  id: string;
  username: string;
  avatar: string;
  message: string;
}

interface ListDevistsProps {
  searchTerm?: string;
}

export const ListDevists: React.FC<ListDevistsProps> = ({
  searchTerm = "",
}) => {
  const {
    entities: timeline,
    isLoading,
    errorState,
  } = useFetchList<TimelineItem>({ functionFetch: TimeLine.getAllTimeLine });

  const filteredTimeline = timeline.filter((item) =>
    item.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="flex-1 overflow-y-auto p-4">
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loader border-t-4 border-b-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
        </div>
      ) : errorState.hasError ? (
        <div className="flex justify-center items-center h-64">
          <span className="text-red-500">
            Tenemos un problema técnico con el servidor. Mensaje:{" "}
            {errorState.message}
            Inténtalo más tarde.
          </span>
        </div>
      ) : (
        filteredTimeline.map(({ id, username, avatar, message }) => (
          <Devit
            key={id}
            id={id}
            avatar={avatar}
            message={message}
            username={username}
          />
        ))
      )}
    </section>
  );
};

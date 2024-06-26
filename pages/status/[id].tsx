import { useEffect, useState } from "react";
import { Devit } from "@/components/Devit";
import TimeLine from "@/services/timeline";
import { useRouter } from "next/router";

export const fetchTimeline = async ({ idTimeLine }: { idTimeLine: string }) => {
  try {
    const response = await TimeLine.getTimeLine(idTimeLine);
    return response;
  } catch (error) {
    console.error("Error fetching timeline:", error);
    throw error;
  }
};

export default function DevitPage({ timelineData }: { timelineData: any }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (timelineData === null) {
      setError("Error fetching timeline. Please try again.");
    }
  }, [timelineData]);

  if (router.isFallback) return <h1>Cargando...</h1>;

  if (error) {
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong className="font-bold">Error:</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }

  return (
    <>
      {timelineData ? (
        <Devit
          avatar={timelineData.avatar}
          message={timelineData.message}
          username={timelineData.username}
        />
      ) : (
        <p>No timeline data available.</p>
      )}
    </>
  );
}

DevitPage.getInitialProps = async (context: any) => {
  try {
    const { id } = context.query;
    const timelineData = await fetchTimeline({ idTimeLine: id });
    return { timelineData };
  } catch (error) {
    console.error("Error fetching timeline:", error);
    return { timelineData: null };
  }
};

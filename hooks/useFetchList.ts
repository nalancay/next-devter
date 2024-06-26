import { useEffect, useReducer, useState, useCallback } from "react";
import {
  ErrorState,
  UseFetchListParams,
  UseFetchListResult,
} from "./useFetchList.types";

export const useFetchList = <T>({
  functionFetch,
}: UseFetchListParams<T>): UseFetchListResult<T> => {
  const [errorState, setErrorState] = useState<ErrorState>({
    hasError: false,
    message: "",
  });
  const [isLoading, setLoading] = useState(false);
  const [entities, setEntities] = useState<T[]>([]);

  const fetchList = useCallback(() => {
    setLoading(true);
    functionFetch()
      .then((data) => {
        setLoading(false);
        setEntities(data);
      })
      .catch((err) => {
        setLoading(false);
        setErrorState({ hasError: true, message: err.message });
      });
  }, [functionFetch]);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  return { entities, isLoading, errorState, setEntities };
};

export interface ErrorState {
  hasError: boolean;
  message: string;
}

export interface UseFetchListResult<T> {
  entities: T[];
  isLoading: boolean;
  errorState: ErrorState;
  setEntities: React.Dispatch<React.SetStateAction<T[]>>;
}

export interface UseFetchListParams<T> {
  functionFetch: () => Promise<T[]>;
}

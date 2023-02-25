import React from "react";
import {UseQueryOptions} from "react-query/types/react/types";

type SetState<T> = React.Dispatch<React.SetStateAction<T>>;


type AppQueryOptions = Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'queryKey' | 'queryFn'>
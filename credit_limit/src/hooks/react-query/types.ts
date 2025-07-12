import type {
  QueryKey,
  UseMutationOptions as DefaultUseMutationOptions,
  UseQueryOptions as DefaultUseQueryOptions,
  UseInfiniteQueryOptions as DefaultUseInfiniteQueryOptions,
} from '@tanstack/react-query';

import type { CustomError, HTTPMethods } from 'utils/react-query';

export type MutationFnArgs<TVars = unknown> = {
  variables?: TVars;
  context?: {
    path?: string;
    method?: HTTPMethods;
    meta?: Record<string, unknown>;
    contentType?: string;
  };
};

export type UseMutationOptions<
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown,
> = DefaultUseMutationOptions<
  TData,
  CustomError<TError>,
  MutationFnArgs<TVariables>,
  TContext
>;

export type UseQueryOptions<
  TQueryFnData = unknown,
  TError = Record<string, unknown>,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> = DefaultUseQueryOptions<TQueryFnData, CustomError<TError>, TData, TQueryKey>;

export type UseInfiniteQueryOptions<
  TQueryFnData = unknown,
  TError = Record<string, unknown>,
  TData = TQueryFnData,
  TQueryData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> = DefaultUseInfiniteQueryOptions<
  TQueryFnData,
  CustomError<TError>,
  TData,
  TQueryData,
  TQueryKey
>;

/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateLocation = {
  rollContainerId: string,
  longitude: number,
  latitude: number,
};

export type CreateScanning = {
  rollContainerId: string,
  destination: string,
};

export type Observation = {
  __typename: "Observation",
  id: string,
  type: string,
  rollContainerId: string,
  longitude?: number | null,
  latitude?: number | null,
  destination?: string | null,
  createdAt?: string | null,
};

export type CreateLocationMutationVariables = {
  location?: CreateLocation | null,
};

export type CreateLocationMutation = {
  createLocation?: string | null,
};

export type CreateScanningMutationVariables = {
  scanning?: CreateScanning | null,
};

export type CreateScanningMutation = {
  createScanning?: string | null,
};

export type GetObservationsQueryVariables = {
};

export type GetObservationsQuery = {
  getObservations?:  Array< {
    __typename: "Observation",
    id: string,
    type: string,
    rollContainerId: string,
    longitude?: number | null,
    latitude?: number | null,
    destination?: string | null,
    createdAt?: string | null,
  } | null > | null,
};

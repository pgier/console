import { VMLikeEntityKind } from '../../types';
import { ValidationObject } from '../../utils/validations/types';

export type NetworkSimpleData = {
  name?: string;
  model?: string;
  networkName?: string;
  interfaceType?: string;
  macAddress?: string;
};

export type NetworkSimpleDataValidation = {
  name?: ValidationObject;
  model?: ValidationObject;
  network?: ValidationObject;
  interfaceType?: ValidationObject;
  macAddress?: ValidationObject;
};

export type NetworkBundle = NetworkSimpleData & {
  nic: any;
  network: any;
};

export type VMNicRowActionOpts = { withProgress: (promise: Promise<any>) => void };

export type VMNicRowCustomData = {
  vmLikeEntity: VMLikeEntityKind;
  columnClasses: string[];
  isDisabled: boolean;
} & VMNicRowActionOpts;

import {
  ChangedCommonData,
  ChangedCommonDataProp,
  CloudInitField,
  VMSettingsField,
  VMSettingsFieldType,
  VMWizardNetwork,
  VMWizardStorage,
  VMWizardTab,
} from '../types';
import { ValidationObject } from '../../../utils/validations/types';
import { DeviceType } from '../../../constants/vm';

export enum ActionType {
  Create = 'KubevirtVMWizardExternalCreate',
  Dispose = 'KubevirtVMWiExternalDispose',
  UpdateCommonData = 'KubevirtVMWizardExternalUpdateCommonData',
  SetVmSettingsFieldValue = 'KubevirtVMWizardExternalSetVmSettingsFieldValue',
  SetCloudInitFieldValue = 'KubevirtVMWizardExternalSetCloudInitFieldValue',
  SetTabLocked = 'KubevirtVMWizardExternalSetTabLocked',
  RemoveNIC = 'KubevirtVMWizardExternalRemoveNIC',
  UpdateNIC = 'KubevirtVMWizardExternalUpdateNIC',
  SetDeviceBootOrder = 'KubevirtVMWizardExternalSetDeviceBootOrder',
  RemoveStorage = 'KubevirtVMWizardExternalRemoveStorage',
  UpdateStorage = 'KubevirtVMWizardExternalUpdateStorage',
  SetResults = 'KubevirtVMWizardExternalSetResults',
}

// should not be called directly from outside redux code (e.g. stateUpdate)
export enum InternalActionType {
  Create = 'KubevirtVMWizardCreate',
  Dispose = 'KubevirtVMWizardDispose',
  Update = 'KubevirtVMWizardUpdate',
  UpdateCommonData = 'KubevirtVMWizardUpdateCommonData',
  SetTabValidity = 'KubevirtVMWizardSetTabValidity',
  SetTabLocked = 'KubevirtVMWizardSetTabLocked',
  SetVmSettingsFieldValue = 'KubevirtVMWizardSetVmSettingsFieldValue',
  SetCloudInitFieldValue = 'KubevirtVMWizardSetCloudInitFieldValue',
  SetInVmSettings = 'KubevirtVMWizardSetInVmSettings',
  SetInVmSettingsBatch = 'KubevirtVMWizardSetInVmSettingsBatch',
  UpdateVmSettingsField = 'KubevirtVMWizardUpdateVmSettingsField',
  UpdateVmSettings = 'KubevirtVMWizardUpdateVmSettings',
  RemoveNIC = 'KubevirtVMWizardRemoveNIC',
  UpdateNIC = 'KubevirtVMWizardUpdateNIC',
  SetDeviceBootOrder = 'KubevirtVMWizardSetDeviceBootOrder',
  RemoveStorage = 'KubevirtVMWizardRemoveStorage',
  UpdateStorage = 'KubevirtVMWizardUpdateStorage',
  SetNetworks = 'KubevirtVMWizardSetNetworks',
  SetStorages = 'KubevirtVMWizardSetStorages',
  SetResults = 'KubevirtVMWizardSetResults',
}

export type WizardInternalAction = {
  type: InternalActionType;
  payload: {
    id: string;
    value?: any;
    isValid?: boolean;
    isLocked?: boolean;
    isPending?: boolean;
    hasAllRequiredFilled?: boolean;
    path?: string[];
    key?: VMSettingsField | CloudInitField;
    tab?: VMWizardTab;
    batch?: ActionBatch;
    network?: VMWizardNetwork;
    networkID?: string;
    storage?: VMWizardStorage;
    storageID?: string;
    deviceID?: string;
    deviceType?: DeviceType;
    bootOrder?: number;
  };
};

export type WizardInternalActionDispatcher = (id: string, ...any) => WizardInternalAction;
export type WizardActionDispatcher = (
  id: string,
  ...any
) => (dispatch: Function, getState: Function) => void;

export type ActionBatch = { path: string[]; value: any }[];

export type UpdateOptions = {
  id: string;
  changedCommonData: ChangedCommonData;
  dispatch: Function;
  getState: Function;
  prevState: any;
};

export type VmSettingsValidator = (
  field: VMSettingsFieldType,
  options: UpdateOptions,
) => ValidationObject;

export type VMSettingsValidationConfig = {
  [key: string]: {
    detectValueChanges?: ((field, options) => VMSettingsField[]) | VMSettingsField[];
    detectCommonDataChanges?:
      | ((field, options) => ChangedCommonDataProp[])
      | ChangedCommonDataProp[];
    validator: VmSettingsValidator;
  };
};

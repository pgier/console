import { referenceForModel } from '@console/internal/module/k8s';
import { getName, getNamespace } from '@console/shared/src';
import * as _ from 'lodash';
import { VirtualMachineModel } from '../models';

export const getSequence = (from, to) => Array.from({ length: to - from + 1 }, (v, i) => i + from);

export const setNativeValue = (element, value) => {
  const valueSetter = Object.getOwnPropertyDescriptor(element, 'value').set;
  const prototype = Object.getPrototypeOf(element);
  const prototypeValueSetter = Object.getOwnPropertyDescriptor(prototype, 'value').set;

  if (valueSetter && valueSetter !== prototypeValueSetter) {
    prototypeValueSetter.call(element, value);
  } else {
    valueSetter.call(element, value);
  }
};

export const getFullResourceId = (obj) =>
  `${referenceForModel(obj)}~${getNamespace(obj)}~${getName(obj)}`;

export const getNextIDResolver = (entities: { id?: string }[]) => {
  let maxNetworkID =
    _.max(entities.map((entity) => (entity.id == null ? 0 : _.toSafeInteger(entity.id)))) || 0;
  return () => _.toString(++maxNetworkID);
};

export const wrapWithProgress = (setProgress: (inProgress: boolean) => void) => (
  promise: Promise<any>,
) => {
  setProgress(true);
  promise
    .then(() => setProgress(false))
    .catch((reason) => {
      setProgress(false);
      throw reason;
    });
};

export const getVMLikeModelName = (isCreateTemplate: boolean) =>
  isCreateTemplate ? 'virtual machine template' : VirtualMachineModel.label.toLowerCase();

export const getVMLikeModelListPath = (isCreateTemplate: boolean, namespace: string) =>
  isCreateTemplate
    ? `/k8s/ns/${namespace}/vmtemplates`
    : `/k8s/ns/${namespace}/${VirtualMachineModel.plural}`;

export const getVMLikeModelDetailPath = (
  isCreateTemplate: boolean,
  namespace: string,
  name: string,
) => `${getVMLikeModelListPath(isCreateTemplate, namespace)}/${name}`;

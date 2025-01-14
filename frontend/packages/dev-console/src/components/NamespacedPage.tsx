import * as React from 'react';
import * as cx from 'classnames';
import { NamespaceBar } from '@console/internal/components/namespace';
import ApplicationSelector from './dropdown/ApplicationSelector';

import './NamespacedPage.scss';

export enum NamespacedPageVariants {
  light = 'light',
  default = 'default',
}

export interface NamespacedPageProps {
  disabled?: boolean;
  hideApplications?: boolean;
  variant?: NamespacedPageVariants;
}

const NamespacedPage: React.FC<NamespacedPageProps> = ({
  children,
  disabled,
  hideApplications = false,
  variant = NamespacedPageVariants.default,
}) => (
  <div className="odc-namespaced-page">
    <NamespaceBar disabled={disabled}>
      {!hideApplications && <ApplicationSelector disabled={disabled} />}
    </NamespaceBar>
    <div
      className={cx('odc-namespaced-page__content', {
        [`is-${variant}`]: variant !== NamespacedPageVariants.default,
      })}
    >
      {children}
    </div>
  </div>
);

export default NamespacedPage;

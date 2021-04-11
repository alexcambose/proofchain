import { styled } from 'baseui';
import { KIND as ButtonKind } from 'baseui/button';
import {
  Modal as UIModal,
  ModalProps as UIModalProps,
  ModalBody,
  ModalButton,
  ModalFooter,
  ModalHeader as UIModalHeader,
  ROLE,
  SIZE,
} from 'baseui/modal';
import { merge } from 'lodash';
import React from 'react';

interface ModalProps extends UIModalProps {
  onClose?: () => void;
  opened?: boolean;
  header?: any;
  children: any;
  footer?: any | 'standard';
  isWide?: boolean;
}
const ModalHeader = styled(UIModalHeader, ({ $theme }) => ({
  fontWeight: 'bold',
  paddingBottom: $theme.sizing.scale300,
}));
const Modal: React.FC<ModalProps> = ({
  onClose,
  opened,
  header,
  children,
  footer,
  isWide,
  ...props
}) => {
  const standardFooter = (
    <>
      <ModalButton kind={ButtonKind.tertiary}>Cancel</ModalButton>
      <ModalButton>Okay</ModalButton>
    </>
  );
  return (
    <UIModal
      onClose={onClose}
      closeable
      isOpen={opened}
      animate
      autoFocus
      size={SIZE.default}
      role={ROLE.dialog}
      overrides={merge(props.overrides, {
        Root: {
          style: ({ $theme }) => {
            return {
              zIndex: 3,
            };
          },
        },
        Dialog: {
          style: () => {
            const styles: any = {};
            if (isWide) {
              styles.minWidth = '80vw';
            }
            return styles;
          },
        },
      })}
    >
      {header && <ModalHeader>{header}</ModalHeader>}
      {children && <ModalBody>{children}</ModalBody>}
      {footer && (
        <ModalFooter>
          {footer === 'standard' ? standardFooter : footer}
        </ModalFooter>
      )}
    </UIModal>
  );
};

export default Modal;

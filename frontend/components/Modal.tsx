import { styled } from 'baseui';
import { KIND as ButtonKind } from 'baseui/button';
import {
  Modal as UIModal,
  ModalBody,
  ModalButton,
  ModalFooter,
  ModalHeader as UIModalHeader,
  ROLE,
  SIZE,
} from 'baseui/modal';
import React from 'react';

interface ModalProps {
  onClose?: () => void;
  opened?: boolean;
  header?: any;
  children: any;
  footer?: any | 'standard';
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
      overrides={{
        Root: {
          style: ({ $theme }) => {
            return {
              zIndex: 3,
            };
          },
        },
      }}
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

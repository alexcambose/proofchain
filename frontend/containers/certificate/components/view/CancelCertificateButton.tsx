import Button, { ButtonColorStyle } from '@components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  cancelCertificate,
  fetchCertificateInfo,
} from '@store/certificate/actions';
import { refreshBalance } from '@store/user/actions';
import { SIZE } from 'baseui/button';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

interface ICancelCertificateButtonProps {
  materialTokenId?: number;
  companyAddress?: string;
  certificateCode: number;
}

const CancelCertificateButton: React.FC<ICancelCertificateButtonProps> = ({
  materialTokenId,
  companyAddress,
  certificateCode,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const handleClick = async () => {
    await dispatch(
      cancelCertificate({ materialTokenId, companyAddress, certificateCode })
    );
    await dispatch(refreshBalance());
    await dispatch(fetchCertificateInfo({ certificateCode }));
    setIsLoading(false);
  };
  return (
    <Button
      onClick={handleClick}
      size={SIZE.mini}
      isLoading={isLoading}
      colorStyle={ButtonColorStyle.DANGER}
    >
      <FontAwesomeIcon icon="times" /> Cancel
    </Button>
  );
};
export default CancelCertificateButton;

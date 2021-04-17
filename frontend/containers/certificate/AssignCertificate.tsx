import { State } from '@store/index';
import { fetchMinimumStake } from '@store/certificate/actions';
import { stat } from 'fs';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AssignCertificateForm from './components/form/AssignCertificateForm';
import Tabs from '@components/tab/Tabs';
import { ORIENTATION } from 'baseui/tabs-motion';

const AssignCertificate = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const minimumStake = useSelector(
    (state: State) => state.certificate.minimumStake
  );
  useEffect(() => {
    dispatch(fetchMinimumStake());
  }, []);
  const onSucess = () => {
    router.push('/certificate');
  };

  return (
    <>
      <Tabs
        orientation={ORIENTATION.vertical}
        tabs={[
          {
            title: 'Company',
            content: (
              <AssignCertificateForm
                isCompany
                certificateCode={router.query.certificateCode as string}
                minimumStake={minimumStake}
                onSuccess={onSucess}
              />
            ),
          },
          {
            title: 'Material',
            content: (
              <AssignCertificateForm
                certificateCode={router.query.certificateCode as string}
                minimumStake={minimumStake}
                onSuccess={onSucess}
              />
            ),
          },
        ]}
      />
    </>
  );
};
export default AssignCertificate;

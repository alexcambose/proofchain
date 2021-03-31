import { TransportStatusEnum } from '@enums';
import { fetchTransportInfo } from '@store/transport/actions';
import transactionWrapper from '@utils/transactionWrapper';
import { Button, SIZE } from 'baseui/button';
import { FormControl } from 'baseui/form-control';
import { Select } from 'baseui/select';
import proofchain from 'proofchain';
import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';

interface ICreateTransportEventFormProps {
  transportId: number;
  transportStatus: number;
}
const TransportStatusLabel = {
  [TransportStatusEnum.READY_FOR_TRANSIT]: 'Ready for transit',
  [TransportStatusEnum.PENDING_TRANSIT]: 'Pending transit',
  [TransportStatusEnum.IN_TRANSIT]: 'In transit',
  [TransportStatusEnum.PENDING_FINALISED]: 'Pending finalised',
  [TransportStatusEnum.FINALISED]: 'Finalised',
};
const OPTIONS = [
  {
    id: TransportStatusEnum.PENDING_TRANSIT,
    label: TransportStatusLabel[TransportStatusEnum.PENDING_TRANSIT],
  },
  {
    id: TransportStatusEnum.IN_TRANSIT,
    label: TransportStatusLabel[TransportStatusEnum.IN_TRANSIT],
  },
  {
    id: TransportStatusEnum.FINALISED,
    label: TransportStatusLabel[TransportStatusEnum.FINALISED],
  },
];
const availableOptions = {
  [TransportStatusEnum.NONE]: [
    {
      id: TransportStatusEnum.READY_FOR_TRANSIT,
      label: TransportStatusLabel[TransportStatusEnum.READY_FOR_TRANSIT],
    },
  ],
  [TransportStatusEnum.READY_FOR_TRANSIT]: [
    {
      id: TransportStatusEnum.PENDING_TRANSIT,
      label: TransportStatusLabel[TransportStatusEnum.PENDING_TRANSIT],
    },
  ],
  [TransportStatusEnum.PENDING_TRANSIT]: [
    {
      id: TransportStatusEnum.IN_TRANSIT,
      label: TransportStatusLabel[TransportStatusEnum.IN_TRANSIT],
    },
  ],
  [TransportStatusEnum.IN_TRANSIT]: [
    {
      id: TransportStatusEnum.PENDING_FINALISED,
      label: TransportStatusLabel[TransportStatusEnum.PENDING_FINALISED],
    },
    {
      id: TransportStatusEnum.PENDING_TRANSIT,
      label: TransportStatusLabel[TransportStatusEnum.PENDING_TRANSIT],
    },
  ],
  [TransportStatusEnum.PENDING_FINALISED]: [{}],
  [TransportStatusEnum.FINALISED]: [{}],
};
const CreateTransportEventForm: React.FunctionComponent<ICreateTransportEventFormProps> = ({
  transportId,
  transportStatus,
}) => {
  const [value, setValue] = useState<any>(availableOptions[transportStatus][0]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  console.log(transportStatus, TransportStatusEnum);
  useEffect(() => {
    setValue(availableOptions[transportStatus][0]);
  }, [transportStatus]);
  const onSubmit = async () => {
    setIsLoading(true);
    const result = await transactionWrapper(() =>
      proofchain().transport.setTransportStatus({
        transportId,
        status: value.id,
      })
    );
    if (result) await dispatch(fetchTransportInfo({ transportId }));
    setIsLoading(false);
  };
  if (transportStatus == TransportStatusEnum.FINALISED) {
    return null;
  }
  if (transportStatus == TransportStatusEnum.PENDING_FINALISED) {
    return <>Awaiting receiver confirmation</>;
  }
  return (
    <>
      <FormControl
        label="Status"
        htmlFor="statusSelect"
        caption="Select the status you want to assign to this transport"
      >
        <Select
          id="statusSelect"
          options={availableOptions[transportStatus]}
          labelKey="label"
          valueKey="id"
          searchable={false}
          clearable={false}
          onChange={({ value }) => setValue(value[0])}
          size={SIZE.compact}
          value={[value]}
        />
      </FormControl>

      <Button
        onClick={onSubmit}
        isLoading={isLoading}
        disabled={isLoading}
        size={SIZE.compact}
      >
        Set status
      </Button>
    </>
  );
};

export default CreateTransportEventForm;

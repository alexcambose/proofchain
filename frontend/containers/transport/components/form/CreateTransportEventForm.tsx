import { TransportStatusEnum } from '@enums';
import { fetchTransportInfo } from '@store/transport/actions';
import transactionWrapper from '@utils/transactionWrapper';
import { Button, SIZE } from 'baseui/button';
import { FormControl } from 'baseui/form-control';
import { Select } from 'baseui/select';
import proofchain from 'proofchain';
import * as React from 'react';
import { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';

interface ICreateTransportEventFormProps {
  transportId: number;
  transportStatus: number;
}
const TransportStatusLabel = {
  [TransportStatusEnum.READY_FOR_TRANSIT]: 'Ready for transit',
  [TransportStatusEnum.PENDING_TRANSIT]: 'Pending transit',
  [TransportStatusEnum.IN_TRANSIT]: 'In transit',
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
      id: TransportStatusEnum.PENDING_TRANSIT,
      label: TransportStatusLabel[TransportStatusEnum.PENDING_TRANSIT],
    },
    {
      id: TransportStatusEnum.FINALISED,
      label: TransportStatusLabel[TransportStatusEnum.IN_TRANSIT],
    },
  ],
};
const CreateTransportEventForm: React.FunctionComponent<ICreateTransportEventFormProps> = ({
  transportId,
  transportStatus,
}) => {
  const [value, setValue] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const onSubmit = async () => {
    setIsLoading(true);
    await transactionWrapper(
      proofchain().transport.setTransportStatus({
        transportId,
        status: value[0].id,
      })
    );
    await dispatch(fetchTransportInfo({ transportId }));
    setIsLoading(false);
  };
  return (
    <>
      <FormControl label="Status">
        <Select
          options={availableOptions[transportStatus]}
          labelKey="label"
          valueKey="id"
          searchable={false}
          clearable={false}
          onChange={({ value }) => setValue(value)}
          size={SIZE.compact}
          value={value}
        />
      </FormControl>

      <Button onClick={onSubmit} isLoading={isLoading} size={SIZE.compact}>
        Set status
      </Button>
    </>
  );
};

export default CreateTransportEventForm;

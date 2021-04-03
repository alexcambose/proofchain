import { fetchMaterialInstanceInfo } from '@store/client/actions';
import { FILL, StatefulTabs, Tab } from 'baseui/tabs-motion';
import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

interface IClientProductInfoProps {
  uuid: number;
}

const ClientProductInfo: React.FunctionComponent<IClientProductInfoProps> = ({
  uuid,
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMaterialInstanceInfo({ uuid }));
  }, []);
  return (
    <StatefulTabs fill={FILL.fixed}>
      <Tab title="First">I must not fear.</Tab>
      <Tab title="Product">Fear is the mind-killer.</Tab>
      <Tab title="Compnay">
        Fear is the little-death that brings total obliteration.
      </Tab>
    </StatefulTabs>
  );
};

export default ClientProductInfo;

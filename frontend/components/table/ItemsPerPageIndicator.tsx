import { styled } from 'baseui';
import { Select, Value } from 'baseui/select';
import { Label1 } from 'baseui/typography';
import React, { useState } from 'react';

interface IItemsPerPageIndicatorProps {
  onChange: (perPage: number) => void;
  perPage: number;
}
const options = [
  { id: 10, value: 10 },
  { id: 25, value: 25 },
  { id: 50, value: 50 },
  { id: 100, value: 100 },
];
const Container = styled('div', {
  display: 'flex',
  alignItems: 'center',
  cursor: 'default',
  userSelect: 'none',
});
const TextContent = styled(Label1, ({ $theme }) => ({
  marginLeft: $theme.sizing.scale200,
  marginRight: $theme.sizing.scale200,
}));
const ItemsPerPageIndicator: React.FC<IItemsPerPageIndicatorProps> = ({
  onChange,
  perPage,
}) => {
  return (
    <Container>
      <TextContent>Show</TextContent>
      <Select
        options={options}
        labelKey="id"
        valueKey="value"
        onChange={({ value }) => onChange(value[0].id as number)}
        value={[options.find((e) => e.id === perPage)]}
        searchable={false}
        clearable={false}
      />
      <TextContent>entries</TextContent>
    </Container>
  );
};

export default ItemsPerPageIndicator;

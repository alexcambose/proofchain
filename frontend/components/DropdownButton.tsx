import { Button } from 'baseui/button';
import { ChevronDown } from 'baseui/icon';
import { StatefulMenu } from 'baseui/menu';
import { PLACEMENT, StatefulPopover } from 'baseui/popover';
import React from 'react';

interface IDropdownButtonProps {
  items: [
    {
      label: string;
      id: any;
    }
  ];
  onSelect: (itemId: any) => void;
}
const DropdownButton: React.FC<IDropdownButtonProps> = ({
  items,
  onSelect,
}) => {
  const onItemSelected = () => {};
  return (
    <StatefulPopover
      focusLock
      placement={PLACEMENT.bottomLeft}
      content={({ close }) => (
        <StatefulMenu
          items={items}
          onItemSelect={() => close()}
          overrides={{
            List: { style: { height: '150px', width: '138px' } },
          }}
        />
      )}
    >
      <Button endEnhancer={() => <ChevronDown size={24} />}>Open Menu</Button>
    </StatefulPopover>
  );
};

export default DropdownButton;

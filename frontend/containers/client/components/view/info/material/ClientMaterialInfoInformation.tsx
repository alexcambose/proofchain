import VerticalTable from '@components/table/VerticalTable';
import TimeIndicator from '@components/TimeIndicator';
import TransactionLink from '@components/TransactionLink';
import { IMaterial } from 'interface';
import * as React from 'react';
import pluralize from 'pluralize';
import proofchain from 'proofchain';
import { useEffect, useState } from 'react';
import { getMaterialById } from '@utils/cachable';

interface IClientMaterialInfoInformationProps {
  material: IMaterial;
  mintEvent: any;
}

const ClientMaterialInfoInformation: React.FunctionComponent<IClientMaterialInfoInformationProps> = ({
  material,
  mintEvent,
}) => {
  const [ingredients, setIngrediends] = useState(null);
  const generateIngredients = async (material) => {
    let items = {};
    for (let i = 0; i < material.recipeMaterialTokenId.length; i++) {
      const { name, amountIdentifier } = await getMaterialById(
        material.recipeMaterialTokenId[i]
      );
      items[name] = pluralize(
        amountIdentifier,
        material.recipeMaterialAmount[i],
        true
      );
    }
    return <VerticalTable items={items} />;
  };
  // useEffect(() => {
  //   const events = [];

  //   (async () => {
  //     setIngrediends(await generateIngredients(material));
  //   })();
  // }, []);
  return (
    <VerticalTable
      items={{
        'Material token ID': material.materialTokenId,
        Name: material.name,
        Code: material.code,
        'Amount Identifier': material.amountIdentifier,
        Creator: material.creator,
        // Ingredients: ingredients,
        Created: <TimeIndicator>{mintEvent.block.timestamp}</TimeIndicator>,
        'Create Event': (
          <TransactionLink>{mintEvent.event.transactionHash}</TransactionLink>
        ),
      }}
    />
  );
};

export default ClientMaterialInfoInformation;

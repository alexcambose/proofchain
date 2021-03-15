import { Skeleton } from 'baseui/skeleton';
import { Display4 } from 'baseui/typography';
import { IMaterial } from 'interface';
import proofchain from 'proofchain';
import React, { useEffect, useState } from 'react';

interface IMaterialInfoProps {
  materialTokenId: number;
}
const MaterialInfo: React.FC<IMaterialInfoProps> = ({ materialTokenId }) => {
  const [materialInfo, setMaterialInfo] = useState<IMaterial>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fetchMaterialInfo = async () => {
    setIsLoading(true);
    const result = await proofchain().material.getById(materialTokenId);
    console.log(result);
    setMaterialInfo(result);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchMaterialInfo();
  }, []);
  if (isLoading) {
    return <Skeleton rows={10} height="200px" width="100%" animation />;
  }
  return <Display4>{JSON.stringify(materialInfo)}</Display4>;
};
export default MaterialInfo;

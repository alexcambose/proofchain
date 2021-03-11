import { toaster } from 'baseui/toast';

const transactionWrapper = async (callback) => {
  // toaster.info();
  return await callback();
};
export default transactionWrapper;

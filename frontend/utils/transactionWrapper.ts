import transactionToast from '@components/toast/transactionToast';
import { toaster } from 'baseui/toast';
import { shortenAddress } from './eth';

const transactionWrapper = async (callback) => {
  const toastPendingKey = toaster.info('Pending transaction...', {
    autoHideDuration: 0,
  });
  let result;
  try {
    result = await callback();
    console.log(result);
    transactionToast(result.transactionHash);
    toaster.clear(toastPendingKey);
  } catch (e) {
    console.error(e);
    toaster.negative('Error' + e, {});
  }
  toaster.clear(toastPendingKey);

  return result;
};
export default transactionWrapper;

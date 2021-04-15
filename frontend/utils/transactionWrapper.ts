import transactionToast from '@components/toast/transactionToast';
import TransactionConfirmation from '@components/TransactionConfirmation';
import { toaster } from 'baseui/toast';
const transactionWrapper = async (callback) => {
  let result;
  try {
    const gas = await callback.estimateGas();

    const gasPrice = await TransactionConfirmation(gas);
    console.log(gasPrice);
    callback.setGasPrice(gasPrice);
    return;
    if (gasPrice) {
      result = await callback.send();
      console.log(result);
    } else {
      return;
    }
    const toastPendingKey = toaster.info('Pending transaction...', {
      autoHideDuration: 0,
    });
    // @ts-ignore
    transactionToast(result.transactionHash);
    toaster.clear(toastPendingKey);
  } catch (e) {
    console.error(e);
    toaster.negative('Error' + e, {});
  }

  return result;
};
export default transactionWrapper;

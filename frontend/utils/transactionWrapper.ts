import transactionToast from '@components/toast/transactionToast';
import TransactionConfirmation from '@components/TransactionConfirmation';
import { toaster } from 'baseui/toast';
const transactionWrapper = async (transaction) => {
  let result;
  try {
    const gas = await transaction.estimateGas();

    const gasPrice = await TransactionConfirmation(gas);
    transaction.setGasPrice(gasPrice);
    if (gasPrice) {
      result = await transaction.send();
      console.log(result);
    } else {
      return;
    }
    // const toastPendingKey = toaster.info('Pending transaction...', {
    //   autoHideDuration: 0,
    // });
    // @ts-ignore
    transactionToast(result.transactionHash);
    // toaster.clear(toastPendingKey);
  } catch (e) {
    console.error(e);
    toaster.negative('Error' + e, {});
  }

  return result;
};
export default transactionWrapper;

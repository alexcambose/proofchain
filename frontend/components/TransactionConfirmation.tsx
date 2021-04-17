import Swal from 'sweetalert2';
import Web3 from 'web3';
import web3Instance from 'web3Instance';
import withReactContent from 'sweetalert2-react-content';
import { useState } from 'react';

const MySwal = withReactContent(Swal);
const Info = ({ gasPrice, setGasPrice, gasUsed }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [internalGasPrice, setInternalGasPrice] = useState(gasPrice);
  const onChange = (e) => {
    let valueNumber = Number(e.target.value);
    valueNumber = Math.min(9999, Math.max(1, valueNumber));

    const value = String(valueNumber) || '0';
    setGasPrice(value);
    setInternalGasPrice(value);
  };
  const onToggleClick = (e) => {
    e.preventDefault();
    setIsExpanded((v) => !v);
  };
  return (
    <div className="swal-transaction-confirm">
      <div>
        This transaction uses <strong>{gasUsed} gas</strong>. At an average gas
        price of <strong>{internalGasPrice} gwei</strong>, this transaction will
        cost{' '}
        <strong>
          {Web3.utils.fromWei(
            // @ts-ignore
            String(gasUsed * Web3.utils.toWei(internalGasPrice, 'gwei')),
            'ether'
          )}{' '}
          ETH
        </strong>
      </div>
      <a href="#" onClick={onToggleClick}>
        {isExpanded ? 'Hide Advanced options' : 'Advanced options'}
      </a>
      {isExpanded && (
        <div>
          <label htmlFor="gasPrice">Gas Price (GWEI)</label>
          <input
            id="gasPrice"
            type="number"
            placeholder="Gas price"
            min="1"
            max="1000"
            value={internalGasPrice}
            onChange={onChange}
          />
        </div>
      )}
    </div>
  );
};
const TransactionConfirmation = async (gasUsed) => {
  let gasPrice = await web3Instance().eth.getGasPrice();

  const { value } = await MySwal.fire({
    title: 'Confirm transaction',
    html: (
      <Info
        gasUsed={gasUsed}
        gasPrice={Web3.utils.fromWei(gasPrice, 'gwei')}
        setGasPrice={(val) => (gasPrice = Web3.utils.toWei(val, 'gwei'))}
      />
    ),
    showCloseButton: true,
    showCancelButton: true,
    confirmButtonText: `Send transaction`,
    icon: 'info',
    footer:
      '<a href="https://ethereum.org/en/developers/docs/gas/" target="_blank">What is this?</a>',
  });
  if (value) {
    return gasPrice;
  }
};
export default TransactionConfirmation;

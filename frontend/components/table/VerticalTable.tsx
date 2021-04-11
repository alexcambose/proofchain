import {
  StyledRoot,
  StyledTable,
  StyledTableHeadRow,
  StyledTableHeadCell,
  StyledTableBodyRow,
  StyledTableBodyCell,
} from 'baseui/table-semantic';
import React, { useState } from 'react';
import ChevronDown from 'baseui/icon/chevron-down';
import { Button, KIND, SIZE } from 'baseui/button';
import { StyledSpinnerNext as Spinner } from 'baseui/spinner';
import { ChevronUp } from 'baseui/icon';
import uuid from 'react-uuid';
import { StyledSpinnerNext, SIZE as SPINNER_SIZE } from 'baseui/spinner';
import { useStyletron } from 'baseui';
import { startCase } from 'lodash';
import web3Instance from 'web3Instance';

interface IVerticalTable {
  withTransactionDetails?: string;
  items: {
    [title: string]: any;
  };
}

const VerticalTable: React.FC<IVerticalTable> = ({
  items,
  withTransactionDetails,
}) => {
  const [css, theme] = useStyletron();
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpaned] = useState(false);
  const [transactionDetails, setTransactionDetails] = useState({});
  const onTransactionDetailsClick = async () => {
    setIsLoading(true);
    if (!isExpanded) {
      const transaction = await web3Instance().eth.getTransaction(
        withTransactionDetails
      );
      const transactionReceipt = await web3Instance().eth.getTransactionReceipt(
        withTransactionDetails
      );
      console.log({ ...transaction, ...transactionReceipt });
      setTransactionDetails({ ...transaction, ...transactionReceipt });
    }
    setIsExpaned((v) => !v);
    setIsLoading(false);
  };
  return (
    <div>
      <StyledRoot>
        <StyledTable>
          {Object.keys(items).map((key, i) => (
            <StyledTableBodyRow key={uuid()}>
              <StyledTableBodyCell>{key}</StyledTableBodyCell>
              <StyledTableBodyCell>{items[key]}</StyledTableBodyCell>
            </StyledTableBodyRow>
          ))}
          {withTransactionDetails && (
            <>
              {isExpanded &&
                Object.keys(transactionDetails).map((key, i) => (
                  <StyledTableBodyRow
                    className={css({
                      background: theme.colors.primary50,
                    })}
                    key={uuid()}
                  >
                    <StyledTableBodyCell>{startCase(key)}</StyledTableBodyCell>
                    <StyledTableBodyCell>
                      <code>
                        {typeof transactionDetails[key] === 'string'
                          ? transactionDetails[key]
                          : JSON.stringify(transactionDetails[key])}
                      </code>
                    </StyledTableBodyCell>
                  </StyledTableBodyRow>
                ))}
            </>
          )}
        </StyledTable>
      </StyledRoot>
      {withTransactionDetails && (
        <div
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
          }}
        >
          <Button
            onClick={onTransactionDetailsClick}
            kind={KIND.minimal}
            size={SIZE.mini}
          >
            {isLoading ? (
              <Spinner $size={SPINNER_SIZE.small} />
            ) : (
              <>
                {isExpanded ? (
                  <>
                    Hide transaction details <ChevronUp />
                  </>
                ) : (
                  <>
                    View transaction details <ChevronDown />
                  </>
                )}
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
};
export default VerticalTable;

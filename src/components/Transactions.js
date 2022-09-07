import { Table } from 'react-bootstrap'

const Transactions = ({
  transactionView,
  setTransactionView,
  transactions,
  currency,
  dateFormat
}) => {
  if (!transactions) {
    return (
      <p>
        No transactions found. You probably need to reload your budget file to
        see transactions.
      </p>
    )
  }

  const filteredTransactions = transactions
    .filter((t) => t[1] === transactionView[1])
    .reverse()

  return (
    <div>
      <h3>{transactionView[2]}</h3>
      <p>
        <strong>Balance: {currency.format(transactionView[3] / 100.0)}</strong>{' '}
        |{' '}
        <button
          className="back"
          onClick={() => {
            setTransactionView(null)
          }}
        >
          Go Back
        </button>
      </p>
      <Table striped hover bordered>
        <tbody>
          <tr>
            <th>Posted</th>
            <th>Memo</th>
            <th>Amount</th>
          </tr>

          {filteredTransactions.map((transaction) => (
            <tr key={transaction[0]}>
              <td>
                {new Date(transaction[2].split(' ')[0]).toLocaleDateString(
                  undefined,
                  dateFormat
                )}
              </td>
              <td>{transaction[3]}</td>
              <td>{currency.format(transaction[4] / 100.0)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Transactions

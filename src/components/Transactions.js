import { Table } from 'react-bootstrap'

const Transactions = ({
  transactionView,
  bucketTransactions,
  accountTransactions,
  currency,
  dateFormat
}) => {
  const transactions =
    transactionView[0] === 'bucket'
      ? bucketTransactions.filter((t) => t[1] === transactionView[1]).reverse()
      : accountTransactions

  return (
    <div>
      <h3>{transactionView[2]}</h3>
      <Table striped hover bordered>
        <tbody>
          <tr>
            <th>Posted</th>
            <th>Memo</th>
            <th>Amount</th>
          </tr>

          {transactions.map((transaction) => (
            <tr key={transaction[0]}>
              <td>
                {new Date(transaction[2]).toLocaleDateString(
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

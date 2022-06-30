import { Accordion, Table } from "react-bootstrap"

const Accounts = ({ accounts }) => {
  const budgetAccounts = accounts.filter(a => a[3] === "")
  const offBudgetAccounts = accounts.filter(a => a[3] === "offbudget")

  return (
    <Accordion defaultActiveKey={[]} alwaysOpen>
      <Accordion.Item eventKey={0}>
        <Accordion.Header>Budget Accounts</Accordion.Header>
        <Accordion.Body>
          <Table striped hover bordered>
            <tbody><tr><th>Name</th><th>Balance</th></tr>
              {budgetAccounts.map(account => (
                <tr key={account[0]}>
                  <td>{account[1]}</td>
                  <td style={{ width: "30%" }}>${account[2]/100.0}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey={1}>
        <Accordion.Header>Off Budget Accounts</Accordion.Header>
        <Accordion.Body>
          <Table striped hover bordered>
            <tbody><tr><th>Name</th><th>Balance</th></tr>
              {offBudgetAccounts.map(account => (
                <tr key={account[0]}>
                  <td>{account[1]}</td>
                  <td style={{ width: "30%" }}>${account[2]/100.0}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  )
}

export default Accounts
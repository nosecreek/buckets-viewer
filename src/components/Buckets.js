import { Accordion, Table } from 'react-bootstrap'

const Buckets = ({ buckets, bucketCats, currency }) => {
  return (
    <Accordion defaultActiveKey={[]} alwaysOpen>
      {Array.from(buckets.entries()).map((cat, i) => {
        return (
          <Accordion.Item eventKey={i} key={i}>
            <Accordion.Header>
              {bucketCats.values[cat[0] - 1]
                ? bucketCats.values[cat[0] - 1][1]
                : 'Misc'}
            </Accordion.Header>
            <Accordion.Body>
              <Table striped hover bordered>
                <tbody>
                  <tr>
                    <th>Name</th>
                    <th>Balance</th>
                  </tr>

                  {cat[1].map((bucket) => (
                    <tr key={bucket[0]}>
                      <td>{bucket[1]}</td>
                      <td>{currency.format(bucket[2] / 100.0)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Accordion.Body>
          </Accordion.Item>
        )
      })}
    </Accordion>
  )
}

export default Buckets

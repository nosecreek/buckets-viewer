import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Transactions from './Transactions'

describe('Transactions component displays buckets correctly', () => {
  let container
  const setTransactionView = jest.fn()

  beforeEach(() => {
    const transactionView = ['bucket', 2, 'Groceries', -25125]
    const bucketTransactions = [
      [1, 3, '2022-07-03 00:00:00-06:00', '', -20000],
      [2, 2, '2022-07-03 00:00:00-06:00', 'Loblaws', -15000],
      [3, 0, '2022-07-04 00:00:00-06:00', '', 50000],
      [4, 1, '2022-07-04 00:00:00-06:00', '', 120000],
      [5, 2, '2022-07-04 00:00:00-06:00', '', 30000],
      [6, 3, '2022-07-04 00:00:00-06:00', '', 100000],
      [7, 4, '2022-07-04 00:00:00-06:00', '', 40000],
      [8, -1, '2022-07-04 00:00:00-06:00', '', 500],
      [9, 4, '2022-07-04 00:00:00-06:00', '', -6320],
      [10, 0, '2022-07-04 00:00:00-06:00', '', -2271],
      [11, 3, '2022-07-04 00:00:00-06:00', '', -20250],
      [12, 1, '2022-07-04 00:00:00-06:00', '', -120000],
      [13, 2, '2022-07-04 00:00:00-06:00', 'Safeway', -40125]
    ]
    const currency = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })
    const dateFormat = { year: 'numeric', month: 'long', day: 'numeric' }

    container = render(
      <Transactions
        transactionView={transactionView}
        setTransactionView={setTransactionView}
        transactions={bucketTransactions}
        currency={currency}
        dateFormat={dateFormat}
      />
    ).container
  })

  test('renders bucket name in header', () => {
    const element = container.querySelector('h3')
    expect(element).toHaveTextContent('Groceries')
  })

  test('renders memo', () => {
    const element = container.querySelector('td:nth-child(2)')
    expect(element).toHaveTextContent('Safeway')
  })

  test('renders transaction balance', () => {
    const element = container.querySelector('td:nth-child(3)')
    expect(element).toHaveTextContent('-$401.25')
  })

  test('clicking go back calls handler to change view', async () => {
    const user = userEvent.setup()
    const element = screen.getByText('Go Back')
    await user.click(element)

    expect(setTransactionView).toHaveBeenCalledWith(null)
    expect(setTransactionView).toHaveBeenCalledTimes(1)
  })
})

describe('Transactions component displays accounts correctly', () => {
  let container
  const setTransactionView = jest.fn()

  beforeEach(() => {
    const transactionView = ['account', 1, 'Savings', 465000]
    const accountTransactions = [
      [1, 1, '2022-07-01 00:00:00-06:00', 'Initial Funding', 500000],
      [7, 3, '2022-07-02 00:00:00-06:00', '', 125000],
      [2, 1, '2022-07-03 00:00:00-06:00', '', -20000],
      [3, 1, '2022-07-03 00:00:00-06:00', 'Loblaws', -15000],
      [4, 2, '2022-07-04 00:00:00-06:00', '', -6320],
      [5, 2, '2022-07-04 00:00:00-06:00', '', -2271],
      [6, 2, '2022-07-04 00:00:00-06:00', '', -20250],
      [8, 3, '2022-07-04 00:00:00-06:00', '', -120000],
      [9, 2, '2022-07-04 00:00:00-06:00', 'Safeway', -40125]
    ]
    const currency = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })
    const dateFormat = { year: 'numeric', month: 'long', day: 'numeric' }

    container = render(
      <Transactions
        transactionView={transactionView}
        setTransactionView={setTransactionView}
        transactions={accountTransactions}
        currency={currency}
        dateFormat={dateFormat}
      />
    ).container
  })

  test('renders account name in header', () => {
    const element = container.querySelector('h3')
    expect(element).toHaveTextContent('Savings')
  })

  test('renders memo', () => {
    const element = container.querySelector('td:nth-child(2)')
    expect(element).toHaveTextContent('Loblaws')
  })

  test('renders transaction balance', () => {
    const element = container.querySelector('td:nth-child(3)')
    expect(element).toHaveTextContent('-$150.00')
  })

  test('clicking go back calls handler to change view', async () => {
    const user = userEvent.setup()
    const element = screen.getByText('Go Back')
    await user.click(element)

    expect(setTransactionView).toHaveBeenCalledWith(null)
    expect(setTransactionView).toHaveBeenCalledTimes(1)
  })
})

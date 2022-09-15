import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Accounts from './Accounts'

describe('Accounts component displays accounts correctly', () => {
  let container
  const setTransactionView = jest.fn()

  beforeEach(() => {
    const accounts = [[1,"Savings",465000,""],[2,"Credit Card",-68966,"debt"],[3,"Chequing",5000,""],[4,"Long-Term Savings",2105000,"offbudget"]]
    const currency = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })

    container = render(
      <Accounts
        accounts={accounts}
        setTransactionView={setTransactionView}
        currency={currency}
      />
    ).container
  })

  test('renders accordion header', () => {
    const element = container.querySelector('.accordion-header button')
    expect(element).toHaveTextContent('Budget Accounts')
  })

  test('renders list of accounts', () => {
    const element = container.querySelector('.accordion-item td')
    expect(element).toHaveTextContent('Savings')
  })

  test('renders account balances', () => {
    const element = container.querySelector('.accordion-item td:nth-child(2)')
    expect(element).toHaveTextContent('$4,650.00')
  })

  test('clicking an account calls handler to change view', async () => {
    const user = userEvent.setup()
    const element = screen.getByText('Chequing')
    await user.click(element)

    expect(setTransactionView).toHaveBeenCalledWith([
      'account',
      3,
      'Chequing',
      5000
    ])
    expect(setTransactionView).toHaveBeenCalledTimes(1)
  })
})

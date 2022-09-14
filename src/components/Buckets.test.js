import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Buckets from './Buckets'

describe('Buckets component displays buckets correctly', () => {
  let container
  const setTransactionView = jest.fn()

  beforeEach(() => {
    const buckets = new Map([
      [
        1,
        [
          [-1, 'Buckets License', 500, 1],
          [1, 'Rent', 0, 1],
          [2, 'Groceries', -25125, 1],
          [3, 'Car', 59750, 1]
        ]
      ],
      [
        -1,
        [
          [0, 'Hobbies', 47729, -1],
          [4, 'Activities', 33680, -1]
        ]
      ],
      [null, [[5, '', 0, null]]]
    ])
    const bucketCats = {
      columns: ['id', 'name'],
      values: [[1, 'Living Expenses']]
    }
    const currency = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })

    container = render(
      <Buckets
        buckets={buckets}
        bucketCats={bucketCats}
        setTransactionView={setTransactionView}
        currency={currency}
      />
    ).container
  })

  test('renders accordion header', () => {
    const element = container.querySelector('.accordion-header button')
    expect(element).toHaveTextContent('Living Expenses')
  })

  test('renders list of buckets', () => {
    const element = container.querySelector('.accordion-item td')
    expect(element).toHaveTextContent('Buckets License')
  })

  test('renders bucket balances', () => {
    const element = container.querySelector('.accordion-item td:nth-child(2)')
    expect(element).toHaveTextContent('$5.00')
  })

  test('clicking a bucket calls handler to change view', async () => {
    const user = userEvent.setup()
    const element = screen.getByText('Buckets License')
    await user.click(element)

    expect(setTransactionView).toHaveBeenCalledWith([
      'bucket',
      -1,
      'Buckets License',
      500
    ])
    expect(setTransactionView).toHaveBeenCalledTimes(1)
  })
})

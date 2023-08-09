import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  
  test('shows title and author, but does not show their URL or the number of likes by default', async () => {
    const blog = [
      {
        author: 'Dan Abramov',
        title: 'npm audit: Broken by Design',
        url: 'https://overreacted.io/npm-audit-broken-by-design/',
        likes:'4'
      }
    ]

    const { container } = render(<Blog blogs={blog} />)
    
    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent('npm audit: Broken by Design')
    expect(div).toHaveTextContent('Dan Abramov')
    expect(div).not.toHaveTextContent('https://overreacted.io/npm-audit-broken-by-design/')
    expect(div).not.toHaveTextContent('4')
  })

  test('the url and the number of likes are displayed when the view button is clicked', async () => {
    const blog = [
      {
        url: 'https://overreacted.io/npm-audit-broken-by-design/',
        likes:'4',
        user: [
          {
            'name': 'Matti Lukkainen',
          }
        ]
      }
    ]

    const user = {
      'name': 'Matti Lukkainen',
    }

    const { container } = render(<Blog blogs={blog} user={user}/>)
    const div = container.querySelector('.blog')
    const button = screen.getByText('view')
    await userEvent.click(button)
    
    expect(div).toHaveTextContent('https://overreacted.io/npm-audit-broken-by-design/')
    expect(div).toHaveTextContent('4')
  })

})
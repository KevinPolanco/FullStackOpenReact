import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> The event handler is called with the current inputs', async () => {
  const createBlog = jest.fn()
  const user = userEvent

  const { container } = render(<BlogForm createBlog={createBlog}/>)

  const inputTitle = container.querySelector('#blog-title-input')
  const inputAuthor = container.querySelector('#blog-author-input')
  const inputUrl = container.querySelector('#blog-url-input')
  const sendButton = screen.getByText('create')

  await user.type(inputTitle, 'npm audit: Broken by Design')
  await user.type(inputAuthor, 'Dan Abramov')
  await user.type(inputUrl, 'https://overreacted.io/npm-audit-broken-by-design/')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toEqual({
    title: 'npm audit: Broken by Design',
    author: 'Dan Abramov',
    url: 'https://overreacted.io/npm-audit-broken-by-design/'
  })

})


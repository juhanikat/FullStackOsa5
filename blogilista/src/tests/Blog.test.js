import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../components/Blog'


describe('Blog tests', () => {
  let blogUser
  let blog

  beforeEach(() => {
    blogUser = {
      username: 'test user',
      id: '12345'
    }
    blog = {
      title: 'test title',
      author: 'test author',
      url: 'www.testurl.fi',
      likes: 5,
      user: blogUser
    }
  })

  test('by default, blog renders title and author but not url or likes', async () => {
    const { container } = render(<Blog blog={blog} likeBlog={jest.fn()} removeBlog={jest.fn()} currentUser={null} />)
    console.log(screen.debug())
    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent('test title')
    expect(div).toHaveTextContent('test author')
    let element = screen.queryByText('www.testurl.fi', { exact: 'false' })
    expect(element).toBeNull()
    element = screen.queryByText('Likes: 5', { exact: 'false' })
    expect(element).toBeNull()
  })

  test('clicking view button shows url, likes and user', async () => {
    const { container } = render(<Blog blog={blog} likeBlog={jest.fn()} removeBlog={jest.fn()} currentUser={null} />)
    const user = userEvent.setup()
    const button = screen.getByText('View')
    await user.click(button)

    const div = container.querySelector('.expandedBlog')
    expect(div).toHaveTextContent('www.testurl.fi')
    expect(div).toHaveTextContent('Likes: 5')
    expect(div).toHaveTextContent('User: test user')
  })
})


import { composeStories } from '@storybook/testing-react'
import React from 'react'
import { renderDark, renderLight, screen, userEvent } from 'test-utils'
import * as stories from './Button.stories'

const { Default, Disabled, All } = composeStories(stories)

it('renders and can be clicked', () => {
  const onClickSpy = jest.fn()
  renderLight(<Default onClick={onClickSpy} />)
  const buttonElement = screen.getByRole('button')
  buttonElement.click()
  expect(onClickSpy).toHaveBeenCalled()
})

it('renders and can be accessed with keyboard', () => {
  const onClickSpy = jest.fn()
  renderLight(<Default onClick={onClickSpy} />)
  userEvent.tab()
  userEvent.keyboard('{enter}')
  expect(onClickSpy).toHaveBeenCalled()
})

it('renders disabled without role', async () => {
  renderDark(<Disabled />)
  const buttons = await screen.findAllByRole('button')
  buttons.forEach((b) => expect(b).toHaveAttribute('disabled'))
})

it('renders all variants without error', () => {
  const { asFragment } = renderDark(<All />)
  expect(asFragment()).toBeDefined()
})

import React from 'react'
import {
  renderDark,
  renderLight,
  screen,
  userEvent,
  waitForElementToBeRemoved,
} from 'test-utils'
import { Default, Controllable } from './Drawer.stories'

const defaultDrawerText = 'This is a Drawer'
const controlledDrawerText = 'This is a controlled drawer'

it('renders when closed', () => {
  const { asFragment } = renderLight(<Default />)
  expect(asFragment()).toBeDefined()
})

it('renders light panel without error', async () => {
  renderLight(<Default />)
  userEvent.click(screen.getByRole('button'))
  const panel = await screen.findByText(defaultDrawerText)
  expect(panel).toBeInTheDocument()
})

it('renders dark panel and closes', async () => {
  renderDark(<Default />)
  userEvent.click(screen.getByRole('button'))
  const panel = await screen.findByText(defaultDrawerText)
  expect(panel).toBeInTheDocument()
  const waiting = waitForElementToBeRemoved(() =>
    screen.queryByText(defaultDrawerText)
  )
  userEvent.type(panel, '{esc}')
  await waiting
})

it('renders default close button', async () => {
  renderDark(<Controllable />)
  userEvent.click(screen.getByRole('button', { name: /show/i }))
  const panel = await screen.findByText(controlledDrawerText)
  expect(panel).toBeInTheDocument()
  const waiting = waitForElementToBeRemoved(() =>
    screen.queryByText(controlledDrawerText)
  )
  userEvent.click(screen.getByRole('button', { name: /close/i }))
  await waiting
})

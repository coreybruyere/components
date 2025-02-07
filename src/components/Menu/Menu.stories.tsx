import { useBoolean } from '@committed/hooks'
import { action } from '@storybook/addon-actions'
import { Meta, Story } from '@storybook/react'
import React, { useState } from 'react'
import {
  Menu,
  MenuContent,
  MenuItem,
  MenuCheckboxItem,
  MenuItemGroup,
  MenuSeparator,
  MenuItemShortcut,
  MenuLabel,
  MenuRadioGroup,
  MenuRadioItem,
  MenuTrigger,
  MenuTriggerItem,
} from '.'
import { Button } from '../Button'

export default {
  title: 'Components/Menu',
  component: Menu,
  subcomponents: {
    MenuTrigger,
    MenuContent,
    MenuItem,
    MenuCheckboxItem,
    MenuRadioItem,
    MenuSeparator,
    MenuItemShortcut,
    MenuLabel,
    MenuItemGroup,
    MenuRadioGroup,
    MenuTriggerItem,
  },
} as Meta

export const Default: Story = (args) => (
  <Menu {...args}>
    <MenuTrigger>
      <Button>Trigger</Button>
    </MenuTrigger>
    <MenuContent>
      <MenuItem onSelect={action('cut')}>Cut</MenuItem>
      <MenuItem onSelect={action('copy')}>Copy</MenuItem>
      <MenuItem onSelect={action('paste')}>Paste</MenuItem>
    </MenuContent>
  </Menu>
)

export const WithDisabledItems: React.FC = () => (
  <Menu>
    <MenuTrigger>
      <Button>Trigger</Button>
    </MenuTrigger>
    <MenuContent>
      <MenuItem disabled>Cut</MenuItem>

      <MenuItem>Copy</MenuItem>
    </MenuContent>
  </Menu>
)

/* Separators and Groups can be used to arrange items in vertical and horizontal sections */
export const WithSeparators: React.FC = () => (
  <Menu>
    <MenuTrigger>
      <Button>Trigger</Button>
    </MenuTrigger>
    <MenuContent>
      <MenuItem>Cut</MenuItem>
      <MenuItem>Copy</MenuItem>
      <MenuItem>Paste</MenuItem>
      <MenuSeparator />
      <MenuItemGroup>
        <MenuLabel>Edit</MenuLabel>
        <MenuSeparator orientation="vertical" />
        <MenuItem>Cut</MenuItem>
        <MenuSeparator orientation="vertical" />
        <MenuItem>Copy</MenuItem>
        <MenuSeparator orientation="vertical" />
        <MenuItem>Paste</MenuItem>
      </MenuItemGroup>
      <MenuSeparator />
      <MenuItem>Item</MenuItem>
    </MenuContent>
  </Menu>
)

export const WithLabel: React.FC = () => (
  <Menu>
    <MenuTrigger>
      <Button>Trigger</Button>
    </MenuTrigger>
    <MenuContent>
      <MenuLabel>Actions</MenuLabel>
      <MenuItem>Cut</MenuItem>
      <MenuItem>Copy</MenuItem>
      <MenuItem>Paste</MenuItem>
    </MenuContent>
  </Menu>
)

export const Controlled = () => {
  const [open, { setTrue, setFalse }] = useBoolean(false)
  return (
    <>
      <Menu open={open} onOpenChange={setFalse}>
        <MenuTrigger>
          <Button onClick={setTrue}>Show Menu</Button>
        </MenuTrigger>
        <MenuContent>
          <MenuItem>Item</MenuItem>
        </MenuContent>
      </Menu>
    </>
  )
}

/* A `MenuCheckboxItem` are items with an indicated boolean state */
export const WithCheckbox = () => {
  const [checked, setChecked] = useState(true)
  return (
    <Menu>
      <MenuTrigger>
        <Button>Trigger</Button>
      </MenuTrigger>
      <MenuContent>
        <MenuCheckboxItem checked={checked} onCheckedChange={setChecked}>
          Cut
        </MenuCheckboxItem>
        <MenuCheckboxItem checked={false}>Paste</MenuCheckboxItem>
      </MenuContent>
    </Menu>
  )
}

/* `MenuItemRadioGroup` can be used to make sub `MenuRadioItem`s single select */
export const WithRadioItems = () => {
  const [color, setColor] = React.useState('blue')
  return (
    <Menu>
      <MenuTrigger>
        <Button>Trigger</Button>
      </MenuTrigger>
      <MenuContent>
        <MenuRadioGroup value={color} onValueChange={setColor}>
          <MenuRadioItem value="red">Red</MenuRadioItem>
          <MenuRadioItem value="green">Green</MenuRadioItem>
          <MenuRadioItem value="blue">Blue</MenuRadioItem>
        </MenuRadioGroup>
      </MenuContent>
    </Menu>
  )
}

/** Add shortcut indicators using the `MenuItemShortcut` */
export const Shortcuts = () => {
  return (
    <Menu>
      <MenuTrigger>
        <Button>Trigger</Button>
      </MenuTrigger>
      <MenuContent>
        <MenuItem>
          New Tab <MenuItemShortcut>⌘+T</MenuItemShortcut>
        </MenuItem>
        <MenuItem>
          New Window <MenuItemShortcut>⌘+N</MenuItemShortcut>
        </MenuItem>
      </MenuContent>
    </Menu>
  )
}

/** Create nested menus using a nested `Menu` component with a `MenuTriggerItem` and it's own `MenuContent` */
export const Nested = () => {
  return (
    <Menu>
      <MenuTrigger>
        <Button>Trigger</Button>
      </MenuTrigger>
      <MenuContent>
        <MenuItem>
          New Tab <MenuItemShortcut>⌘+T</MenuItemShortcut>
        </MenuItem>
        <MenuItem>
          New Window <MenuItemShortcut>⌘+N</MenuItemShortcut>
        </MenuItem>
        <Menu>
          <MenuTriggerItem>Developer</MenuTriggerItem>
          <MenuContent sideOffset={8}>
            <MenuItem>Test</MenuItem>
            <MenuItem>Build</MenuItem>
            <MenuItem>Start</MenuItem>
            <Menu>
              <MenuTriggerItem>More</MenuTriggerItem>
              <MenuContent sideOffset={8}>
                <MenuItem>Test</MenuItem>
                <MenuItem>Build</MenuItem>
                <MenuItem>Start</MenuItem>
              </MenuContent>
            </Menu>
          </MenuContent>
        </Menu>
      </MenuContent>
    </Menu>
  )
}

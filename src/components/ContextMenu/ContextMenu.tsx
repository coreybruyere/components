import {
  CheckboxItem,
  Content,
  Group,
  Item,
  ItemIndicator,
  Label,
  RadioGroup,
  RadioItem,
  Root,
  Separator,
  Trigger,
  TriggerItem,
} from '@radix-ui/react-context-menu'
import React, { ComponentProps, ElementRef, FC, forwardRef } from 'react'
import type { CSSProps } from '../../stitches.config'
import { styled } from '../../stitches.config'
import { Check, ChevronRight } from '../Icons'

const StyledContent = styled(Content, {
  minWidth: '$10',
  backgroundColor: '$background',
  borderRadius: '$default',
  padding: '$1',
  boxShadow: '$1',
})

const itemStyles = {
  fontSize: '$-1',
  padding: '$1 $3',
  borderRadius: '$default',
  cursor: 'default',
  transition: 'all 50ms',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  '&:focus': {
    outline: 'none',
    backgroundColor: '$selection',
    color: '$text',
  },

  '&[data-disabled]': {
    color: '$grey9',
  },
}

const StyledItem = styled(Item, itemStyles)

const StyledSeparator = styled(Separator, {
  height: 1,
  backgroundColor: '$grey8',

  variants: {
    orientation: {
      horizontal: {
        height: 1,
        margin: '$1 0',
      },
      vertical: {
        width: 1,
        height: 'auto',
        margin: '0 $1',
        flex: '1 1 100%',
      },
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
})

const StyledLabel = styled(Label, {
  color: '$grey10',
  fontSize: '$-1',
  padding: '$1 $3',
  cursor: 'default',
})

const StyledContextMenuTriggerItem = styled(TriggerItem, {
  ...itemStyles,
  '&[data-state="open"]': {
    background: '$selection',
  },
})

type ContextMenuTriggerItemProps = ComponentProps<typeof TriggerItem> & CSSProps

export const ContextMenuTriggerItem = forwardRef<
  ElementRef<typeof StyledContextMenuTriggerItem>,
  ContextMenuTriggerItemProps
>(({ children, ...props }, forwardedRef) => {
  return (
    <StyledContextMenuTriggerItem {...props} ref={forwardedRef}>
      {children}
      <ChevronRight css={{ size: '$4' }} />
    </StyledContextMenuTriggerItem>
  )
})
ContextMenuTriggerItem.toString = () =>
  `.${StyledContextMenuTriggerItem.className}`

export const ContextMenuItemGroup = styled(Group, {
  display: 'flex',
  marginLeft: '$3',
  marginRight: '$1',

  [`& ${StyledItem}`]: {
    paddingLeft: '$2',
  },
})

export const ContextMenuItemShortcut = styled('span', {
  fontFamily: '$monospace',
  lineHeight: '$body',
  color: '$textSecondary',
  marginLeft: '$3',
})

/**
 * The `ContextMenu` displays a pop up menu when right clicking the `ContextMenuTrigger`.
 */
export const ContextMenu = Root
export const ContextMenuTrigger = Trigger
export const ContextMenuItem: FC<ComponentProps<typeof Item>> = StyledItem
export const ContextMenuContent: FC<
  ComponentProps<typeof Content>
> = StyledContent
export const ContextMenuSeparator: FC<
  ComponentProps<typeof StyledSeparator>
> = StyledSeparator
export const ContextMenuLabel: FC<ComponentProps<typeof Label>> = StyledLabel

const StyledItemIndicator = styled(ItemIndicator, {
  position: 'absolute',
  left: '$2',
})

const StyledContextMenuCheckboxItem = styled(CheckboxItem, {
  ...itemStyles,
  padding: '$1 $2 $1 $5',
})

type ContextMenuCheckboxItemProps = ComponentProps<typeof CheckboxItem> &
  CSSProps

export const ContextMenuCheckboxItem = forwardRef<
  ElementRef<typeof StyledContextMenuCheckboxItem>,
  ContextMenuCheckboxItemProps
>(({ children, ...props }, forwardedRef) => {
  return (
    <StyledContextMenuCheckboxItem {...props} ref={forwardedRef}>
      <StyledItemIndicator>
        <Check css={{ height: 16, width: 16 }} />
      </StyledItemIndicator>
      {children}
    </StyledContextMenuCheckboxItem>
  )
})
ContextMenuCheckboxItem.toString = () =>
  `.${StyledContextMenuCheckboxItem.className}`

const StyledContextMenuRadioItem = styled(RadioItem, {
  ...itemStyles,
  padding: '$1 $2 $1 $5',
})

type ContextMenuRadioItemProps = ComponentProps<typeof RadioItem> & CSSProps

export const ContextMenuRadioItem = forwardRef<
  ElementRef<typeof StyledContextMenuRadioItem>,
  ContextMenuRadioItemProps
>(({ children, ...props }, forwardedRef) => {
  return (
    <StyledContextMenuRadioItem {...props} ref={forwardedRef}>
      <StyledItemIndicator>
        <Check css={{ height: 16, width: 16 }} />
      </StyledItemIndicator>
      {children}
    </StyledContextMenuRadioItem>
  )
})
ContextMenuRadioItem.toString = () => `.${StyledContextMenuRadioItem.className}`

export const ContextMenuRadioGroup = RadioGroup

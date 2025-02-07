import { Close, Content, Root } from '@radix-ui/react-dialog'
import React, { ComponentProps, ElementRef, forwardRef } from 'react'
import type {
  ChildProps,
  CSS,
  CSSProps,
  VariantProps,
} from '../../stitches.config'
import { keyframes, styled } from '../../stitches.config'
import { DialogClose, DialogTrigger, StyledOverlay } from '../Dialog/Dialog'
import { IconButton } from '../IconButton'
import { Close as Icon } from '../Icons'
import { paperStyles } from '../Paper'

export type DrawerPosition = 'left' | 'right' | 'top' | 'bottom'

// This should be reused from Dialog, but export currently causes a typing issue
const StyledIconButton = styled(IconButton, {
  position: 'fixed',
  right: '$1',
  top: '$1',
})

const slideIn = keyframes({
  from: { transform: '$$transformValue' },
  to: { transform: 'translate3d(0,0,0)' },
})

const slideOut = keyframes({
  from: { transform: 'translate3d(0,0,0)' },
  to: { transform: '$$transformValue' },
})

const StyledContent = styled(Content, paperStyles, {
  position: 'fixed',
  top: 0,
  bottom: 0,
  width: 250,
  willChange: 'transform',

  boxShadow: '$2',

  '&[data-state="open"]': {
    animation: `${slideIn} 150ms cubic-bezier(0.22, 1, 0.36, 1)`,
  },

  '&[data-state="closed"]': {
    animation: `${slideOut} 150ms cubic-bezier(0.22, 1, 0.36, 1)`,
  },

  variants: {
    side: {
      top: {
        $$transformValue: 'translate3d(0,-100%,0)',
        width: '100%',
        height: 300,
        bottom: 'auto',
      },
      right: {
        $$transformValue: 'translate3d(100%,0,0)',
        right: 0,
      },
      bottom: {
        $$transformValue: 'translate3d(0,100%,0)',
        width: '100%',
        height: 300,
        bottom: 0,
        top: 'auto',
      },
      left: {
        $$transformValue: 'translate3d(-100%,0,0)',
        left: 0,
      },
    },
  },

  defaultVariants: {
    side: 'left',
  },
})

type DrawerContentVariants = VariantProps<typeof StyledContent>

type DrawerContentProps = Omit<ComponentProps<typeof Content>, 'asChild'> &
  CSSProps &
  DrawerContentVariants & {
    /** Closable, add a standard close icon. */
    defaultClose?: boolean
  }

export const DrawerContent = forwardRef<
  ElementRef<typeof StyledContent>,
  DrawerContentProps
>(({ defaultClose, children, ...props }, forwardedRef) => (
  <StyledContent {...props} ref={forwardedRef}>
    {children}
    {defaultClose && (
      <Close asChild>
        <StyledIconButton aria-label="close" variant="tertiary">
          <Icon title="Close" />
        </StyledIconButton>
      </Close>
    )}
  </StyledContent>
))
DrawerContent.toString = () => `.${StyledContent.className}`

export const DrawerTrigger = DialogTrigger
export const DrawerClose = DialogClose

type DrawerProps = React.ComponentProps<typeof Root> &
  ChildProps & {
    /** Modify the default styling of the overlay */
    overlayCss?: CSS
  }

/**
 * The Drawer component can be used to overlay a panel from any side.
 *
 * Its appearance is controlled with the `open` and `onOpenChange` props or by providing a
 * `DrawerTrigger` and (optionally) a `DrawerClose` inside the main `Drawer`.
 * The content should be wrapped in a `DrawerContent`.
 *
 * Based on [Radix Dialog](https://radix-ui.com/primitives/docs/components/dialog).
 */
export const Drawer: React.FC<DrawerProps> = ({
  children,
  overlayCss,
  ...props
}) => {
  return (
    <Root {...props}>
      <StyledOverlay css={overlayCss} />
      {children}
    </Root>
  )
}

import type * as Polymorphic from '@radix-ui/react-polymorphic'
import React, { forwardRef } from 'react'
import type { CSS, CSSProps, VariantProps } from '../../stitches.config'
import { Text } from '../Text'

const DEFAULT_TAG = 'h3'

type SubheadingVariants = VariantProps<typeof Text>
type SubheadingOwnProps = CSSProps &
  SubheadingVariants & {
    variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  }

type SubheadingComponent = Polymorphic.ForwardRefComponent<
  typeof DEFAULT_TAG,
  SubheadingOwnProps
>

export const Subheading = forwardRef(
  ({ variant = DEFAULT_TAG, css, ...props }, forwardedRef) => {
    let subheadingProps: Partial<SubheadingVariants>
    const subheadingCss: CSS = {
      color: '$textSecondary',
      marginTop: '$1',
      marginBottom: '$4',
    }
    switch (variant) {
      case 'h1': {
        subheadingProps = { size: 3, weight: 'regular' }
        break
      }
      case 'h2': {
        subheadingProps = { size: 3, weight: 'regular' }
        break
      }
      case 'h3': {
        subheadingProps = { size: 2, weight: 'regular' }
        break
      }
      case 'h4': {
        subheadingProps = { size: 2, weight: 'regular' }
        break
      }
      case 'h5': {
        subheadingProps = { size: 1, weight: 'regular' }
        break
      }
      case 'h6': {
        subheadingProps = { size: 1, weight: 'regular' }
        break
      }
      default: {
        throw new Error(`unknown variant ${variant}`)
      }
    }

    return (
      <Text
        as="div"
        role="doc-subtitle"
        css={{ ...subheadingCss, ...css } as CSS}
        {...subheadingProps}
        {...props}
        ref={forwardedRef}
      />
    )
  }
) as SubheadingComponent

import { FC, HTMLAttributes } from 'react'
import Badge, { BadgeProps } from '@material-ui/core/Badge'
export type BadgeProps = BadgeProps
export { Badge }

// For documentation only
export type BaseBadgeProps = Omit<
  BadgeProps,
  keyof Omit<HTMLAttributes<HTMLDivElement>, 'color'>
> & {
  /**
   * @default { vertical: 'top', horizontal: 'right' }
   */
  anchorOrigin?: {
    vertical: 'top' | 'bottom'
    horizontal: 'left' | 'right'
  }
  /**
   * @default rectangle
   */
  overlap?: 'rectangle' | 'circle'
  /**
   * @default default
   */
  color?: 'primary' | 'secondary' | 'default' | 'error'
  /**
   * @default span
   */
  component?: React.ElementType<React.HTMLAttributes<HTMLDivElement>>
  /**
   * @default false
   */
  invisible?: boolean
  /**
   * @default 99
   */
  max?: number
  /**
   * @default false
   */
  showZero?: boolean
  /**
   * @default standard
   */
  variant?: 'standard' | 'dot'
}
export type RestBadgeProps = Omit<BadgeProps, keyof BaseBadgeProps>
export const BaseBadgeDocs: FC<BaseBadgeProps> = () => null
export const RestBadgeDocs: FC<RestBadgeProps> = () => null

import React, { FC, ComponentProps } from 'react'
import { Svg } from '../Svg'

export const Check: FC<ComponentProps<typeof Svg>> = (props) => (
  <Svg {...props}>
    <path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z" />
  </Svg>
)

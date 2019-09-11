import * as React from 'react'
import { withTheme } from '@material-ui/styles'
import { Color } from './colors'
import { Flex, Box, Theme, Heading } from '../'

export interface PaletteProps {
  name: string
  theme: Theme
}

export const Palette = withTheme(({ name, theme }: PaletteProps) => (
  <Box p={1} width={1 / 3}>
    <Color
      alignItems="center"
      justifyContent="center"
      height="75px"
      color={theme.palette[name].main}
      style={{ color: theme.palette[name].contrastText }}
    >
      <Heading.h5>{name}</Heading.h5>
    </Color>
    <Flex>
      <Color placement="bottom" color={theme.palette[name].light} />
      <Color placement="bottom" color={theme.palette[name].dark} />
    </Flex>
  </Box>
))

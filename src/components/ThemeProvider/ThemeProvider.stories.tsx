import { Meta, Story } from '@storybook/react'
import React from 'react'
import { blue, blueDark } from '@radix-ui/colors'
import {
  ThemeProvider,
  ThemeProviderProps,
  useTheme,
  useThemeController,
} from '.'
import {
  config,
  lightTheme,
  styled,
  createTheme,
  createDarkTheme,
} from '../../stitches.config'
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
} from '../Accordion'
import { Card } from '../Card'
import { Paper } from '../Paper'
import { Switch } from '../Switch'
import { Monospace, Paragraph, Span } from '../Text'

export default {
  title: 'Components/ThemeProvider',
  component: ThemeProvider,
  decorators: [],
} as Meta

const Example = styled(Paper, {
  width: '100%',
  height: '300px',
})

const Template: Story<ThemeProviderProps> = (args) => (
  <ThemeProvider local={true} {...args}>
    <Example>Example</Example>
  </ThemeProvider>
)

export const Default = () => <Example>Example</Example>
Default.parameters = {
  docs: {
    source: {
      code: `
<ThemeProvider>
  <Paper>Example</Paper>
</ThemeProvider>
`,
    },
  },
}

/**
 * Selects the Dark theme
 */
export const Dark = Template.bind({})
Dark.args = {
  choice: 'dark',
}
Dark.parameters = {
  docs: {
    source: {
      code: `
<ThemeProvider choice='dark'>
  <Paper>Example</Paper>
</ThemeProvider>
`,
    },
  },
}

/**
 * Selects the Light theme
 *
 * (NB As this provider is nested we provide the lightTheme explicitly so it will override any higher level dark theme.)
 */
export const Light = Template.bind({})
Light.args = {
  light: lightTheme,
  choice: 'light',
}
Light.parameters = {
  docs: {
    source: {
      code: `
<ThemeProvider choice='light' light={lightTheme}>
  <Paper>Example</Paper>
</ThemeProvider>
`,
    },
  },
}

/**
 * The `useThemeController` hook can be used to get the theme choice state and a toggle function.
 * This can be used to build a custom theme switch.
 */
export const UtilityUseThemeController = () => {
  const CustomSwitch = () => {
    const [choice, toggleChoice] = useThemeController()
    return <Switch checked={choice == 'dark'} onCheckedChange={toggleChoice} />
  }
  return (
    <ThemeProvider local={true}>
      <Card css={{ padding: '$6', margin: '$2' }}>
        <CustomSwitch />
      </Card>
    </ThemeProvider>
  )
}

/** The `useTheme` hook can be used to get the full details of the current theme. */
export const UtilityUseTheme = () => {
  const [theme] = useTheme()
  return (
    <Accordion type="single">
      <AccordionItem value="item-1">
        <AccordionHeader>
          <Monospace>Show theme</Monospace>
        </AccordionHeader>
        <AccordionContent>
          <Monospace>{JSON.stringify(theme, null, 2)}</Monospace>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

/**
 * The `useTheme` hook also provides a utility function to dereference theme tokens.
 * This can be used in case the theme details are required outside of the normal css landscape.*/
export const UtilityUseThemeResolve = () => {
  const [theme, resolve] = useTheme()
  return (
    <>
      <Paragraph>
        The token <Span font="monospace">$colors$background</Span> resolves to{' '}
        <Span font="monospace">{resolve('$colors$background')}</Span>{' '}
      </Paragraph>
      <Paragraph>
        The token <Span font="monospace">$space$3</Span> resolves to{' '}
        <Span font="monospace">{resolve('$space$3')}</Span>{' '}
      </Paragraph>
      <Paragraph>
        The token <Span font="monospace">$colors$success</Span> resolves to{' '}
        <Span font="monospace">{resolve('$colors$success')}</Span>{' '}
      </Paragraph>
      <Paragraph>
        The value <Span font="monospace">#123456</Span> resolves to{' '}
        <Span>{resolve('#123456')}</Span>{' '}
      </Paragraph>
    </>
  )
}

/**
 * To provide your own themes use the exported `theme` function and override the parts of the theme you wish to change.
 *
 * See the existing theme properties below for what can be configured.
 *
 */
export const CustomLight = Template.bind({})
CustomLight.args = {
  choice: 'light',
  light: createTheme({
    colors: {
      text: blue.blue10,
      paper: blue.blue3,
    },
  }),
}
CustomLight.parameters = {
  docs: {
    source: {
      code: `
import { theme, ThemeProvider, Paper } from '@committed/components'

const customTheme = createTheme({
  colors: {
    text: 'hsl(208 100% 47.3%)',
    paper: 'hsl(209 100% 96.5%)',
  }
})

export const CustomThemeProvider = () => (
  <ThemeProvider choice='light', light={customTheme}>
    <Paper>Example</Paper>
  </ThemeProvider>
)
`,
    },
  },
}

/**
 * For convenience the existing `darkThemeConfig` is exported.
 * This can be used as a starting point for custom dark themes.
 */
export const CustomDark = Template.bind({})
CustomDark.args = {
  choice: 'dark',
  dark: createDarkTheme({
    colors: {
      text: blueDark.blue10,
      paper: blueDark.blue3,
    },
  }),
}
CustomDark.parameters = {
  docs: {
    source: {
      code: `
 import { theme, ThemeProvider, Paper, darkThemeConfig } from '@committed/components'
 
 const customTheme = createDarkTheme({
  colors: {
    text: 'hsl(209 100% 60.6%)',
    paper: 'hsl(214 59.4% 15.3%)',
  },
 })
 
 export const CustomThemeProvider = () => (
   <ThemeProvider choice='dark', dark={customTheme}>
     <Paper>Example</Paper>
   </ThemeProvider>
 )
 `,
    },
  },
}

/**
 *
 * The properties below can be overridden to create a custom theme.
 *
 * Further tokens can be added for your own use in the `styled` function and `css` props.
 *
 * For more information see https://stitches.dev/docs/theming
 */
export const ThemeConfig = () => (
  <Paper>
    <Monospace>{JSON.stringify(config.theme, null, 2)}</Monospace>
  </Paper>
)

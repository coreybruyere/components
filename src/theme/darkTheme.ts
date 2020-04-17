import {
  fade,
  lighten,
  darken,
} from '@material-ui/core/styles/colorManipulator'
import {
  Palette,
  PaletteColor,
  PaletteOptions,
} from '@material-ui/core/styles/createPalette'
import { Overrides } from '@material-ui/core/styles/overrides'
import deepmerge from 'deepmerge'
import * as allColors from './colors'
import {
  addTransparency,
  baseCommittedOverrides,
  createCommittedFonts,
  createCommittedShape,
  createCommittedSpacing,
  createCommittedTypography,
} from './theme'

export type DarkPaletteColors = typeof committedDarkPaletteColors

const reversedColors = allColors
// Object.keys(allColors).forEach(key => {
//   if (allColors[key].reverse) {
//     reversedColors[key] = allColors[key].reverse()
//   }
// })

export const committedDarkPaletteColors = {
  ...reversedColors,
  brand: reversedColors.committedGrey,
  primary: reversedColors.committedYellow,
  secondary: {
    '300': reversedColors.committedGrey[50],
    '500': reversedColors.committedGrey[200],
    '700': reversedColors.committedGrey[400],
  },
  success: reversedColors.teal,
  warning: reversedColors.orange,
  error: reversedColors.red,
  info: reversedColors.lightBlueVivid,
  grey: reversedColors.grey,
}

const text = {
  primary: committedDarkPaletteColors.grey[50],
  secondary: committedDarkPaletteColors.grey[100],
  disabled: committedDarkPaletteColors.grey[200],
  hint: committedDarkPaletteColors.grey[500],
}

const action = {
  // The color of an active action like an icon button.
  active: 'rgba(255, 255, 255, 0.95)',
  // The color of an hovered action.
  hover: 'rgba(255, 255, 255, 0.08)',
  hoverOpacity: 0.08,
  // The color of a selected action.
  selected: 'rgba(255, 255, 255, 0.16)',
  selectedOpacity: 0.16,
  // The color of a disabled action.
  disabled: 'rgba(255, 255, 255, 0.3)',
  // The background color of a disabled action.
  disabledBackground: 'rgba(255, 255, 255, 0.12)',
  disabledOpacity: 0.38,
  focus: 'rgba(255, 255, 255, 0.12)',
  focusOpacity: 0.12,
  activatedOpacity: 0.24,
}

export const createCommittedDarkPaletteOptions = (): PaletteOptions => {
  const paletteColors = committedDarkPaletteColors
  const textColor = paletteColors.grey[900]
  return {
    type: 'dark',
    brand: {
      light: paletteColors.brand[300],
      main: paletteColors.brand[500],
      dark: paletteColors.brand[700],
      contrastText: textColor,
    },
    primary: {
      light: paletteColors.primary[300],
      main: paletteColors.primary[500],
      dark: paletteColors.primary[700],
      contrastText: paletteColors.brand[500],
    },
    secondary: {
      light: paletteColors.secondary[300],
      main: paletteColors.secondary[500],
      dark: paletteColors.secondary[700],
      contrastText: paletteColors.primary[500],
    },
    error: paletteColors.error,
    success: {
      light: paletteColors.success[300],
      main: paletteColors.success[500],
      dark: paletteColors.success[700],
      contrastText: textColor,
    },
    warning: {
      light: paletteColors.warning[200],
      main: paletteColors.warning[400],
      dark: paletteColors.warning[600],
      contrastText: textColor,
    },
    info: {
      light: paletteColors.info[100],
      main: paletteColors.info[300],
      dark: paletteColors.info[500],
      contrastText: textColor,
    },
    background: {
      default: 'black',
      paper: paletteColors.grey[800],
    },
    text,
    grey: paletteColors.grey,
    action,
    divider: 'rgba(255, 255, 255, 0.8)',
  }
}

// eqiv to color[400]
const mainLight = (color: PaletteColor): string => {
  return lighten(color.main, 0.25)
}

// color[200]
const lightLight = (color: PaletteColor): string => {
  return lighten(color.light, 0.25)
}

// color[100]
const lightLightVery = (color: PaletteColor): string => {
  return lighten(color.light, 0.5)
}

export const createCommittedDarkOverrides = (palette: Palette): Overrides => {
  return deepmerge(baseCommittedOverrides(palette, text, action), {
    MuiBadge: {
      colorSecondary: {
        backgroundColor: palette.secondary.dark,
      },
    },
    MuiButton: {
      root: {
        textTransform: 'none',
      },
      contained: {
        backgroundColor: palette.grey[400],
        '&:hover': {
          backgroundColor: lighten(palette.grey[300], action.hoverOpacity),
        },
        '&$disabled': {
          backgroundColor: addTransparency(palette.grey[300]),
        },
      },
      containedPrimary: {
        color: palette.getContrastText(palette.primary.main),
        '&:hover': {
          backgroundColor: lighten(palette.primary.light, action.hoverOpacity),
        },
        '&$disabled': {
          backgroundColor: addTransparency(palette.primary.main),
        },
      },
      containedSecondary: {
        color: palette.primary.dark,
        backgroundColor: palette.secondary.dark,
        '&:hover': {
          backgroundColor: lighten(palette.secondary.dark, action.hoverOpacity),
          // Reset on touch devices, it doesn't add specificity
          '@media (hover: none)': {
            backgroundColor: palette.secondary.main,
          },
        },
      },
      text: {
        '&$disabled': {
          color: addTransparency(text.primary),
        },
      },
      textPrimary: {
        color: palette.primary.main,
        '&:hover': {
          backgroundColor: fade(palette.primary.main, action.hoverOpacity),
        },
      },
      textSecondary: {
        color: palette.secondary.main,
        '&:hover': {
          backgroundColor: fade(palette.primary.main, action.hoverOpacity),
        },
      },
      outlined: {
        '&$disabled': {
          borderColor: addTransparency(palette.grey[500]),
          color: addTransparency(palette.grey[200]),
        },
      },
      outlinedPrimary: {
        backgroundColor: palette.brand.light,
        '&:hover': {
          backgroundColor: lightLight(palette.brand),
        },
        '&$disabled': {
          backgroundColor: addTransparency(lightLightVery(palette.brand)),
          borderColor: addTransparency(palette.primary.main),
        },
      },
      outlinedSecondary: {
        //        color: palette.getContrastText(palette.grey[300]),
        color: palette.getContrastText(mainLight(palette.primary)),
        backgroundColor: mainLight(palette.primary),
        '&:hover': {
          backgroundColor: lighten(
            mainLight(palette.primary),
            action.hoverOpacity
          ),
        },
        '&$disabled': {
          backgroundColor: addTransparency(mainLight(palette.primary)),
          borderColor: addTransparency(palette.secondary.light),
        },
      },
      disabled: {},
    },
    MuiCheckbox: {
      root: {
        color: palette.grey[500],
        '&$disabled': {
          color: addTransparency(palette.grey[500]),
        },
      },
      colorPrimary: {
        color: palette.primary.main,
        '&$checked': {
          color: palette.primary.main,
          '&:hover': {
            backgroundColor: fade(palette.brand.main, action.hoverOpacity),
          },
        },
        '& span:nth-of-type(2)': {
          color: palette.primary.main,
        },
        '&$disabled': {
          color: addTransparency(palette.primary.main),
        },
      },
      colorSecondary: {
        color: palette.secondary.main,
        '&$checked': {
          color: palette.secondary.main,
          '&:hover': {
            backgroundColor: fade(palette.primary.main, action.hoverOpacity),
          },
        },
        '& span:nth-of-type(2)': {
          color: palette.primary.main,
        },
        '&$disabled': {
          color: addTransparency(palette.secondary.light),
        },
      },
    },
    MuiCssBaseline: {
      '@global': {
        /* Disable auto-enlargement of small text in Safari */
        textSizeAdjust: '100%',
        /* Enable kerning and optional ligatures */
        textRendering: 'optimizeLegibility',
        /**
         * Form elements render using OS defaults,
         * so font-family inheritance must be specifically declared
         */
        'button, input, optgroup, select, textarea': {
          fontFamily: 'inherit',
          fontSize: 'inherit',
        },
      },
    },
    MuiDialog: {
      paper: {
        borderTop: `4px solid ${palette.brand.main}`,
      },
    },
    MuiDivider: {
      vertical: {
        // 100% is the default, this doesn't seem to work so set to auto
        height: 'auto',
      },
    },
    MuiIconButton: {
      colorPrimary: {
        '&:hover': {
          backgroundColor: fade(palette.primary.main, action.hoverOpacity),
        },
        '& span:nth-of-type(2)': {
          color: palette.primary.main,
        },
      },
      colorSecondary: {
        color: palette.secondary.main,
        '&:hover': {
          backgroundColor: fade(palette.primary.main, action.hoverOpacity),
        },
        '& span:nth-of-type(2)': {
          color: palette.secondary.main,
        },
      },
    },
    MuiRadio: {
      root: {
        color: palette.grey[500],
        '&$disabled': {
          color: addTransparency(palette.grey[500]),
        },
      },
      colorPrimary: {
        color: palette.primary.main,
        '&$checked': {
          color: palette.primary.main,
          '&:hover': {
            backgroundColor: fade(palette.brand.main, action.hoverOpacity),
          },
        },
        '& span:nth-of-type(2)': {
          color: palette.brand.main,
        },
        '& svg:nth-of-type(2)': {
          color: palette.brand.main,
        },
        '&$disabled': {
          color: addTransparency(palette.primary.main),
          '& svg:nth-of-type(2)': {
            color: addTransparency(palette.brand.main),
          },
        },
      },
      colorSecondary: {
        color: palette.secondary.light,
        '&$checked': {
          color: palette.secondary.light,
          '&:hover': {
            backgroundColor: fade(palette.primary.main, action.hoverOpacity),
          },
        },
        '& span:nth-of-type(2)': {
          color: palette.primary.main,
        },
        '& svg:nth-of-type(2)': {
          color: palette.primary.main,
        },
        '&$disabled': {
          color: addTransparency(palette.secondary.light),
          '& svg:nth-of-type(2)': {
            color: addTransparency(palette.primary.main),
          },
        },
      },
    },
    MuiSwitch: {
      root: {
        color: palette.grey[500],
        '&$disabled': {
          color: addTransparency(palette.grey[500]),
        },
      },
      colorPrimary: {
        '&$checked + $track': {
          backgroundColor: palette.brand.main,
        },
      },
    },
    MuiTableHead: {
      root: {
        '& th': {
          fontWeight: 'bold',
          color: text.primary,
        },
        borderBottom: `2px solid ${palette.brand.main}`,
      },
    },
    MuiTableBody: {
      root: {
        '& tr:nth-child(even)': {
          backgroundColor: palette.grey[100],
        },
        borderColor: palette.grey[100],
      },
    },
    MuiTableCell: {
      body: {
        borderBottomColor: palette.grey[100],
      },
    },
    MuiTableFooter: {
      root: {
        '& th,td': {
          fontWeight: 'bold',
          color: text.primary,
        },
        borderTop: `2px solid ${palette.brand.main}`,
        borderBottom: `2px solid ${palette.brand.main}`,
      },
    },
    MuiTabs: {
      indicator: {
        backgroundColor: palette.brand.main,
        height: '4px',
      },
    },
  })
}

export const darkTheme = {
  createPaletteOptions: createCommittedDarkPaletteOptions,
  createOverrides: createCommittedDarkOverrides,
  createFonts: createCommittedFonts,
  createShape: createCommittedShape,
  createSpacing: createCommittedSpacing,
  createTypography: createCommittedTypography,
}

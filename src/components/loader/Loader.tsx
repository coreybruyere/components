import React from 'react'
import { Logo } from '../logo/Logo'
import { makeStyles } from '@material-ui/styles'
import { Theme } from '@material-ui/core/styles'
import clsx from 'clsx'

export interface LoaderProps {
  /**
   *  adjust the size in px of the loader
   */
  size?: number
  /**
   *  Change to the grey version
   */
  grey?: boolean
  /**
   *  Change to the style of the loader
   */
  variant?: 'draw' | 'spin' | 'flip' | 'scale'
}

const selectColor = (theme: Theme) => ({ grey }: LoaderProps): string =>
  grey ? theme.palette.grey[200] : theme.palette.primary.main

export const useStyles = makeStyles<Theme, LoaderProps>(theme => ({
  '@keyframes loader-stroke': {
    '0%': {
      strokeDashoffset: '2300'
    },
    '100%': {
      strokeDashoffset: '0'
    }
  },
  '@keyframes loader-fill': {
    '0%': {
      fill: 'transparent'
    },
    '100%': {
      fill: selectColor(theme)
    }
  },
  '@keyframes loader-spin': {
    to: {
      transform: 'rotate(360deg)'
    }
  },
  '@keyframes loader-flip': {
    '0%': {
      transform: 'perspective(512px) rotateX(0) rotateY(0);'
    },
    '25%': {
      transform: 'perspective(512px) rotateX(180deg) rotateY(0);'
    },
    '50%': {
      transform: 'perspective(512px) rotateX(180deg) rotateY(180deg);'
    },
    '75%': {
      transform: 'perspective(512px) rotateX(0) rotateY(180deg);'
    },
    '100%': {
      transform: 'perspective(512px) rotateX(0) rotateY(360deg);'
    }
  },
  '@keyframes loader-scale': {
    '0%': {
      transform: 'scale(0.5)'
    },
    '100%': {
      transform: 'scale(1)'
    }
  },
  color: {
    '& .commit': {
      transformOrigin: 'center center',
      stroke: selectColor(theme),
      fill: selectColor(theme),
      strokeDasharray: '2300'
    }
  },
  draw: {
    '& .commit': {
      animation:
        '$loader-stroke 3s cubic-bezier(.24,0,.37,1) alternate infinite, $loader-fill 3s cubic-bezier(1, 0, .5, 0) alternate infinite'
    }
  },
  spin: {
    '& .commit': {
      animation: '$loader-spin 1.5s ease infinite'
    }
  },
  flip: {
    '& .commit': {
      transformOrigin: 'center center',
      animation: '$loader-flip 3s cubic-bezier(.09, .57, .49, .9) infinite'
    }
  },
  scale: {
    '& .commit': {
      transformOrigin: 'center center',
      animation:
        '$loader-scale 1.5s cubic-bezier(0.190, 1.000, 0.220, 1.000) infinite alternate both;'
    }
  }
}))

export const Loader = (props: LoaderProps) => {
  const { size = 256, variant = 'draw' } = props
  const classes = useStyles(props)
  return (
    <Logo
      size={size}
      className={clsx(
        classes.color,
        variant === 'draw' && classes.draw,
        variant === 'spin' && classes.spin,
        variant === 'flip' && classes.flip,
        variant === 'scale' && classes.scale
      )}
    />
  )
}

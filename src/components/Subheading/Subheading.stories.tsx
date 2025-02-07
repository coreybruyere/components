import React, { ComponentProps } from 'react'
import { Story, Meta } from '@storybook/react'
import { Subheading } from '.'
import { Column, Heading } from '../'

export default {
  title: 'Components/Subheading',
  component: Heading,
} as Meta

const Template: Story<ComponentProps<typeof Subheading>> = (args) => (
  <Subheading {...args}>This is a subheading</Subheading>
)
export const Default = Template.bind({})

/**
 * The standard heading hX variants are supported, this, by default also adjusts the html tag
 */
export const Variants = () => (
  <Column>
    <Subheading variant="h1">Subheading 1</Subheading>
    <Subheading variant="h2">Subheading 2</Subheading>
    <Subheading variant="h3">Subheading 3</Subheading>
    <Subheading variant="h4">Subheading 4</Subheading>
    <Subheading variant="h5">Subheading 5</Subheading>
    <Subheading variant="h6">Subheading 6</Subheading>
  </Column>
)

/**
 * The display font can be used when a different heading style is required, say for blog posts.
 */
export const InUse = () => (
  <Column>
    <Heading variant="h1">Heading 1</Heading>
    <Subheading variant="h1">This is the subheading for h1</Subheading>
    <Heading variant="h2">Heading 2</Heading>
    <Subheading variant="h2">This is the subheading for h2</Subheading>
    <Heading variant="h3">Heading 3</Heading>
    <Subheading variant="h3">This is the subheading for h3</Subheading>
    <Heading variant="h4">Heading 4</Heading>
    <Subheading variant="h4">This is the subheading for h4</Subheading>
    <Heading variant="h5">Heading 5</Heading>
    <Subheading variant="h5">This is the subheading for h5</Subheading>
    <Heading variant="h6">Heading 6</Heading>
    <Subheading variant="h6">This is the subheading for h6</Subheading>
  </Column>
)

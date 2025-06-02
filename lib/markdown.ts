import { unified } from 'unified'
import remarkParse from 'remark-parse'
import { visit } from 'unist-util-visit'
import type { Root, Heading as MdHeading, Text, InlineCode } from 'mdast'

export type Heading = {
  text: string
  level: number
}

export const extractHeadings = (markdown: string): Heading[] => {
  const tree = unified().use(remarkParse).parse(markdown) as Root
  const headings: Heading[] = []

  visit(tree, 'heading', (node: MdHeading) => {
    const text = node.children
      .filter(
        (c): c is Text | InlineCode =>
          c.type === 'text' || c.type === 'inlineCode'
      )
      .map((c) => c.value)
      .join('')

    headings.push({ text, level: node.depth })
  })

  return headings
}

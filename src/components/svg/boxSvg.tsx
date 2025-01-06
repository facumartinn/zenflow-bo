import { type FC } from 'react'

interface BoxSvgProps {
  width?: number
  height?: number
}

export const BoxSvg: FC<BoxSvgProps> = ({ width = 48, height = 48 }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M40 14L24 24M24 24L8 14M24 24V44M40 34V14L24 4L8 14V34L24 44L40 34Z"
        stroke="#808081"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

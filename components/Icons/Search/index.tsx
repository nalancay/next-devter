import * as React from "react";

interface SearchProps extends React.SVGProps<SVGSVGElement> {}

export const Search: React.FC<SearchProps> = (props) => {
  return (
    <svg height={21} viewBox="0 0 21 21" width={21} {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx={8.5} cy={8.5} r={5} />
        <path d="M17.571 17.5L12 12" />
      </g>
    </svg>
  );
};

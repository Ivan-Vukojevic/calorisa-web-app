import { IconType } from 'react-icons';

interface IconProps {
  /** Icon component from react-icons */
  Component: IconType;
  /** Additional Tailwind classes for styling */
  className?: string;
  /** Optional accessible title/tooltip (if provided, icon is informative) */
  title?: string;
}

/**
 * Icon wrapper component with Tailwind styling and accessibility support
 */
export default function Icon({ Component, className = '', title }: IconProps): JSX.Element {
  // Decorative icons are hidden from screen readers
  if (!title) {
    return (
      <span
        className={`inline-flex items-center justify-center flex-shrink-0 ${className}`}
        aria-hidden="true"
      >
        <Component />
      </span>
    );
  }

  // Icons with titles are informative and accessible
  return (
    <span
      className={`inline-flex items-center justify-center flex-shrink-0 ${className}`}
      role="img"
      title={title}
    >
      <Component />
    </span>
  );
}

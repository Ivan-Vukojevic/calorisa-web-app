import React from 'react';

interface SkipToContentProps {
  targetId?: string;
}

/**
 * Skip to content link for improved keyboard navigation accessibility
 */
const SkipToContent: React.FC<SkipToContentProps> = ({ targetId = 'main-content' }) => {
  return (
    // eslint-disable-next-line react/forbid-dom-props
    <a
      href={`#${targetId}`}
      style={{
        position: 'absolute',
        left: '-9999px',
        zIndex: 999,
        padding: '1rem 1.5rem',
        backgroundColor: '#000',
        color: '#fff',
        textDecoration: 'none',
        borderRadius: '0.25rem',
      }}
      onFocus={(e) => {
        e.currentTarget.style.left = '1rem';
        e.currentTarget.style.top = '1rem';
      }}
      onBlur={(e) => {
        e.currentTarget.style.left = '-9999px';
      }}
    >
      Skip to main content
    </a>
  );
};

export default SkipToContent;

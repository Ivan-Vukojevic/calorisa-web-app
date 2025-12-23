import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SkipToContent from './SkipToContent';

describe('SkipToContent', () => {
  it('should render skip link with default target', () => {
    render(<SkipToContent />);
    
    const link = screen.getByText('Skip to main content');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '#main-content');
  });

  it('should render skip link with custom target', () => {
    render(<SkipToContent targetId="custom-target" />);
    
    const link = screen.getByText('Skip to main content');
    expect(link).toHaveAttribute('href', '#custom-target');
  });

  it('should be visually hidden by default', () => {
    render(<SkipToContent />);
    
    const link = screen.getByText('Skip to main content');
    const styles = window.getComputedStyle(link);
    
    // Link should be positioned off-screen
    expect(link).toHaveStyle({ position: 'absolute' });
  });

  it('should become visible on focus', async () => {
    const user = userEvent.setup();
    render(<SkipToContent />);
    
    const link = screen.getByText('Skip to main content');
    
    // Focus the link
    await user.tab();
    
    expect(link).toHaveFocus();
  });

  it('should have correct accessibility attributes', () => {
    render(<SkipToContent />);
    
    const link = screen.getByText('Skip to main content');
    
    expect(link.tagName).toBe('A');
    expect(link).toHaveAttribute('href');
  });
});

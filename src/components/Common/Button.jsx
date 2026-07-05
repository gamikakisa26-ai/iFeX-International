import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2 } from 'lucide-react';

const VARIANTS = {
  primary:
    'text-white',
  ghost:
    'text-white',
  outline:
    'text-white',
};

/**
 * Button
 * Props:
 *  - as: 'button' | Link component (pass react-router <Link> via `Component`)
 *  - variant: 'primary' | 'ghost' | 'outline'
 *  - icon: show trailing arrow icon (default true)
 *  - loading: shows spinner and disables interaction
 */
const Button = forwardRef(
  (
    {
      children,
      variant = 'primary',
      icon = true,
      loading = false,
      className = '',
      Component = 'button',
      ...props
    },
    ref
  ) => {
    const base =
      'group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50';
    const variantClass =
      variant === 'primary'
        ? 'premium-glass-button bg-gradient-to-r from-cyan-400/90 via-cyan-500/80 to-blue-500/90 text-white shadow-[0_12px_40px_rgba(6,182,212,0.24)] hover:-translate-y-0.5 hover:border-cyan/50 hover:shadow-[0_18px_50px_rgba(6,182,212,0.3)]'
        : `${VARIANTS[variant]} premium-glass-button hover:-translate-y-0.5 hover:border-cyan/50 hover:bg-white/[0.12]`;

    const MotionComponent = motion(Component);

    return (
      <MotionComponent
        ref={ref}
        whileHover={{ y: -2, scale: 1.01, transition: { duration: 0.2 } }}
        whileTap={{ scale: 0.97 }}
        className={`${base} ${variantClass} ${className}`}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        ) : (
          <>
            {children}
            {icon && <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />}
          </>
        )}
      </MotionComponent>
    );
  }
);

Button.displayName = 'Button';
export default Button;

// Unified Theme System for ReferralPro
// Default theme: Blue with White

export const theme = {
  // Primary Colors - Blue Palette
  colors: {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe', 
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6', // Main blue
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
      950: '#172554',
    },
    
    // Secondary Colors - Cool Gray
    secondary: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
      950: '#020617',
    },

    // Accent Colors - Cyan/Teal
    accent: {
      50: '#ecfeff',
      100: '#cffafe',
      200: '#a5f3fc',
      300: '#67e8f9',
      400: '#22d3ee',
      500: '#06b6d4',
      600: '#0891b2',
      700: '#0e7490',
      800: '#155e75',
      900: '#164e63',
      950: '#083344',
    },

    // Status Colors
    success: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
      950: '#052e16',
    },

    warning: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
      950: '#451a03',
    },

    error: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
      950: '#450a0a',
    },

    // Base Colors
    white: '#ffffff',
    black: '#000000',
  },

  // Typography
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      display: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'Monaco', 'Cascadia Code', 'Segoe UI Mono', 'Roboto Mono', 'monospace'],
    },
    fontSize: {
      '2xs': ['0.625rem', { lineHeight: '0.75rem' }],
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.25rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      '5xl': ['3rem', { lineHeight: '3.25rem' }],
      '6xl': ['3.75rem', { lineHeight: '4rem' }],
      '7xl': ['4.5rem', { lineHeight: '4.75rem' }],
      '8xl': ['6rem', { lineHeight: '6.25rem' }],
      '9xl': ['8rem', { lineHeight: '8.25rem' }],
    },
  },

  // Spacing System
  spacing: {
    px: '1px',
    0: '0px',
    0.5: '0.125rem',
    1: '0.25rem',
    1.5: '0.375rem',
    2: '0.5rem',
    2.5: '0.625rem',
    3: '0.75rem',
    3.5: '0.875rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    7: '1.75rem',
    8: '2rem',
    9: '2.25rem',
    10: '2.5rem',
    11: '2.75rem',
    12: '3rem',
    14: '3.5rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    28: '7rem',
    32: '8rem',
    36: '9rem',
    40: '10rem',
    44: '11rem',
    48: '12rem',
    52: '13rem',
    56: '14rem',
    60: '15rem',
    64: '16rem',
    72: '18rem',
    80: '20rem',
    96: '24rem',
    128: '32rem',
    144: '36rem',
  },

  // Border Radius
  borderRadius: {
    none: '0px',
    sm: '0.125rem',
    DEFAULT: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    '4xl': '2rem',
    '5xl': '2.5rem',
    full: '9999px',
  },

  // Shadows
  boxShadow: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
    none: '0 0 #0000',
    
    // Custom shadows for the blue theme
    soft: '0 2px 15px -3px rgba(59, 130, 246, 0.07), 0 10px 20px -2px rgba(59, 130, 246, 0.04)',
    medium: '0 4px 25px -5px rgba(59, 130, 246, 0.1), 0 10px 30px -5px rgba(59, 130, 246, 0.05)',
    large: '0 10px 40px -10px rgba(59, 130, 246, 0.15), 0 20px 50px -10px rgba(59, 130, 246, 0.1)',
    glow: '0 0 20px rgba(59, 130, 246, 0.4)',
    'glow-lg': '0 0 40px rgba(59, 130, 246, 0.3)',
    'inner-soft': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    glass: '0 4px 30px rgba(59, 130, 246, 0.1)',
    elegant: '0 4px 20px -2px rgba(59, 130, 246, 0.08), 0 25px 50px -12px rgba(59, 130, 246, 0.25)',
  },

  // Animations
  animation: {
    // Smooth bottom-up animations
    'fade-in-up': 'fadeInUp 0.6s ease-in-out',
    'fade-in-up-slow': 'fadeInUp 0.8s ease-in-out',
    'slide-up': 'slideUp 0.5s ease-in-out',
    'slide-up-slow': 'slideUp 0.7s ease-in-out',
    
    // Other animations
    'fade-in': 'fadeIn 0.5s ease-in-out',
    'bounce-gentle': 'bounceGentle 2s infinite',
    'pulse-soft': 'pulseSoft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    'float': 'float 6s ease-in-out infinite',
    'scale-in': 'scaleIn 0.3s ease-out',
    'rotate-slow': 'rotateSlow 20s linear infinite',
    'shimmer': 'shimmer 2s linear infinite',
    'glow': 'glow 2s ease-in-out infinite alternate',
  },

  // Keyframes
  keyframes: {
    fadeIn: {
      '0%': { opacity: '0' },
      '100%': { opacity: '1' },
    },
    fadeInUp: {
      '0%': { opacity: '0', transform: 'translateY(30px)' },
      '100%': { opacity: '1', transform: 'translateY(0)' },
    },
    slideUp: {
      '0%': { transform: 'translateY(20px)', opacity: '0' },
      '100%': { transform: 'translateY(0)', opacity: '1' },
    },
    bounceGentle: {
      '0%, 100%': { transform: 'translateY(0)' },
      '50%': { transform: 'translateY(-5px)' },
    },
    pulseSoft: {
      '0%, 100%': { opacity: '1' },
      '50%': { opacity: '0.8' },
    },
    float: {
      '0%, 100%': { transform: 'translateY(0px)' },
      '50%': { transform: 'translateY(-10px)' },
    },
    scaleIn: {
      '0%': { opacity: '0', transform: 'scale(0.9)' },
      '100%': { opacity: '1', transform: 'scale(1)' },
    },
    rotateSlow: {
      '0%': { transform: 'rotate(0deg)' },
      '100%': { transform: 'rotate(360deg)' },
    },
    shimmer: {
      '0%': { transform: 'translateX(-100%)' },
      '100%': { transform: 'translateX(100%)' },
    },
    glow: {
      '0%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)' },
      '100%': { boxShadow: '0 0 30px rgba(59, 130, 246, 0.6)' },
    },
  },

  // Background Gradients
  backgroundImage: {
    'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
    'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
    'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0))',
    'blue-gradient': 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(37, 99, 235, 0.05))',
    'mesh-gradient': `
      radial-gradient(at 40% 20%, hsla(217, 100%, 70%, 0.7) 0px, transparent 50%), 
      radial-gradient(at 80% 0%, hsla(212, 100%, 56%, 0.5) 0px, transparent 50%), 
      radial-gradient(at 40% 50%, hsla(210, 100%, 97%, 0.8) 0px, transparent 50%), 
      radial-gradient(at 0% 50%, hsla(217, 100%, 70%, 0.6) 0px, transparent 50%), 
      radial-gradient(at 80% 50%, hsla(210, 100%, 76%, 0.7) 0px, transparent 50%), 
      radial-gradient(at 40% 100%, hsla(217, 100%, 76%, 0.6) 0px, transparent 50%)
    `,
  },

  // Backdrop Blur
  backdropBlur: {
    none: 'none',
    sm: '4px',
    DEFAULT: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    '2xl': '40px',
    '3xl': '64px',
  },
};

// CSS Variables for dynamic theming
export const cssVariables = `
  :root {
    /* Primary Colors */
    --color-primary-50: ${theme.colors.primary[50]};
    --color-primary-100: ${theme.colors.primary[100]};
    --color-primary-200: ${theme.colors.primary[200]};
    --color-primary-300: ${theme.colors.primary[300]};
    --color-primary-400: ${theme.colors.primary[400]};
    --color-primary-500: ${theme.colors.primary[500]};
    --color-primary-600: ${theme.colors.primary[600]};
    --color-primary-700: ${theme.colors.primary[700]};
    --color-primary-800: ${theme.colors.primary[800]};
    --color-primary-900: ${theme.colors.primary[900]};
    --color-primary-950: ${theme.colors.primary[950]};

    /* Secondary Colors */
    --color-secondary-50: ${theme.colors.secondary[50]};
    --color-secondary-100: ${theme.colors.secondary[100]};
    --color-secondary-200: ${theme.colors.secondary[200]};
    --color-secondary-300: ${theme.colors.secondary[300]};
    --color-secondary-400: ${theme.colors.secondary[400]};
    --color-secondary-500: ${theme.colors.secondary[500]};
    --color-secondary-600: ${theme.colors.secondary[600]};
    --color-secondary-700: ${theme.colors.secondary[700]};
    --color-secondary-800: ${theme.colors.secondary[800]};
    --color-secondary-900: ${theme.colors.secondary[900]};
    --color-secondary-950: ${theme.colors.secondary[950]};

    /* Accent Colors */
    --color-accent-50: ${theme.colors.accent[50]};
    --color-accent-100: ${theme.colors.accent[100]};
    --color-accent-200: ${theme.colors.accent[200]};
    --color-accent-300: ${theme.colors.accent[300]};
    --color-accent-400: ${theme.colors.accent[400]};
    --color-accent-500: ${theme.colors.accent[500]};
    --color-accent-600: ${theme.colors.accent[600]};
    --color-accent-700: ${theme.colors.accent[700]};
    --color-accent-800: ${theme.colors.accent[800]};
    --color-accent-900: ${theme.colors.accent[900]};
    --color-accent-950: ${theme.colors.accent[950]};

    /* Background gradients */
    --bg-gradient-main: linear-gradient(135deg, ${theme.colors.primary[50]} 0%, ${theme.colors.white} 50%, ${theme.colors.accent[50]} 100%);
    --bg-gradient-card: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%);
    --bg-gradient-button: linear-gradient(135deg, ${theme.colors.primary[600]} 0%, ${theme.colors.primary[700]} 100%);
    
    /* Shadows */
    --shadow-soft: ${theme.boxShadow.soft};
    --shadow-medium: ${theme.boxShadow.medium};
    --shadow-large: ${theme.boxShadow.large};
    --shadow-glow: ${theme.boxShadow.glow};
    --shadow-elegant: ${theme.boxShadow.elegant};
  }
`;

export default theme;

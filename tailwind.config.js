module.exports = {
  theme: {
    extend: {
      keyframes: {
        float: {
          '0%, 100%': {
            transform: 'translateY(0)'
          },
          '50%': {
            transform: 'translateY(-15px)'
          }
        },
        tilt: {
          '0%': {
            transform: 'rotate(-2deg)'
          },
          '50%': {
            transform: 'rotate(2deg)'
          },
          '100%': {
            transform: 'rotate(-2deg)'
          }
        }
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        tilt: 'tilt 3s ease-in-out infinite'
      }
    }
  }
}

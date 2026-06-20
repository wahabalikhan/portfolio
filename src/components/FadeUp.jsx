// Reference: homepage case study cards (.case-study-link)
// Duration: 0.6s | Easing: ease-out | Properties: opacity 0→1, translate 0 20px→0 0
// Uses fadeInSlideUp (translate property) instead of fadeInUp (transform property)
// so positioned descendants (tooltips, etc.) are not affected by a containing block

export default function FadeUp({ delay = 0, children, className = '', style = {}, ...rest }) {
  return (
    <div
      className={className}
      {...rest}
      style={{
        ...style,
        animation: 'fadeInSlideUp 0.6s ease-out forwards',
        animationDelay: `${delay}ms`,
        opacity: 0,
      }}
    >
      {children}
    </div>
  );
}

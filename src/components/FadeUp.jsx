// Reference: homepage case study cards (.case-study-link)
// Duration: 0.6s | Easing: ease-out | Properties: opacity 0→1, translateY(20px)→none
// Source: src/index.css line 1267 — animation: fadeInUp 0.6s ease-out forwards

export default function FadeUp({ delay = 0, children, className = '', style = {}, ...rest }) {
  return (
    <div
      className={className}
      {...rest}
      style={{
        ...style,
        animation: 'fadeInUp 0.6s ease-out forwards',
        animationDelay: `${delay}ms`,
        opacity: 0,
      }}
    >
      {children}
    </div>
  );
}

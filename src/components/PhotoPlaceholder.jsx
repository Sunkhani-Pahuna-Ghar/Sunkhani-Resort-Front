const gradients = {
  pine: 'from-pine-dark via-pine to-pine-light',
  clay: 'from-clay-dark via-clay to-marigold-light',
  marigold: 'from-clay to-marigold',
  dusk: 'from-ink via-pine-dark to-clay-dark',
};

// Pass src="/images/whatever.jpg" to show a real photo. Until that file exists in
// /public/images, this quietly falls back to a labeled color placeholder -- so pages
// can be wired up with final image paths ahead of time, and photos "just appear"
// once dropped into /public/images with matching filenames.
export default function PhotoPlaceholder({ label, tone = 'pine', src, className = '' }) {
  return (
    <div className={`relative overflow-hidden rounded-sm bg-gradient-to-br ${gradients[tone]} ${className}`}>
      {src && (
        <img
          src={src}
          alt={label}
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
      )}
      <div className="absolute inset-0 opacity-20 mix-blend-overlay" style={{
        backgroundImage: 'radial-gradient(circle at 30% 20%, white, transparent 60%)'
      }} />
      <span className="absolute bottom-3 left-3 text-stone/90 text-xs font-medium tracking-wide drop-shadow">
        {label}
      </span>
    </div>
  );
}

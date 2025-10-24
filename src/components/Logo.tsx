import wasselLogo from 'figma:asset/1ccf434105a811706fd618a3b652ae052ecf47e1.png';

interface LogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

// BlaBlaCar-inspired sizing: optimized for navigation and headers
const sizeMap = {
  xs: 'h-7',   // 28px - Compact mobile headers
  sm: 'h-8',   // 32px - Standard mobile/desktop navigation (BlaBlaCar standard)
  md: 'h-10',  // 40px - Sidebar and prominent headers
  lg: 'h-12',  // 48px - Featured sections
  xl: 'h-16'   // 64px - Auth pages and hero sections
};

export function Logo({ size = 'sm', showText = true, className = '' }: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <img 
        src={wasselLogo} 
        alt="Wassel" 
        className={`${sizeMap[size]} w-auto`}
      />
      {showText && (
        <div>
          <h3 className="text-primary leading-tight">Wassel</h3>
          <p className="text-sm text-muted-foreground leading-tight">واصل</p>
        </div>
      )}
    </div>
  );
}

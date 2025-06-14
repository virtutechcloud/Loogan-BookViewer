interface StudentFooterProps {
  className?: string;
}

export default function StudentFooter({ className }: StudentFooterProps) {
  return (
    <footer
      className={`border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ${
        className || ""
      }`}
    >
      <div className="flex h-12 items-center justify-between px-4">
        <div className="text-xs text-muted-foreground">
          © 2024 Educational Book Viewer. All rights reserved.
        </div>
        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
          <span>Help</span>
          <span>Privacy</span>
          <span>Terms</span>
        </div>
      </div>
    </footer>
  );
}

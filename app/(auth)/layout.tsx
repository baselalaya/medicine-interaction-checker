export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto">
        {children}
      </div>
    </div>
  );
}

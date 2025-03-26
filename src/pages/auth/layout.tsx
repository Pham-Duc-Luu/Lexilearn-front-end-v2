import '../../i18n/config';
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className=" h-screen bg-color-4">{children}</div>;
}

import MainNav from "@/components/navigation/MainNav"
import Footer from "@/components/sections/Footer"

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <MainNav />
      <main>{children}</main>
      <Footer />
    </>
  )
}

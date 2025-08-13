import PrivateHeader from "@/components/layouts/privateheader";

const PrivateLayout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>
) => {
  return (
    <>
     <PrivateHeader/>
     {children}
    </>
  )
}

export default PrivateLayout
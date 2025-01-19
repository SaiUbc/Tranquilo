import type { SVGAttributes } from "react";
import Logo from "@/public/logo.png";
import Image from "next/image";

export type TranquiloLogoProps = SVGAttributes<SVGSVGElement>;

export default function HumeLogo(props: TranquiloLogoProps) {
  return (
    <Image src={Logo} alt="Hume" width={50} height={50} />
  );
}

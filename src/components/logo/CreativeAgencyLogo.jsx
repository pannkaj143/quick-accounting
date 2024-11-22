import Link from "next/link";
import React from "react";
import LogoWhite2 from "../../../public/assets/imgs/logo/site-logo-white-2.png";
import LogoBlack from "../../../public/assets/imgs/logo/logo-black.png";
import Image from "next/image";

const CreativeAgencyLogo = () => {
  return (
    <>
      <div className="header__logo-2">
        <Link href={"/"} className="logo-dark">
          <Image
            priority
            width={140}
            height={60}
            src={LogoBlack}
            alt="Site Logo"
          />
        </Link>
        <Link href={"/"} className="logo-light">
          <Image
            priority
            width={140}
            height={60}
            src={LogoWhite2}
            alt="Site Logo"
          />
        </Link>
      </div>
    </>
  );
};

export default CreativeAgencyLogo;

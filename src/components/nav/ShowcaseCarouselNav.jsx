import Link from "next/link";
import React from "react";

const ShowcaseCarouselNav = ({ nav }) => {
  return (
    <>
      <div className="header__nav-2">
        <ul className="main-menu-4 menu-anim">
          {nav.map((el, i) => {
            if (el.type === "megamenu") {
              return (
                <li className="has-megamenu" key={i}>
                  <Link href={el.link}>{el.nav_name}</Link>
                  <ul className={el.full_width ? "mega-menu" : "mega-menu-2"}>
                    {el.sub_nav.map((subEl, index) => {
                      return (
                        <li key={index}>
                          <div className="menu-heading">{subEl.title}</div>
                          <ul>
                            {subEl.data.map((elData, elIndex) => {
                              return (
                                <li key={elIndex}>
                                  <Link href={elData.link}>{elData.name}</Link>
                                </li>
                              );
                            })}
                          </ul>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            } else if (el.type === "dropdown") {
              return (
                <li key={i}>
                  <Link href={el.link}>{el.nav_name}</Link>
                  <ul className="main-dropdown">
                    {el.sub_nav.map((subEl, index) => {
                      return (
                        <li key={index}>
                          <Link href={subEl.link}>{subEl.name}</Link>
                          {subEl.sub_dropdown_nav &&
                            subEl.sub_dropdown_nav.length && (
                              <ul className="sub-dropdown">
                                {subEl.sub_dropdown_nav.map(
                                  (subDrop, subIndex) => {
                                    return (
                                      <li key={subIndex}>
                                        <Link href={subDrop.link}>
                                          {subDrop.name}
                                        </Link>
                                      </li>
                                    );
                                  }
                                )}
                              </ul>
                            )}
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            } else {
              return (
                <li key={i}>
                  <Link href={el.link}>{el.nav_name}</Link>
                </li>
              );
            }
          })}
        </ul>
      </div>
    </>
  );
};

export default ShowcaseCarouselNav;

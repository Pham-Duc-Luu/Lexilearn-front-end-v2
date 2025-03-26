"use client";
import React from "react";
import {Navbar, NavbarProps,} from "@heroui/react";
import {useRouter} from "@/i18n/routing";
import {useTranslations} from "next-intl";

const FooterProto = (navbarProps: NavbarProps) => {
    const router = useRouter();
    const t = useTranslations("dashboard.my collection");
    const Tutils = useTranslations("utils");

    return (
        <Navbar
            isBordered
            {...navbarProps}
            classNames={{
                item: [
                    "flex",
                    "relative",
                    "h-full",
                    "items-center",
                    "data-[active=true]:after:content-['']",
                    "data-[active=true]:after:absolute",
                    "data-[active=true]:after:bottom-0",
                    "data-[active=true]:after:left-0",
                    "data-[active=true]:after:right-0",
                    "data-[active=true]:after:h-[2px]",
                    "data-[active=true]:after:rounded-[2px]",
                    "data-[active=true]:after:bg-primary",
                ],
            }}
        ></Navbar>
    );
};

export default FooterProto;

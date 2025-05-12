import Logo from "@/assets/icon.svg"
import SparklesText from "@/components/magicui/sparkles-text.tsx";
import React, {useEffect} from "react";
import {Image} from "@heroui/react";
import {useRefreshTokenQuery} from "@/api";
import {useNavigate} from "react-router";
import {routeProto} from "@/redux/store/route.slice.ts";

export function StartPage() {


    const refresh_token = useRefreshTokenQuery(null)
    const navigate = useNavigate();
    useEffect(() => {
        if (refresh_token.isSuccess) navigate(routeProto.HOME())
    }, [refresh_token, navigate]);
    return <div className={" min-h-screen flex justify-center items-center"}>
        <div className={'h-10  flex justify-center items-center'}>
            <Image className={" border-0 h-40"} src={Logo}></Image>
            <SparklesText
                text="LexiLearn"
                sparklesCount={4}
                className=" text-8xl"></SparklesText>
        </div>

    </div>
}
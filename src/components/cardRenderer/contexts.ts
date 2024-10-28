import { createContext, useContext } from "react";
import { ProxyOptions, proxyOptionsDefaults } from "../proxyEditor/ProxyOptionsEditor";
import { CardFace } from "scryfall-sdk";

export const ProxyOptionsContext = createContext<ProxyOptions>(proxyOptionsDefaults);

export const useProxyOptions = () => {
    const proxyOptions = useContext(ProxyOptionsContext);

    if (!proxyOptions) {
        throw new Error("No ProxyOptionsContext.Provider found.")
    }

    return proxyOptions;
}

export const CardFaceContext = createContext<CardFace | undefined>(undefined);

export const useCardFace = () => {
    const cardFace = useContext(CardFaceContext);

    if (!cardFace) {
        throw new Error("No CardFaceContext.Provider found.")
    }

    return cardFace;
}
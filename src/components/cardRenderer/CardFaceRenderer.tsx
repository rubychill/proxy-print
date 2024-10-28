import { CardFace } from "scryfall-sdk";
import { PropsWithClass } from "../../util";
import styles from './CardFaceRenderer.module.scss';
import { ProxyOptions } from "../proxyEditor/ProxyOptionsEditor";
import { forwardRef } from "react";
import { StandardHeader } from "./components/StandardHeader";
import { StandardArt } from "./components/StandardArt";
import { StandardTypeLine } from "./components/StandardTypeLine";
import { StandardRules } from "./components/StandardRules";
import { StandardFooter } from "./components/StandardFooter";
import { CardFaceContext, ProxyOptionsContext } from "./contexts";

type CardFaceRenderProps = PropsWithClass<{
    cardFace: CardFace;
    options: ProxyOptions;
}>

export const CardFaceRenderer = forwardRef((props: CardFaceRenderProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    return <ProxyOptionsContext.Provider value={props.options}>
        <CardFaceContext.Provider value={props.cardFace}>
            <div className={styles.container} >
                <div 
                    className={styles.body}
                    style={{
                        width: `${props.options.printWidth}mm`,
                        height: `${props.options.printHeight}mm`,
                    }}
                    ref={ref}
                >
                    <StandardHeader />
                    <StandardArt />
                    <StandardTypeLine />
                    <StandardRules />
                    <StandardFooter />
                </div>
            </div>
        </CardFaceContext.Provider>
    </ProxyOptionsContext.Provider>
});
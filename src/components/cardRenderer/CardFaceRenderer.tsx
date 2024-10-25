import { CardFace } from "scryfall-sdk";
import { PropsWithClass } from "../../util";
import styles from './CardFaceRenderer.module.scss';
import { ProxyOptions } from "../proxyEditor/ProxyOptionsEditor";
import { ArtProcessor } from "../artProcessor/ArtProcessor";
import { MagicText } from "../magicText/MagicText";
import { forwardRef } from "react";

type CardFaceRenderProps = PropsWithClass<{
    cardFace: CardFace;
    options: ProxyOptions;
}>

export const CardFaceRenderer = forwardRef((props: CardFaceRenderProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    return <div className={styles.container} >
        <div 
            className={styles.body}
            style={{
                width: `${props.options.printWidth}mm`,
                height: `${props.options.printHeight}mm`,
            }}
            ref={ref}
        >
            <div 
                className={styles.header}
                style={{
                    fontSize: `${props.options.headerSize}pt`
                }}
            >
                <p>{props.cardFace.name}</p>
                {props.cardFace.mana_cost && <MagicText text={props.cardFace.mana_cost} iconSize={props.options.headerSize} />}
            </div>
            {props.options.showImage && <ArtProcessor 
                className={styles.art}
                src={props.options.artSrc} 
                {...props.options}
            />}
            <p
                className={styles.typeLine}
                style={{
                    fontSize: `${props.options.typeLineSize}pt`
                }}
            >{props.cardFace.type_line}</p>
            <div
                className={styles.rules}
                style={{
                    fontSize: `${props.options.rulesSize}pt`
                }}
            >{props.cardFace.oracle_text?.split("\n").map((line) => (<MagicText iconSize={props.options.rulesSize} hideReminderText={!props.options.showReminderText} key={line} text={line} />))}</div>
            {props.cardFace.power && props.cardFace.toughness && <p className={styles.footer}>{props.cardFace.power}/{props.cardFace.toughness}</p>}
            {props.cardFace.loyalty && <p className={styles.footer}>{props.cardFace.loyalty}</p>}
            {props.cardFace.defense && <p className={styles.footer}>{props.cardFace.defense}</p>}
        </div>
    </div>
});
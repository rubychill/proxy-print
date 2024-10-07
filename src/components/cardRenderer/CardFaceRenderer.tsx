import { CardFace } from "scryfall-sdk";
import { PropsWithClass } from "../../util";
import styles from './CardFaceRenderer.module.scss';
import { ProxyOptions } from "../proxyEditor/ProxyOptionsEditor";
import { ArtProcessor } from "../artProcessor/ArtProcessor";

type CardFaceRenderProps = PropsWithClass<{
    cardFace: CardFace;
    options: ProxyOptions;
}>

export const CardFaceRenderer = (props: CardFaceRenderProps) => {
    return <div className={styles.container} >
        <div 
            className={styles.body}
            style={{
                width: `${props.options.printWidth}mm`,
                height: `${props.options.printHeight}mm`,
            }}
        >
            <div 
                className={styles.header}
                style={{
                    fontSize: `${props.options.headerSize}pt`
                }}
            >
                <p>{props.cardFace.name}</p>
                <p>{props.cardFace.mana_cost || ""}</p>
            </div>
            {props.options.showImage && <ArtProcessor 
                src={props.cardFace.image_uris?.art_crop} 
                {...props.options}
            />}
            <p
                style={{
                    fontSize: `${props.options.typeLineSize}pt`
                }}
            >{props.cardFace.type_line}</p>
            <div
                className={styles.rules}
                style={{
                    fontSize: `${props.options.rulesSize}pt`
                }}
            >{props.cardFace.oracle_text?.split("\n").map((line) => (<p key={line}>{line}</p>))}</div>
            {props.cardFace.power && props.cardFace.toughness && <p className={styles.footer}>{props.cardFace.power}/{props.cardFace.toughness}</p>}
            {props.cardFace.loyalty && <p className={styles.footer}>{props.cardFace.loyalty}</p>}
            {props.cardFace.defense && <p className={styles.footer}>{props.cardFace.defense}</p>}
        </div>
    </div>
}
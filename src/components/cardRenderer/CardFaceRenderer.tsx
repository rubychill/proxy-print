import { CardFace } from "scryfall-sdk";
import { PropsWithClass } from "../../util";
import styles from './CardFaceRenderer.module.scss';
import { ProxyOptions } from "../proxyEditor/ProxyOptionsEditor";

type CardFaceRenderProps = PropsWithClass<{
    cardFace: CardFace;
    options: ProxyOptions;
}>

export const CardFaceRenderer = (props: CardFaceRenderProps) => {
    return <div 
        className={styles.body}
        style={{
            aspectRatio: props.options.printWidth / props.options.printHeight,
            width: `${props.options.printWidth}mm`,
        }}
    >
        <div className={"flex justify-between"}>
            <p>{props.cardFace.name}</p>
            <p>{props.cardFace.mana_cost || ""}</p>
        </div>
        <img src={props.cardFace.image_uris?.art_crop} />
        <p>{props.cardFace.type_line}</p>
        <p className="grow leading-tight">{props.cardFace.oracle_text || ""}</p>
        {props.cardFace.power && props.cardFace.toughness && <p className={styles.footer}>{props.cardFace.power}/{props.cardFace.toughness}</p>}
        {props.cardFace.loyalty && <p className={styles.footer}>{props.cardFace.loyalty}</p>}
        {props.cardFace.defense && <p className={styles.footer}>{props.cardFace.defense}</p>}
    </div>
}
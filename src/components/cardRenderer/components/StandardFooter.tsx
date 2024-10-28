import { PropsWithClass } from "../../../util"
import { useCardFace } from "../contexts";
import styles from "./CardRendererComponents.module.scss";

type StandardFooterProps = PropsWithClass<object>

export const StandardFooter = (props: StandardFooterProps) => {
    const card = useCardFace();

    return <>
        {card.power && card.toughness && <p className={styles.footer}>{card.power}/{card.toughness}</p>}
        {card.loyalty && <p className={styles.footer}>{card.loyalty}</p>}
        {card.defense && <p className={styles.footer}>{card.defense}</p>}
    </>
}
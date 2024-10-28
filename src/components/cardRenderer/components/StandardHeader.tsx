import { useContext } from "react";
import { PropsWithClass } from "../../../util"
import { useCardFace, useProxyOptions } from "../contexts";
import styles from "./CardRendererComponents.module.scss";
import { MagicText } from "../../magicText/MagicText";

type StandardHeaderProps = PropsWithClass<object>

export const StandardHeader = (props: StandardHeaderProps) => {
    const options = useProxyOptions();
    const card = useCardFace();

    return <div 
        className={styles.header}
        style={{
            fontSize: `${options.headerSize}pt`
        }}
    >
        <p>{card.name}</p>
        {card.mana_cost && <MagicText text={card.mana_cost} iconSize={options.headerSize} />}
    </div>;
}
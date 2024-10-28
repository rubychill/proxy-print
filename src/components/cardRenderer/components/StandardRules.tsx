import { useContext } from "react";
import { PropsWithClass } from "../../../util"
import styles from "./CardRendererComponents.module.scss";
import { MagicText } from "../../magicText/MagicText";
import { useCardFace, useProxyOptions } from "../contexts";

type StandardRulesProps = PropsWithClass<object>

export const StandardRules = (props: StandardRulesProps) => {
    const options = useProxyOptions();
    const card = useCardFace();

    return <div
        className={styles.rules}
        style={{
            fontSize: `${options.rulesSize}pt`
        }}
    >
        {card.oracle_text?.split("\n").map((line) => (<MagicText iconSize={options.rulesSize} hideReminderText={!options.showReminderText} key={line} text={line} />))}
    </div>;
}
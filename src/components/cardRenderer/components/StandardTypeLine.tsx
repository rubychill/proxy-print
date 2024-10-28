import { useContext } from "react";
import { PropsWithClass } from "../../../util"
import { useCardFace, useProxyOptions } from "../contexts";
import styles from "./CardRendererComponents.module.scss";

type StandardTypeLineProps = PropsWithClass<object>

export const StandardTypeLine = (props: StandardTypeLineProps) => {
    const options = useProxyOptions();
    const card = useCardFace();

    return <p
        className={styles.typeLine}
        style={{
            fontSize: `${options.typeLineSize}pt`
        }}
    >{card.type_line}</p>;
}
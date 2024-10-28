import { useContext } from "react";
import { PropsWithClass } from "../../../util"
import { useCardFace, useProxyOptions } from "../contexts";
import styles from "./CardRendererComponents.module.scss";
import { ArtProcessor } from "../../artProcessor/ArtProcessor";

type StandardArtProps = PropsWithClass<object>

export const StandardArt = (props: StandardArtProps) => {
    const options = useProxyOptions();

    return options.showImage && <ArtProcessor 
        className={styles.art}
        src={options.artSrc} 
        edgeBlur={options.edgeBlur}
        edgeThreshold={options.edgeThreshold}
        processingType={options.processingType}
    />;
}
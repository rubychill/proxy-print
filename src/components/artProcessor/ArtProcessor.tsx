import { useEffect, useMemo, useState } from "react";
import { PropsWithClass } from "../../util";
import Image from "image-js"
import { ProcessingType } from "../proxyEditor/ProxyOptionsEditor";

type ArtProcessorProps = PropsWithClass<{
    src: string | undefined;
    processingType: ProcessingType;
    edgeThreshold: number[];
    edgeBlur: number;
}>;

export const ArtProcessor = (props: ArtProcessorProps) => {
    const [loadedImage, setLoadedImage] = useState<Image | null>(null);
    useEffect(() => {
        if (props.src) {
            Image.load(props.src).then((value) => setLoadedImage(value));
        }
    }, [props.src]);

    const processedImage: Image | undefined = useMemo(() => {
        if (loadedImage) {
            switch(props.processingType) {
                case "none":
                    return loadedImage;
                case "greyscale":
                    return loadedImage.grey();
                case "edge":
                    // @ts-expect-error cannyEdge() seems to be missing from typedef
                    return  loadedImage.grey().cannyEdge({
                        lowThreshold: props.edgeThreshold[0], 
                        highThreshold: props.edgeThreshold[1], 
                        gaussianBlur: props.edgeBlur
                    }).dilate().invert();
                default:
                    return loadedImage;
            }
        }
    }, [loadedImage, props.processingType, props.edgeBlur, props.edgeThreshold]);

    return <img
        className={props.className}
        src={processedImage?.toDataURL()}
    />
};
import { Card } from "scryfall-sdk";
import { PropsWithClass } from "../../util";
import { useState } from "react";
import { CardFaceRenderer } from "../cardRenderer/CardFaceRenderer";
import { ProxyOptions, ProxyOptionsEditor } from "./ProxyOptionsEditor";

type ProxyEditorProps = PropsWithClass<{
    cardData: Card;
}>

const proxyOptionsDefaults: ProxyOptions = {
    printWidth: 48,
    printHeight: 86,
    headerSize: 12, //12pt
    showImage: true,
    typeLineSize: 12,
    rulesSize: 12,
};

export const ProxyEditor = (props: ProxyEditorProps) => {
    const [proxyOptions, setProxyOptions] = useState<ProxyOptions[]>([proxyOptionsDefaults, proxyOptionsDefaults]);

    return <div>
        {props.cardData.card_faces.map((face, index) => (
            <div key={face.name}>
                <CardFaceRenderer 
                    cardFace={face} 
                    options={proxyOptions[index]}
                    key={face.name} 
                />
                <ProxyOptionsEditor
                    options={proxyOptions[index]}
                    onOptionsChange={(options) => setProxyOptions((existing) => {
                        const newOptions = [...existing];
                        newOptions[index] = options;
                        return newOptions;
                    })}
                />
            </div>
        ))}
    </div>;
}
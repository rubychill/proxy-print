import { Card } from "scryfall-sdk";
import { PropsWithClass } from "../../util";
import { useState } from "react";
import { CardFaceRenderer } from "../cardRenderer/CardFaceRenderer";
import { ProxyOptions, ProxyOptionsEditor } from "./ProxyOptionsEditor";
import { Box, Container, Flex } from "@radix-ui/themes";

type ProxyEditorProps = PropsWithClass<{
    cardData: Card;
}>

const proxyOptionsDefaults: ProxyOptions = {
    printWidth: 48,
    printHeight: 86,
    headerSize: 12, //12pt
    showImage: true,
    processingType: "greyscale",
    edgeThreshold: [10, 40],
    edgeBlur: 5,
    typeLineSize: 12,
    rulesSize: 12,
};

export const ProxyEditor = (props: ProxyEditorProps) => {
    const [proxyOptions, setProxyOptions] = useState<ProxyOptions[]>([proxyOptionsDefaults, proxyOptionsDefaults]);

    return <Flex direction={"column"} align={"stretch"} gap={"4"}>
        {props.cardData.card_faces.map((face, index) => (
            <Container size={"1"} key={face.name}>
                <Flex gap={"3"}>
                    <CardFaceRenderer 
                        cardFace={face} 
                        options={proxyOptions[index]}
                        key={face.name} 
                    />
                    <Box flexGrow={"1"}>
                        <ProxyOptionsEditor
                            options={proxyOptions[index]}
                            onOptionsChange={(options) => setProxyOptions((existing) => {
                                const newOptions = [...existing];
                                newOptions[index] = options;
                                return newOptions;
                            })}
                        />
                    </Box>
                </Flex>
            </Container>
        ))}
    </Flex>;
}
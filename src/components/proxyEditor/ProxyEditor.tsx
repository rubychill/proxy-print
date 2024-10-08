import { Card, CardFace } from "scryfall-sdk";
import { PropsWithClass } from "../../util";
import { useCallback, useRef, useState } from "react";
import { CardFaceRenderer } from "../cardRenderer/CardFaceRenderer";
import { ProxyOptions, ProxyOptionsEditor } from "./ProxyOptionsEditor";
import { Box, Button, Container, Flex } from "@radix-ui/themes";
import { DownloadIcon } from "@radix-ui/react-icons";
import fileSaver from "file-saver";
import domToImage from "dom-to-image";

const proxyOptionsDefaults: ProxyOptions = {
    printWidth: 48,
    printHeight: 86,
    headerSize: 10, //12pt
    showImage: true,
    processingType: "greyscale",
    edgeThreshold: [10, 40],
    edgeBlur: 5,
    typeLineSize: 10,
    rulesSize: 10,
    showReminderText: true,
};

type ProxyEditorProps = PropsWithClass<{
    cardData: Card;
}>

export const ProxyEditor = (props: ProxyEditorProps) => {
    return <Flex direction={"column"} align={"stretch"} gap={"4"}>
        {props.cardData.card_faces.map((face) => <SingleFaceEditor
            key={face.name}
            face={face}
        />)}
    </Flex>;
}

type SingleFaceEditorProps = PropsWithClass<{
    face: CardFace;
}>

const SingleFaceEditor = (props: SingleFaceEditorProps) => {
    const [options, setOptions] = useState<ProxyOptions>(proxyOptionsDefaults);
    const printRef = useRef<HTMLDivElement>(null);

    const downloadPrint = useCallback(async () => {
        if (printRef.current) {
            const blob = await domToImage.toBlob(printRef.current);
            const filename = props.face.name.replace(/\'/, "");
            fileSaver.saveAs(blob, `${filename}.png`);
        }
    }, []);

    return <Flex direction={"column"} gap={"2"}>
        <Container size={"1"}>
            <Flex gap={"3"}>
                <CardFaceRenderer 
                    cardFace={props.face} 
                    options={options}
                    key={props.face.name} 
                    ref={printRef}
                />
                <Box flexGrow={"1"}>
                    <ProxyOptionsEditor
                        options={options}
                        onOptionsChange={(newOptions) => setOptions(newOptions)}
                    />
                </Box>
            </Flex>
        </Container>
        <Box>
            <Button onClick={downloadPrint}>
                <DownloadIcon />
                Save Card
            </Button>
        </Box>
    </Flex>
}
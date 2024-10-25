import { Card, Card as CardData, CardFace } from "scryfall-sdk";
import { PropsWithClass } from "../../util";
import { createContext, useCallback, useEffect, useRef, useState } from "react";
import { CardFaceRenderer } from "../cardRenderer/CardFaceRenderer";
import { ProxyOptions, ProxyOptionsEditor } from "./ProxyOptionsEditor";
import { Box, Button, Container, Flex } from "@radix-ui/themes";
import { DownloadIcon } from "@radix-ui/react-icons";
import fileSaver from "file-saver";
import domToImage from "dom-to-image";

const proxyOptionsDefaults: ProxyOptions = {
    printWidth: "48",
    printHeight: "80",
    headerSize: 10, //12pt
    showImage: true,
    processingType: "greyscale",
    edgeThreshold: [10, 40],
    edgeBlur: 5,
    typeLineSize: 10,
    rulesSize: 10,
    showReminderText: true,
    artSrc: ""
};

type ProxyEditorProps = PropsWithClass<{
    cardData: CardData;
}>

export const ProxyEditor = (props: ProxyEditorProps) => {
    return<Flex direction={"column"} align={"stretch"} gap={"4"}>
        <CardContext.Provider value={props.cardData}>
            {props.cardData.card_faces.map((face) => <SingleFaceEditor
                key={face.name}
                face={face}
            />)}
        </CardContext.Provider>
    </Flex>;
}

type SingleFaceEditorProps = PropsWithClass<{
    face: CardFace;
}>

const SingleFaceEditor = (props: SingleFaceEditorProps) => {
    const [options, setOptions] = useState<ProxyOptions>({...proxyOptionsDefaults, artSrc: props.face.getImageURI("art_crop") || ""});
    const printRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setOptions((existing) => ({...existing, artSrc: props.face.getImageURI("art_crop") || ""}))
    }, [props.face])

    const downloadPrint = useCallback(async () => {
        if (printRef.current) {
            const blob = await domToImage.toBlob(printRef.current);
            const filename = props.face.name.replace(/'/, "");
            fileSaver.saveAs(blob, `${filename}.png`);
        }
    }, [props.face.name]);

    return <Flex direction={"column"} gap={"2"} p={"2px 8px"}>
        <Container size={"1"}>
            <Flex gap={"3"} align={"center"}>
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

export const CardContext = createContext<Card | null>(null);
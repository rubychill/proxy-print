import { Box, Button, Dialog, Grid } from "@radix-ui/themes";
import { PropsWithClass } from "../../util"
import { useContext, useEffect, useState } from "react";
import { CardContext } from "./ProxyEditor";
import { Cards } from "scryfall-sdk";

type CardArtPickerProps = PropsWithClass<{
    onArtSelected: (artSrc: string) => void;
}>;

export const CardArtPicker = (props: CardArtPickerProps) => {
    const card = useContext(CardContext);
    const [cardArts, setCardArts] = useState<string[]>([]);

    useEffect(() => {
        const asyncEffect = async () => {
            if (card) {
                const emitter = await Cards.search(`oracleid:${card.oracle_id}`, {unique: "art"});
                const cards = await emitter.cancelAfterPage().waitForAll();
                setCardArts(cards.map((card) => card.card_faces[0].getImageURI("art_crop") || ""))
            }
        }

        asyncEffect();
    }, [card]);

    return <Dialog.Root>
        <Dialog.Trigger>
            <Button>Select Art</Button>
        </Dialog.Trigger>

        <Dialog.Content>
            <Dialog.Title>Select Art</Dialog.Title>
            <Dialog.Description>Click the desired card art</Dialog.Description>
            <Grid columns={"3"} gap={"3"}>
                {cardArts.map((artSrc) => <Dialog.Close key={artSrc}>
                    <Button asChild variant={"outline"} onClick={() => props.onArtSelected(artSrc)}>
                        <Box asChild p={"2"}>
                            <img src={artSrc} style={{objectFit: "contain", width: "100%", height: "100%"}} crossOrigin="" />
                        </Box>
                    </Button>
                </Dialog.Close>)}
            </Grid>
        </Dialog.Content>
    </Dialog.Root>
}
import { PropsWithClass } from "../../util";
import { Suspense, useState } from "react";
import { Card as CardData, Cards } from "scryfall-sdk";
import { Box, TextField } from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { ScryfallSearchResults } from "./ScryfallSearchResults";

type ScryfallSearchProps = PropsWithClass<{
    selectedCard: CardData | null,
    setSelectedCard: (card: CardData) => void,
}>;

export const ScryfallSearch = (props: ScryfallSearchProps) => {
    const [searchValue, setSearchValue] = useState("");
    
    return <Box position={"relative"}>
        <TextField.Root 
            placeholder="Search card name..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
        >
            <TextField.Slot>
                <MagnifyingGlassIcon width={16} height={16} />
            </TextField.Slot>
        </TextField.Root>
        <ScryfallSearchResults 
            searchValue={searchValue}
            onCardSelected={(card) => {
                props.setSelectedCard(card);
                setSearchValue("");
            }}
        />
    </Box>
}
import classNames from "classnames";
import { PropsWithClass } from "../../util";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Card as CardData, Cards } from "scryfall-sdk";
import { Box, Card, Flex, Text, TextField } from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

type ScryfallSearchProps = PropsWithClass<{
    selectedCard: CardData | null,
    setSelectedCard: (card: CardData) => void,
}>;

export const ScryfallSearch = (props: ScryfallSearchProps) => {
    const [searchValue, setSearchValue] = useState("");
    const [cardResults, setCardResults] = useState<CardData[] | null>(null);
    const query = useRef<string>();

    const fetchCards = useCallback(async (search: string) => {
        const emitter = await Cards.search(search);
        const cards = await emitter.cancelAfterPage().waitForAll();
        return cards;
    }, []);

    useEffect(() => {
        const handler = setTimeout(async () => {
            query.current = searchValue;

            if (searchValue.length > 1) {
                const cards = await fetchCards(searchValue);
                if (searchValue == query.current) {
                    setCardResults(cards);
                }
            } else {
                setCardResults(null);
            }
    
        }, 200);

        return () => {
            clearTimeout(handler);
        }
    }, [searchValue, fetchCards]);

    return <Box>
        <TextField.Root 
            placeholder="Search card name..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
        >
            <TextField.Slot>
                <MagnifyingGlassIcon width={16} height={16} />
            </TextField.Slot>
        </TextField.Root>
        {cardResults && <Flex gap="3" direction={"column"}>
            {cardResults.length > 0 ? cardResults.map((card) => (
                <Box minWidth={"300px"} key={card.name}>
                    <Card asChild>
                        <a href="" onClick={(e) => {
                            e.preventDefault();
                            props.setSelectedCard(card);
                            setSearchValue("");
                            setCardResults(null);
                        }}>
                            <Text as="div" weight="bold">{card.name}</Text>
                            <Text as="div" color="gray">{card.type_line}</Text>
                        </a>
                    </Card>
                </Box>
            )) : <Text align="center">No results</Text>}
        </Flex>}
    </Box>
}
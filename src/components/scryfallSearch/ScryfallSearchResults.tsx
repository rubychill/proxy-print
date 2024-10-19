import { Card as CardData, Cards } from "scryfall-sdk";
import { PropsWithClass } from "../../util";
import { useCallback, useEffect, useRef, useState } from "react";
import { Box, Card, Flex, Skeleton, Text } from "@radix-ui/themes";

type ScryfallSearchResultsProps = PropsWithClass<{
    searchValue: string;
    onCardSelected: (card: CardData) => void;
}>;

export const ScryfallSearchResults = (props: ScryfallSearchResultsProps) => {
    const [cardResults, setCardResults] = useState<CardData[] | null>(null);
    const query = useRef<string>();

    const fetchCards = useCallback(async (search: string) => {
        const emitter = await Cards.search(search);
        const cards = await emitter.cancelAfterPage().waitForAll();
        return cards;
    }, []);

    useEffect(() => {
        setCardResults(null);
        const handler = setTimeout(async () => {
            query.current = props.searchValue;

            if (props.searchValue.length > 1) {
                const cards = await fetchCards(props.searchValue);
                if (props.searchValue == query.current) {
                    setCardResults(cards);
                }
            }
        }, 200);

        return () => {
            clearTimeout(handler);
        }
    }, [props.searchValue, fetchCards]);

    return props.searchValue.length > 1 && <Card mt={"8px"} style={{position: "absolute", zIndex: 1, width: "100%"}}>
        <Skeleton loading={!cardResults} minHeight={"72px"}>
            <Flex gap="3" direction={"column"}>
                {cardResults && cardResults.length > 0 ? cardResults.map((card) => (
                    <Box minWidth={"300px"} key={card.name}>
                        <Card asChild >
                            <a href="" onClick={(e) => {
                                e.preventDefault();
                                props.onCardSelected(card);
                                setCardResults(null);
                            }}>
                                <Text as="div" weight="bold">{card.name}</Text>
                                <Text as="div" color="gray">{card.type_line}</Text>
                            </a>
                        </Card>
                    </Box>
                )) : <Text align="center">No results</Text>}
            </Flex>
        </Skeleton>
    </Card>
}
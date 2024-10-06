import classNames from "classnames";
import { PropsWithClass } from "../../util";
import { useCallback, useEffect, useMemo, useState } from "react";
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
    const [query, setQuery] = useState("");

    const fetchCards = useCallback(async (search: string) => {
        const emitter = await Cards.search(search);
        const cards = await emitter.cancelAfterPage().waitForAll();
        return cards;
    }, []);

    useEffect(() => {
        const handler = setTimeout(() => {
            setQuery(searchValue);
        }, 200);

        return () => {
            clearTimeout(handler);
        }
    }, [searchValue]);

    useEffect(() => {
        const asyncEffect = async () => {
            if (query === searchValue) {
                if (query.length > 1) {
                    const cards = await fetchCards(searchValue);
                    setCardResults(cards);
                } else {
                    setCardResults(null);
                }
            }
        }

        asyncEffect();
    }, [query, searchValue, fetchCards]);

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
            {cardResults.length && cardResults.map((card) => (
                <Box minWidth={"300px"}>
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
            ))}
            {cardResults.length === 0 && <Text>No results</Text>}
        </Flex>}
        {/* <Field>
            <Label>Scryfall Search</Label>
            <Combobox
                value={props.selectedCard}
                onChange={props.setSelectedCard}
            >
                <ComboboxInput
                    aria-label="SearchInput"
                    placeholder="Enter card name..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
                {cardResults && (cardResults.length ? <ComboboxOptions>
                    {cardResults.map((card) => (
                        <ComboboxOption key={card.name} value={card}>
                            {card.name}
                        </ComboboxOption>
                    ))}
                </ComboboxOptions> : "No results")}
            </Combobox>
        </Field> */}
        
    </Box>
}
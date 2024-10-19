import { useState } from 'react'
import { ScryfallSearch } from './components/scryfallSearch/ScryfallSearch'
import { Card } from 'scryfall-sdk'
import { ProxyEditor } from './components/proxyEditor/ProxyEditor';
import { Box, Container, Flex, Text } from '@radix-ui/themes';
import { Header } from './components/header/Header';

function App() {

    const [selectedCard, setSelectedCard] = useState<Card | null>(null);

    return (
        <Flex direction={"column"} justify={"between"} minHeight={"100vh"}>
            <Flex direction={"column"} align={"stretch"} gap={"2"} pt={"10px"} px={"2"} >
                <Header />
                <Container size={"2"}>
                    <ScryfallSearch selectedCard={selectedCard} setSelectedCard={setSelectedCard} />
                </Container>
                {selectedCard && <Container size={"2"}>
                    <ProxyEditor cardData={selectedCard} />
                </Container>}
            </Flex>
        </Flex>
    )
}

export default App

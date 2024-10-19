import { GitHubLogoIcon } from "@radix-ui/react-icons"
import { Box, Flex, Link, Text } from "@radix-ui/themes"

export const Header = () => {
    return (
        <Flex direction={"row"} position={"relative"} justify={"center"}>
            <Text size={"8"} align={"center"}>Proxy Print</Text>
            <Box position={"absolute"} top={"50%"} right={"2"} style={{transform: "translate(0, -50%)"}}>
                <Box asChild width={"20px"} height={"20px"}>
                    <Link href="https://github.com/rubychill/proxy-print" target="_blank" color="gray"><GitHubLogoIcon width={"100%"} height={"100%"} /></Link>
                </Box>
            </Box>
        </Flex>
    )
}
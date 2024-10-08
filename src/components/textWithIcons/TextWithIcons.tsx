import { Text } from "@radix-ui/themes";
import { PropsWithClass } from "../../util";

type TextWithIconsProps = PropsWithClass<{
    text: string;
}>;

export const TextWithIcons = (props: TextWithIconsProps) => {
    return <Text className={props.className}></Text>
}
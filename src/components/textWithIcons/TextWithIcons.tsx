import { Text } from "@radix-ui/themes";
import { PropsWithClass } from "../../util";
import React, { useMemo } from "react";
import { MagicIcon } from "./MagicIcon";

type TextWithIconsProps = PropsWithClass<{
    text: string;
    iconSize: number;
}>;

const iconRegex = /\{\w*\}/g;

export const TextWithIcons = (props: TextWithIconsProps) => {
    const processedText = useMemo<React.ReactNode[]>(() => {
        const textBlocks = props.text.split(iconRegex);
        const regexMatches = props.text.match(iconRegex);
        if (regexMatches) {
            return textBlocks.reduce<React.ReactNode[]>((prev, current, i) => {
                if (i === 0) {
                    return [current, <MagicIcon iconSize={props.iconSize} code={regexMatches[i]} />];
                } else {
                    if (i < regexMatches.length) {
                        return prev.concat(current, <MagicIcon iconSize={props.iconSize} code={regexMatches[i]} />);
                    } else {
                        return prev.concat(current);
                    }
                }
            }, []);
        } else {
            return [props.text];
        }
    }, [props.text, props.iconSize]);

    return <p className={props.className}>{...processedText}</p>
}
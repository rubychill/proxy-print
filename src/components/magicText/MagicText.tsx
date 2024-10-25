import { PropsWithClass } from "../../util";
import React, { useMemo } from "react";
import { MagicIcon } from "./MagicIcon";
import styles from "./MagicText.module.scss";

type MagicTextProps = PropsWithClass<{
    text: string;
    iconSize: number;
    hideReminderText?: boolean;
}>;

const iconRegex = /\{[A-Z0-9/]+\}/g;
const reminderRegex = /\([^)]+\)/;

const addIconsToText = (text: string, iconSize: number): React.ReactNode[] => {
    const textBlocks = text.split(iconRegex);
    const regexMatches = text.match(iconRegex);
    if (regexMatches) {
        return textBlocks.reduce<React.ReactNode[]>((prev, current, i) => {
            if (i === 0) {
                return [current, <MagicIcon iconSize={iconSize} code={regexMatches[i]} />];
            } else {
                if (i < regexMatches.length) {
                    return prev.concat(current, <MagicIcon iconSize={iconSize} code={regexMatches[i]} key={`${regexMatches[i]}, ${i}`} />);
                } else {
                    return prev.concat(current);
                }
            }
        }, []);
    } else {
        return [text];
    }
}

export const MagicText = (props: MagicTextProps) => {
    const processedText = useMemo<React.ReactNode[]>(() => {
        const reminderText = props.text.match(reminderRegex);
        let rulesText = props.text;
        if (reminderText && reminderText.length) {
            rulesText = rulesText.split(reminderText[0])[0];
        }
        const rulesNodes = addIconsToText(rulesText, props.iconSize);
        const reminderNodes = !props.hideReminderText && reminderText ? <span className={styles.reminder}>{addIconsToText(reminderText[0], props.iconSize)}</span> : null;
        return [...rulesNodes, reminderNodes]
    }, [props.text, props.iconSize, props.hideReminderText]);

    return <p className={props.className}>{...processedText}</p>
}
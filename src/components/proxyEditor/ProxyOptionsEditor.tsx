import classNames from "classnames";
import { PropsWithClass } from "../../util";
import { Box, Button, Card, Checkbox, Dialog, Flex, Select, Slider, Text, TextField } from "@radix-ui/themes";
import { CardArtPicker } from "./CardArtPicker";

export type ProcessingType = "none" | "greyscale" | "edge";

export interface ProxyOptions {
    printWidth: string;
    printHeight: string;
    headerSize: number;
    showImage: boolean;
    processingType: ProcessingType;
    edgeThreshold: number[];
    edgeBlur: number;
    typeLineSize: number;
    rulesSize: number;
    showReminderText: boolean;
    artSrc: string;
}

export const proxyOptionsDefaults: ProxyOptions = {
    printWidth: "48",
    printHeight: "80",
    headerSize: 10, //12pt
    showImage: true,
    processingType: "greyscale",
    edgeThreshold: [10, 40],
    edgeBlur: 5,
    typeLineSize: 10,
    rulesSize: 10,
    showReminderText: true,
    artSrc: ""
};

type ProxyOptionsEditorProps = PropsWithClass<{
    options: ProxyOptions;
    onOptionsChange: (options: ProxyOptions) => void;
}>;

export const ProxyOptionsEditor = (props: ProxyOptionsEditorProps) => {
    return <Flex direction={"column"} align={"stretch"} gap={"2"} className={classNames(props.className)}>
        <Box asChild>
            <Card>
                <Text>Print Dimensions</Text>
                <Flex gap={"2"}>
                    <Box asChild width={"70px"}>
                        <TextField.Root
                            value={props.options.printWidth}
                            onChange={(e) => props.onOptionsChange({...props.options, printWidth: e.target.value})}
                            type={"number"}
                        >
                            <TextField.Slot side={"right"}>mm</TextField.Slot>
                        </TextField.Root>
                    </Box>
                    <Text>x</Text>
                    <Box asChild width={"70px"}>
                        <TextField.Root
                            value={props.options.printHeight}
                            onChange={(e) => props.onOptionsChange({...props.options, printHeight: e.target.value})}
                            type={"number"}
                        >
                            <TextField.Slot side={"right"}>mm</TextField.Slot>
                        </TextField.Root>
                    </Box>
                </Flex>
            </Card>
        </Box>
        <Box asChild>
            <Card>
                <Text>Header Size</Text>
                <Slider 
                    min={4} 
                    max={16} 
                    step={0.5} 
                    value={[props.options.headerSize]} 
                    onValueChange={(value) => props.onOptionsChange({...props.options, headerSize: value[0]})}
                />
            </Card>
        </Box>
        <Box asChild>
            <Card>
                <Flex direction={"column"} gap={"2"} align={"start"}>
                    <Flex gap={"3"} align={"center"}>
                        <Text>Show Image</Text>
                        <Checkbox checked={props.options.showImage} onCheckedChange={(checked) => props.onOptionsChange({...props.options, showImage: checked !== "indeterminate" && checked})} />
                    </Flex>
                    {props.options.showImage && <CardArtPicker 
                        onArtSelected={(artSrc) => props.onOptionsChange({...props.options, artSrc: artSrc})}
                    />}
                    {props.options.showImage && <Select.Root
                        value={props.options.processingType}
                        onValueChange={(value) => {
                            props.onOptionsChange({...props.options, processingType: value as ProcessingType});
                        }}
                    >
                        <Select.Trigger />
                        <Select.Content>
                            <Select.Item value="none">None</Select.Item>
                            <Select.Item value="greyscale">Greyscale</Select.Item>
                            <Select.Item value="edge">Edge Detection</Select.Item>
                        </Select.Content>
                    </Select.Root>}
                    {props.options.processingType === "edge" && <>
                        <Box>
                            <Text>Edge Detection Threshold</Text>
                            <Slider 
                                min={1} 
                                max={200} 
                                step={1} 
                                value={props.options.edgeThreshold} 
                                onValueChange={(value) => props.onOptionsChange({...props.options, edgeThreshold: value})}
                            />
                        </Box>
                        <Box>
                            <Text>Edge Detection Blur</Text>
                            <Slider 
                                min={1} 
                                max={50} 
                                step={0.25} 
                                value={[props.options.edgeBlur]} 
                                onValueChange={(value) => props.onOptionsChange({...props.options, edgeBlur: value[0]})}
                            />
                        </Box>
                    </>}
                </Flex>
            </Card>
        </Box>
        <Box asChild>
            <Card>
                <Text>Type Line Size</Text>
                <Slider 
                    min={4} 
                    max={16} 
                    step={0.5} 
                    value={[props.options.typeLineSize]} 
                    onValueChange={(value) => props.onOptionsChange({...props.options, typeLineSize: value[0]})}
                />
            </Card>
        </Box>
        <Box asChild>
            <Card>
                <Flex direction={"column"} gap={"2"}>
                    <Text>Rules Size</Text>
                    <Slider 
                        min={4} 
                        max={16} 
                        step={0.5} 
                        value={[props.options.rulesSize]} 
                        onValueChange={(value) => props.onOptionsChange({...props.options, rulesSize: value[0]})}
                    />
                    <Flex gap={"3"} align={"center"}>
                        <Text>Show Reminder Text</Text>
                        <Checkbox checked={props.options.showReminderText} onCheckedChange={(checked) => props.onOptionsChange({...props.options, showReminderText: checked !== "indeterminate" && checked})} />
                    </Flex>
                </Flex>
            </Card>
        </Box>
    </Flex>
}
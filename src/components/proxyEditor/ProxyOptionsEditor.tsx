import classNames from "classnames";
import { PropsWithClass } from "../../util";

export interface ProxyOptions {
    printWidth: number;
    printHeight: number;
    headerSize: number;
    showImage: boolean;
    typeLineSize: number;
    rulesSize: number;
}

type ProxyOptionsEditorProps = PropsWithClass<{
    options: ProxyOptions;
    onOptionsChange: (options: ProxyOptions) => void;
}>;

export const ProxyOptionsEditor = (props: ProxyOptionsEditorProps) => {
    console.log(props.options.headerSize);
    return <div className={classNames(props.className)}>
        {/* <Field>
            <Label>Header Size</Label>
            <Input 
                name="header_size" 
                value={props.options.headerSize} 
                onChange={(e) => {
                    const newOptions = {...props.options};
                    newOptions.headerSize = parseInt(e.target.value)
                    props.onOptionsChange(newOptions);
                }}
            />
        </Field>
        <Field>
            <Label>Show Image</Label>
            <Checkbox 
                name="show_image" 
                checked={props.options.showImage} 
                onChange={(e) => {
                    const newOptions = {...props.options};
                    newOptions.showImage = e.valueOf();
                    props.onOptionsChange(newOptions);
                }}
            />
        </Field>
        <Field>
            <Label>Type Line Size</Label>
            <Input 
                name="type_line_size" 
                value={props.options.typeLineSize} 
                onChange={(e) => {
                    const newOptions = {...props.options};
                    newOptions.typeLineSize = parseInt(e.target.value)
                    props.onOptionsChange(newOptions);
                }}
            />
        </Field>
        <Field>
            <Label>Rules Text Size</Label>
            <Input 
                name="rules_size" 
                value={props.options.rulesSize} 
                onChange={(e) => {
                    const newOptions = {...props.options};
                    newOptions.rulesSize = parseInt(e.target.value)
                    props.onOptionsChange(newOptions);
                }}
            />
        </Field> */}
    </div>
}
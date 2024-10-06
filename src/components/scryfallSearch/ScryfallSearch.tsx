import classNames from "classnames";
import { PropsWithClass } from "../../util";
import { Field, Input, Label } from "@headlessui/react";
import { useState } from "react";
import * as Scry from "scryfall-sdk";

type ScryfallSearchProps = PropsWithClass<{}>;

export const ScryfallSearch = (props: ScryfallSearchProps) => {
    const [searchValue, setSearchValue] = useState("");

    return <div className={classNames(
        props.className
    )}>
        <Field>
            <Label>Scryfall Search</Label>
            <Input
                autoFocus
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
            />
        </Field>
        
    </div>
}
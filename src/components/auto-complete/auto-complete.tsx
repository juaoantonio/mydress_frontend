import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { LoadingSpinner } from "@/components/loading-spinner/loading-spinner";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import React, { useState } from "react";

export function AutoComplete<T extends { id: string }>({
    value,
    label,
    placeholder,
    isPending,
    isError,
    data,
    onChangeProperty,
    displayProperty,
    errorMessage,
    handleChange,
    handleClear,
}: {
    value: string;
    label: string;
    placeholder?: string;

    isPending: boolean;
    isError: boolean;
    data?: T[];

    onChangeProperty: keyof T;
    displayProperty: keyof T;
    errorMessage: string;

    handleChange: (value: any) => void;
    handleClear: () => void;
}) {
    const [isAutoCompleteOpen, setIsAutoCompleteOpen] = useState(false);

    return (
        <div className={"flex items-center gap-2"}>
            <Label className={"text-nowrap"}>{label}</Label>
            <Popover open={isAutoCompleteOpen}>
                <PopoverTrigger asChild>
                    <Input
                        type={"text"}
                        value={value}
                        placeholder={placeholder}
                        onChange={(e) => handleChange(e.target.value)}
                        onFocus={() => setIsAutoCompleteOpen(true)}
                        onBlur={() => setIsAutoCompleteOpen(false)}
                        onClick={(event) => {
                            setIsAutoCompleteOpen(true);
                            event.preventDefault();
                        }}
                    />
                </PopoverTrigger>

                <PopoverContent className={"p-3"}>
                    {isPending && (
                        <div className={"flex items-center justify-center"}>
                            <LoadingSpinner />
                        </div>
                    )}
                    {isError && <div>{errorMessage}</div>}
                    {data && (
                        <ul className={"space-y-1.5 text-xs"}>
                            {data.map((tData, index) => (
                                <>
                                    {index !== 0 && <Separator />}
                                    <li
                                        key={tData.id}
                                        onClick={() =>
                                            handleChange(
                                                tData[onChangeProperty],
                                            )
                                        }
                                    >
                                        {tData[displayProperty] as any}
                                    </li>
                                </>
                            ))}
                        </ul>
                    )}
                </PopoverContent>
            </Popover>
            <Button
                variant={"destructive"}
                className={"aspect-square p-1"}
                onClick={handleClear}
            >
                <X size={18} />
            </Button>
        </div>
    );
}

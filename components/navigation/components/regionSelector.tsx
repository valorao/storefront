import * as React from "react"
import { useMediaQuery } from "@/components/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Drawer,
    DrawerContent,
    DrawerTrigger,
} from "@/components/ui/drawer"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

type Status = {
    value: string
    label: string
}

const statuses: Status[] = [
    {
        value: "br",
        label: "Brasil 🇧🇷",
    },
    {
        value: "na",
        label: "América do Norte 🌎",
    },
    {
        value: "latam",
        label: "América Latina 🇲🇽",
    },
    {
        value: "eu",
        label: "Europa 🇪🇺",
    },
    {
        value: "apac",
        label: "Ásia 🌏",
    },
]

export function RegionSelector() {
    const [open, setOpen] = React.useState(false)
    const isDesktop = useMediaQuery("(min-width: 768px)")
    const [selectedStatus, setSelectedStatus] = React.useState<Status | null>(
        null
    )

    if (isDesktop) {
        return (
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="w-auto h-6 rounded-xl justify-start">
                        {selectedStatus ? <>{selectedStatus.label}</> : <>Região</>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0" align="end">
                    <StatusList setOpen={setOpen} setSelectedStatus={setSelectedStatus} />
                </PopoverContent>
            </Popover>
        )
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button variant="outline" className="w-auto h-6 justify-start rounded-xl">
                    {selectedStatus ? <>{selectedStatus.label}</> : <>+ Região</>}
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mt-4 border-t">
                    <StatusList setOpen={setOpen} setSelectedStatus={setSelectedStatus} />
                </div>
            </DrawerContent>
        </Drawer>
    )
}

function StatusList({
    setOpen,
    setSelectedStatus,
}: {
    setOpen: (open: boolean) => void
    setSelectedStatus: (status: Status | null) => void
}) {
    return (
        <Command>
            <CommandInput placeholder="Filtrar regiões..." />
            <CommandList>
                <CommandEmpty>Nenhuma região encontrada.</CommandEmpty>
                <CommandGroup>
                    {statuses.map((regions) => (
                        <CommandItem
                            key={regions.value}
                            value={regions.value}
                            onSelect={(value) => {
                                setSelectedStatus(
                                    statuses.find((priority) => priority.value === value) || null
                                )
                                setOpen(false)
                            }}
                        >
                            {regions.label}
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </Command>
    )
}

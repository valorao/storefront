import * as React from "react";
import { Search as SearchIcon, X } from "lucide-react";
import { searchSchema } from "./searchSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useRef } from "react";
import { z } from "zod";
import { Separator } from "@/components/ui/separator";
import { useRouter, useSearchParams } from "next/navigation";
import { Dialog, DialogFooter } from "../ui/dialog";
import { DialogContent, Input } from "./components/inputAndDialog";
import { RegionSelector } from "./components/regionSelector";
import { Button } from "../ui/button";

type searchResponse = {
    id: string;
    platform: string;
    region: string;
    riotId: string;
};

type searchResults = {
    searchResponse: searchResponse[];
};

type SearchForm = z.infer<typeof searchSchema>;

export default function SearchBar({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) {
    const queryParams = useSearchParams();
    const router = useRouter();
    const [results, setResults] = useState<searchResults | null>(null);
    const [formInput, setFormInput] = useState('');
    const { register, handleSubmit, formState: { errors }, clearErrors, setValue } = useForm<SearchForm>({
        resolver: zodResolver(searchSchema),
        mode: "onSubmit",
        reValidateMode: "onSubmit",
    });
    const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen(!open);
            }
        };
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

        debounceTimeout.current = setTimeout(async () => {
            if (formInput.trim().length > 3) {
                try {
                    const getSearchCompletions = await fetch(`/api/searchEngine?q=${formInput}`).then((res) => res.json());
                    setResults(getSearchCompletions);
                } catch (error) {
                    console.error("Failed to fetch search completions:", error);
                }
            }
        }, 500);

        return () => {
            if (debounceTimeout.current) {
                clearTimeout(debounceTimeout.current);
            }
        };
    }, [formInput]);

    useEffect(() => {
        const searchQuery = queryParams.get('q');
        const decoded = decodeURIComponent(searchQuery as string)
        if (decoded.includes(' ')) {
            setOpen(true);
            setValue("search", decoded.split(' ')[0] + '#' + decoded.split(' ')[1]);
        } else if (searchQuery) {
            setOpen(true);
            setValue("search", searchQuery);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (formInput.trim()) {
            const encodedValue = encodeURIComponent(formInput);
            router.replace(`?q=${encodedValue}`, { scroll: false });
        } else {
            router.replace(``, { scroll: false });
        }
    }, [router, formInput]);

    async function searchQuery(data: SearchForm) {
        console.log(data)
        const name = data.search.split("#")[0];
        const tag = data.search.split("#")[1];
        setOpen(false);
        router.push(`/profiles/${name}/${tag}?e=vlr&rg=br`);
    }

    function tryResult(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        if (!value) {
            clearErrors();
            setResults(null);
        } else if (!errors.search) {
            setFormInput(value);
        }
    }

    return (
        <div className="flex items-center flex-col justify-center">
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className={`w-96 md:w-full ${errors.search ? "border-red-700 p-1" : ""}`}>
                    <div className="flex flex-row items-center">
                        <div className="flex-1 flex-row items-center mr-2">
                            <form className="w-full h-full" onSubmit={handleSubmit(searchQuery)}>
                                <div className="flex gap-2 items-center">
                                    <div className="flex-1 relative">
                                        <SearchIcon className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
                                        <div className="flex-row flex justify-center items-center text-center">
                                            <Input
                                                type="search"
                                                placeholder="Busque por jogadores. Use NOME#BR1"
                                                className="pl-8 outline-none w-full py-0 autofill:bg-background"
                                                {...register('search', {
                                                    onChange: tryResult,
                                                })}
                                            />
                                        </div>
                                    </div>
                                    <RegionSelector />
                                    <button type="submit" className="justify-end" disabled={!!errors.search}>
                                        <Button variant="outline" className={`w-auto h-6 rounded-xl justify-start flex items-center gap-0.5 text-center ${errors.search ? 'border-red-700 text-red-700' : ''}`}>
                                            <SearchIcon className="size-3 antialiased" />
                                            Buscar
                                        </Button>
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="flex gap-2 items-center text-center">
                            <div
                                className='rounded-full p-1 size-6 items-center cursor-pointer justify-center flex mr-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground'
                                onClick={() => setOpen(false)}
                            >
                                <X className=" text-white antialiased" />
                            </div>
                        </div>
                    </div>
                    {errors.search && <DialogFooter>
                        <div className="flex flex-col items-center w-full justify-center mt-[-10px]">
                            <Separator className="bg-zinc-500" />
                            <div className="items-center justify-start text-center flex my-2">
                                <h1 className="text-sm text-red-700">{errors.search.message}</h1>
                            </div>
                        </div>
                    </DialogFooter>}
                    {results && <DialogFooter>
                        <div className="flex flex-col w-full gap-3 mb-4">
                            <div className="flex flex-col items-center w-full justify-center mt-[-10px]">
                                <Separator className="bg-zinc-500" />
                            </div>
                            {results.searchResponse && <h1 className="flex justify-start mx-3 font-semibold">Sugestões:</h1>}
                            {results.searchResponse && results.searchResponse.map((e) => (
                                <div
                                    key={e.id}
                                    className="items-center justify-center text-center flex rounded-xl p-2 bg-background border mx-20 hover:border-white transition-all cursor-pointer"
                                    onClick={() => searchQuery({ search: e.riotId })}
                                >
                                    <h1 className="text-white text-lg font-semibold">{e.riotId}</h1>
                                </div>
                            ))}
                        </div>
                    </DialogFooter>}
                </DialogContent>
            </Dialog>
        </div>
    );
}
